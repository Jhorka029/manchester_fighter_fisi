'use strict';
// Pistas preparadas, voces y muestras del usuario con mezcla por evento.
const AUDIO_TRACKS={
 menu:{src:'assets/audio/menu-listo.mp3'},
 characters:{src:'assets/audio/personajes-listo.mp3'},
 combat:{src:'assets/audio/combate-listo.mp3'}
};
const AUDIO_ENTRANCE='assets/audio/menu-arranque.mp3';
const AUDIO_SAMPLES={round1:'assets/audio/round1.mp3',round2:'assets/audio/round2.mp3',finalround:'assets/audio/finalround.mp3',fight:'assets/audio/fight.mp3',ko:'assets/audio/ko.mp3',perfectko:'assets/audio/perfectko.mp3',button:'assets/audio/boton.mp3',special0:'assets/audio/especial-1.mp3',special1:'assets/audio/especial-2.mp3',special2:'assets/audio/especial-3.mp3',special3:'assets/audio/especial-4.mp3'};
const mix={music:.24,effects:1};
const audioDirector={unlocked:false,loading:null,output:null,sfx:null,musicBus:null,buffers:{},samples:{},samplesPlayed:[],playing:null,track:null,duckUntil:0,errors:[],events:[],serial:0,uiDepth:0,buttonSource:null,startedAt:null,voiceEnd:0};
function audioGraph(){
 audio??=new(window.AudioContext||window.webkitAudioContext)();
 if(audioDirector.output)return;
 const master=audio.createGain(),compressor=audio.createDynamicsCompressor();
 compressor.threshold.value=-13;compressor.knee.value=14;compressor.ratio.value=6;compressor.attack.value=.004;compressor.release.value=.14;
 audioDirector.sfx=audio.createGain();audioDirector.musicBus=audio.createGain();
 audioDirector.sfx.connect(master);audioDirector.musicBus.connect(master);master.connect(compressor);compressor.connect(audio.destination);master.gain.value=.85;audioDirector.output=master;
 audioDirector.sfx.gain.value=mix.effects;audioDirector.musicBus.gain.value=0;
}
function prepareMusic(buffer,from=0,to=buffer.duration){
 const rate=buffer.sampleRate,start=Math.floor(from*rate),end=Math.min(buffer.length,Math.floor(to*rate)),overlap=Math.floor(.35*rate),n=end-start;
 const out=audio.createBuffer(buffer.numberOfChannels,n-overlap,rate);let sum=0,count=0;
 for(let ch=0;ch<out.numberOfChannels;ch++){
  const src=buffer.getChannelData(ch),dst=out.getChannelData(ch);
  for(let i=0;i<dst.length;i++){if(i<overlap){const k=i/overlap;dst[i]=src[end-overlap+i]*Math.cos(k*Math.PI/2)+src[start+i]*Math.sin(k*Math.PI/2)}else dst[i]=src[start+i];if(i%32===0){sum+=dst[i]*dst[i];count++}}
 }
 const gain=Math.min(2,.16/Math.max(.01,Math.sqrt(sum/count)));
 for(let ch=0;ch<out.numberOfChannels;ch++){const dst=out.getChannelData(ch);for(let i=0;i<dst.length;i++)dst[i]*=gain}
 return out;
}
function prepareSample(buffer,target=.24){
 let sum=0,peak=0,count=0;for(let ch=0;ch<buffer.numberOfChannels;ch++){const a=buffer.getChannelData(ch);for(let i=0;i<a.length;i++){peak=Math.max(peak,Math.abs(a[i]));sum+=a[i]*a[i];count++}}
 const gain=Math.min(8,.9/Math.max(.001,peak),target/Math.max(.005,Math.sqrt(sum/count)));
 for(let ch=0;ch<buffer.numberOfChannels;ch++){const a=buffer.getChannelData(ch);for(let i=0;i<a.length;i++)a[i]*=gain}return buffer;
}
async function decodeAsset(src){const r=await fetch(src);if(!r.ok)throw Error('Audio '+r.status);return audio.decodeAudioData(await r.arrayBuffer())}
function preloadGameAudio(){
 if(audioDirector.loading)return audioDirector.loading;
 audioGraph();
 const load=async(key,src,music=false)=>{try{const decoded=await decodeAsset(src);if(music)audioDirector.buffers[key]=prepareMusic(decoded);else audioDirector.samples[key]=prepareSample(decoded);audioDirector.sync()}catch(e){audioDirector.errors.push(key+': '+e.message)}};
 // Cabecera de seis segundos: suena mientras se decodifican las pistas largas.
 const entrance=decodeAsset(AUDIO_ENTRANCE).then(buffer=>{audioDirector.bootstrap=prepareSample(buffer,.16);audioDirector.sync()}).catch(e=>audioDirector.errors.push('entrada: '+e.message));
 audioDirector.loading=entrance.then(()=>Promise.all([
  ...Object.entries(AUDIO_SAMPLES).map(([key,src])=>load(key,src)),
  ...Object.entries(AUDIO_TRACKS).map(([key,t])=>load(key,t.src,true))
 ]));
 return audioDirector.loading;
}
function unlockGameAudio(){
 try{preloadGameAudio();const attempt=audio.resume();if(audio.state==='running'){audioDirector.unlocked=true;audioDirector.sync()}attempt.then(()=>{audioDirector.unlocked=audio.state==='running';audioDirector.sync()}).catch(()=>{});return Promise.resolve()}catch(e){audioDirector.errors.push(e.message);return Promise.resolve()}
}
function playSample(key,{voice=false,volume=1}={}){
 if(muted||!audioDirector.unlocked||!audioDirector.samples[key])return false;
 const now=audio.currentTime,s=audio.createBufferSource(),g=audio.createGain();s.buffer=audioDirector.samples[key];s.connect(g);g.connect(audioDirector.sfx);g.gain.value=(voice?1:.85)*Math.max(0,Math.min(2,volume));
 if(key==='button'){const old=audioDirector.buttonSource;if(old){old.gain.gain.setTargetAtTime(0,now,.015);try{old.source.stop(now+.07)}catch{}}audioDirector.buttonSource={source:s,gain:g}}
 if(voice){audioDirector.voiceEnd=now+s.buffer.duration;audioDirector.duckUntil=Math.max(audioDirector.duckUntil,audioDirector.voiceEnd+.12)}
 audioDirector.samplesPlayed??=[];audioDirector.samplesPlayed.push({key,time:now});if(audioDirector.samplesPlayed.length>100)audioDirector.samplesPlayed.shift();
 s.start();s.onended=()=>{s.disconnect();g.disconnect();if(audioDirector.buttonSource?.source===s)audioDirector.buttonSource=null};return true;
}
function synthTone(f,d=.12,type='triangle',vol=.08,delay=0,end=f/2,pan=0){
 if(muted||!audioDirector.unlocked||!audioDirector.sfx)return;
 const now=audio.currentTime+delay,o=audio.createOscillator(),g=audio.createGain(),p=audio.createStereoPanner();
 o.type=type;o.frequency.setValueAtTime(Math.max(25,f),now);o.frequency.exponentialRampToValueAtTime(Math.max(25,end),now+d);
 g.gain.setValueAtTime(.0001,now);g.gain.linearRampToValueAtTime(vol,now+.005);g.gain.exponentialRampToValueAtTime(.0001,now+d);
 p.pan.value=Math.max(-.7,Math.min(.7,pan));o.connect(g);g.connect(p);p.connect(audioDirector.sfx);o.start(now);o.stop(now+d+.01);o.onended=()=>{o.disconnect();g.disconnect();p.disconnect()};
}
sound=function(f=180,d=.09,type='square',vol=.035){if(!audioDirector.uiDepth)synthTone(f,d,type,Math.min(.24,vol*3.5))};
noise=function(d=.1,vol=.06,freq=1200,when=0){
 if(muted||!audioDirector.unlocked||!audioDirector.sfx)return;
 if(!noiseBuf){noiseBuf=audio.createBuffer(1,audio.sampleRate*.6,audio.sampleRate);const data=noiseBuf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1}
 const now=Math.max(when||audio.currentTime,audio.currentTime),s=audio.createBufferSource(),f=audio.createBiquadFilter(),g=audio.createGain();s.buffer=noiseBuf;f.type='lowpass';f.frequency.value=freq;g.gain.setValueAtTime(Math.min(.28,vol*2.4),now);g.gain.exponentialRampToValueAtTime(.0001,now+d);s.connect(f);f.connect(g);g.connect(audioDirector.sfx);s.start(now);s.stop(now+Math.min(d,.59));s.onended=()=>{s.disconnect();f.disconnect();g.disconnect()};
};
function audioCue(name,id=0){
 audioDirector.events.push({name,id,time:tick});if(audioDirector.events.length>160)audioDirector.events.shift();
 if(name==='button'&&!audioDirector.unlocked){audioDirector.pendingButton=performance.now();return}
 if(muted||!audioDirector.unlocked)return;
 if(['round1','round2','finalround','fight','ko','perfectko'].includes(name)){playSample(name,{voice:true});return}
 if(name==='button'){playSample('button');return}
 if(name==='menu-move'){synthTone(1050,.055,'triangle',.095,0,1500);synthTone(2100,.035,'sine',.035,.02,1800);return}
 if(name==='menu-back'){synthTone(660,.085,'triangle',.11,0,440);synthTone(330,.12,'triangle',.09,.065,220);return}
 if(name==='special'){audioDirector.duckUntil=Math.max(audioDirector.duckUntil,audio.currentTime+.65);playSample('special'+(id%4));return}
 if(name==='count'&&audio.currentTime<audioDirector.voiceEnd)return;
 const variation=(audioDirector.serial++%3-1)*.035,root=220*Math.pow(2,(id%9)/12),tone=(f,d=.12,type='triangle',v=.1,delay=0,end=f)=>synthTone(f*(1+variation),d,type,v,delay,end);
 if(name==='hit'){tone(115,.13,'sawtooth',.1,0,38);noise(.12,.08,1100)}
 else if(name==='block'){tone(650,.09,'triangle',.08,0,280);noise(.06,.035,5000)}
 else if(name==='charge'){tone(root,.22,'triangle',.075,0,root*1.8);tone(root*2,.18,'sine',.05,.07,root*3)}
 else if(name==='super'){audioDirector.duckUntil=audio.currentTime+1.3;playSample('special'+(id%4));tone(70,.55,'sawtooth',.13,0,35);[1,1.5,2,3].forEach((n,i)=>tone(root*n,.3,'triangle',.09,i*.065,root*n*1.15));noise(.45,.08,2400)}
 else if(name==='count'){tone(620,.11,'square',.1);tone(1240,.08,'sine',.06,.04)}
 else if(name==='victory'||name==='champion'){audioDirector.duckUntil=audio.currentTime+1.6;const seq=name==='champion'?[1,1.25,1.5,2,1.5,2,2.5,3]:[1,1.25,1.5,2];seq.forEach((n,i)=>tone(330*n,.27,'triangle',.12,i*.14));}
 else if(name==='back'){tone(440,.1,'triangle',.075,0,220)}
 else{const base={mode:440,variant:520,difficulty:580,stage:660,characters:740,select:800,title:392}[name]||500;tone(base+id*18,.075,'triangle',.08);tone((base+id*18)*1.5,.08,'sine',.045,.045)}
}
audioDirector.sync=function(){
 if(!audioDirector.output)return;
 const visible=!document.hidden,allowed=audioDirector.unlocked&&!muted&&!paused&&visible&&ready;
 if(audioDirector.unlocked&&audioDirector.pendingButton&&audioDirector.samples.button){if(performance.now()-audioDirector.pendingButton<500)playSample('button');audioDirector.pendingButton=null}
 const track=typeof gameMusicTrack==='function'?gameMusicTrack():['fight','round','match'].includes(state)?'combat':state==='menu'&&front.page==='characters'?'characters':'menu';
 const buffer=audioDirector.buffers[track]||(track==='menu'?audioDirector.bootstrap:null),upgrade=audioDirector.playing?.bootstrap&&track==='menu'&&audioDirector.buffers.menu;
 if(ready&&audioDirector.unlocked&&buffer&&(track!==audioDirector.track||upgrade)){
  const now=audio.currentTime,old=audioDirector.playing;
  if(old){old.gain.gain.cancelAndHoldAtTime(now);old.gain.gain.setTargetAtTime(0,now,upgrade ? .04 : .28);old.source.stop(now+(upgrade ? .25 : 1.5))}
  const source=audio.createBufferSource(),gain=audio.createGain();source.buffer=buffer;source.loop=true;source.connect(gain);gain.connect(audioDirector.musicBus);gain.gain.setValueAtTime(old?0:1,now);if(old)gain.gain.linearRampToValueAtTime(1,now+(upgrade ? .15 : .85));const offset=upgrade?(now-old.started)%buffer.duration:0;source.start(now,offset);source.onended=()=>{source.disconnect();gain.disconnect()};audioDirector.playing={source,gain,bootstrap:buffer===audioDirector.bootstrap,started:now-offset};audioDirector.track=track;if(audioDirector.startedAt===null)audioDirector.startedAt=performance.now();
 }
 const duck=audio.currentTime<audioDirector.duckUntil ? .18 : state==='intro' ? .5 : 1;
 const gain=allowed&&musicOn?mix.music*duck:0;
 const hint=$('#audio-hint');if(hint&&audioDirector.unlocked&&!audioDirector.errors.length&&hint.textContent!=='Audio activo · música y efectos independientes.')hint.textContent='Audio activo · música y efectos independientes.';
 audioDirector.musicBus.gain.setTargetAtTime(gain,audio.currentTime,.06);audioDirector.sfx.gain.setTargetAtTime(allowed?mix.effects:0,audio.currentTime,.025);
 // Suspende el reloj sonoro al pausar o salir de la pestaña; se retoma en el mismo punto.
 if((paused||!visible)&&audio.state==='running')audio.suspend().catch(()=>{});
 else if(!paused&&visible&&audioDirector.unlocked&&audio.state==='suspended')audio.resume().catch(()=>{});
};
music=function(){audioDirector.sync()};frontScore=function(){};
const oldFrontUnlock=frontUnlock;
frontUnlock=function(){oldFrontUnlock();void unlockGameAudio()};
addEventListener('pointerdown',()=>{void unlockGameAudio()},{capture:true});
addEventListener('keydown',e=>{if(!e.repeat)void unlockGameAudio()},{capture:true});
addEventListener('gamepadconnected',()=>{void unlockGameAudio()});
const oldFrontPad=frontPad;
frontPad=function(){oldFrontPad();if(!audioDirector.unlocked&&pads().some(p=>p.buttons.some(b=>b.pressed)))void unlockGameAudio()};
function menuAudioAction(fn,args,confirm=false){const outer=audioDirector.uiDepth===0;if(outer&&confirm)audioCue('button');audioDirector.uiDepth++;try{return fn(...args)}finally{audioDirector.uiDepth--;audioDirector.sync()}}
const oldFrontGo=frontGo,oldFrontSelect=frontSelect,oldFrontMove=frontMove,oldFrontBackAudio=frontBack,oldFrontConfirmAudio=frontConfirm,oldFrontLaunchAudio=frontLaunch;
frontGo=function(...args){audioDirector.routeDepth=(audioDirector.routeDepth||0)+1;try{return menuAudioAction(oldFrontGo,args)}finally{audioDirector.routeDepth--}};
frontSelect=function(...args){return menuAudioAction(oldFrontSelect,args)};
frontMove=function(...args){return menuAudioAction(oldFrontMove,args)};
frontBack=function(...args){const page=front.page,result=menuAudioAction(oldFrontBackAudio,args);if(ready&&front.page!==page)audioCue('menu-back');return result};
frontConfirm=function(...args){return menuAudioAction(oldFrontConfirmAudio,args,ready&&['title','characters'].includes(front.page))};
frontLaunch=function(...args){return menuAudioAction(oldFrontLaunchAudio,args,ready&&front.active&&front.page==='characters')};
const beforeSelectionAudioUI=frontUI;
const selectionAudioKey=()=>front.page==='characters'?front.side+':'+front.picks.join(','):String(front.option);
let lastSelectionAudio={page:front.page,key:selectionAudioKey()};
frontUI=function(){const now={page:front.page,key:selectionAudioKey()};if(ready&&front.active&&state==='menu'&&!audioDirector.routeDepth&&lastSelectionAudio.page===now.page&&lastSelectionAudio.key!==now.key)audioCue('menu-move');lastSelectionAudio=now;return beforeSelectionAudioUI()};
$('#front-ui').addEventListener('click',e=>{const b=e.target.closest('[data-front="option"]');if(ready&&b&&+b.dataset.option!==front.option)audioCue('menu-move')},{capture:true});
const oldAttack=attack,oldDamage=damage,oldEndRoundAudio=endRound;
endRound=function(){const before=state;oldEndRoundAudio();if(before==='fight'&&state==='round'&&players.some(p=>p.hp<=0))audioCue(perfect?'perfectko':'ko')};
attack=function(p,id){const ok=oldAttack(p,id);if(ok&&(id==='super'||MOVES[id]?.frame==='special'))audioCue(id==='super'?'super':'special',p.id);return ok};
damage=function(...args){const before=lastContact,ok=oldDamage(...args);if(ok&&lastContact!==before)audioCue(lastContact.blocked?'block':'hit',args[0].id);return ok};
const oldStepAudio=step;let countdownKey='',victoryRound=-1;const chargePulse=new WeakMap();
const oldBeginRoundAudio=beginRound;
beginRound=function(){oldBeginRoundAudio();countdownKey='';victoryRound=-1;audioCue(round>=3?'finalround':'round'+round)};
step=function(dt){
 const before=state,wasPaused=paused;oldStepAudio(dt);if(wasPaused||state==='menu')return;
 if(state==='intro'){if(before!=='intro')victoryRound=-1;const count=phaseTime>.65?Math.min(3,Math.max(1,Math.ceil(phaseTime-.65))):0,key=round+':'+count;if(key!==countdownKey){countdownKey=key;audioCue(count?'count':'fight',count)}}else countdownKey='';
 if(state==='round'&&phaseTime<=.65&&victoryRound!==round){victoryRound=round;audioCue('victory')}
 if(state==='match'&&before!=='match')audioCue('champion');
 if(state==='fight')for(const p of players){if(p.action==='charge'){const beat=Math.floor(p.age/.55);if(chargePulse.get(p)!==beat){chargePulse.set(p,beat);audioCue('charge',p.id)}}else chargePulse.delete(p)}
};
const audioPause=togglePause;togglePause=function(){audioPause();audioDirector.sync()};
document.addEventListener('visibilitychange',()=>audioDirector.sync());
const oldSoundClick=$('#sound').onclick,oldMusicClick=$('#music').onclick;
$('#sound').onclick=()=>{oldSoundClick();audioDirector.sync()};$('#music').onclick=()=>{oldMusicClick();audioDirector.sync()};
const mixer=document.createElement('details');mixer.className='sound-mix';mixer.innerHTML='<summary>Mezcla de audio</summary><label>Música <input id="music-volume" aria-label="Volumen de música" type="range" min="0" max="100" value="24"></label><label>Efectos <input id="effects-volume" aria-label="Volumen de efectos" type="range" min="0" max="100" value="100"></label><small id="audio-hint" aria-live="polite">Preparando música de entrada…</small>';
$('.tools').append(mixer);
for(const [id,key]of [['music-volume','music'],['effects-volume','effects']])$('#'+id).addEventListener('input',e=>{mix[key]=+e.target.value/100;audioDirector.sync()});
const initialUnlock=unlockGameAudio;unlockGameAudio=async function(){await initialUnlock();$('#audio-hint').textContent=audioDirector.errors.length?'No se pudo cargar una pista. Reabre el HTML autónomo.':audioDirector.unlocked?'Audio activo · música y efectos independientes.':'Pulsa una tecla para activar el audio.'};
window.fisiAudioDebug=()=>({unlocked:audioDirector.unlocked,track:audioDirector.track,loaded:Object.keys(audioDirector.buffers),samples:Object.keys(audioDirector.samples),samplesPlayed:(audioDirector.samplesPlayed||[]).slice(-80),startedAt:audioDirector.startedAt,mix:{...mix},muted,musicOn,context:audio?.state,musicGain:audioDirector.musicBus?.gain.value,events:audioDirector.events.slice(-80),errors:[...audioDirector.errors]});
// Precarga aun con el contexto suspendido; intenta reproducir sin esperar interacción.
preloadGameAudio();void unlockGameAudio();
