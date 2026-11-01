'use strict';
// Dos pistas del usuario, mezcla independiente y efectos arcade por evento.
const AUDIO_TRACKS={
 menu:{src:'assets/audio/intro.mp3',from:8,to:78},
 combat:{src:'assets/audio/combate.mp3',from:124,to:172}
};
const mix={music:.34,effects:.85};
const audioDirector={unlocked:false,loading:null,output:null,sfx:null,musicBus:null,buffers:{},playing:null,track:null,duckUntil:0,errors:[],events:[],lastScene:'',serial:0};
const audioFiles=Object.fromEntries(Object.entries(AUDIO_TRACKS).map(([key,t])=>[key,fetch(t.src).then(r=>{if(!r.ok)throw Error('Audio '+r.status);return r.arrayBuffer()}).then(bytes=>({bytes}),error=>({error:error.message}))]));
function audioGraph(){
 audio??=new(window.AudioContext||window.webkitAudioContext)();
 if(audioDirector.output)return;
 const master=audio.createGain(),compressor=audio.createDynamicsCompressor();
 compressor.threshold.value=-13;compressor.knee.value=14;compressor.ratio.value=6;compressor.attack.value=.004;compressor.release.value=.14;
 audioDirector.sfx=audio.createGain();audioDirector.musicBus=audio.createGain();
 audioDirector.sfx.connect(master);audioDirector.musicBus.connect(master);master.connect(compressor);compressor.connect(audio.destination);master.gain.value=.85;audioDirector.output=master;
 audioDirector.sfx.gain.value=mix.effects;audioDirector.musicBus.gain.value=0;
}
function prepareMusic(buffer,from,to){
 const rate=buffer.sampleRate,start=Math.floor(from*rate),end=Math.min(buffer.length,Math.floor(to*rate)),overlap=Math.floor(.35*rate),n=end-start;
 const out=audio.createBuffer(buffer.numberOfChannels,n-overlap,rate);let sum=0,count=0;
 for(let ch=0;ch<out.numberOfChannels;ch++){
  const src=buffer.getChannelData(ch),dst=out.getChannelData(ch);
  for(let i=0;i<dst.length;i++){if(i<overlap){const k=i/overlap;dst[i]=src[end-overlap+i]*Math.cos(k*Math.PI/2)+src[start+i]*Math.sin(k*Math.PI/2)}else dst[i]=src[start+i];if(i%32===0){sum+=dst[i]*dst[i];count++}}
 }
 const gain=Math.min(2,.19/Math.max(.01,Math.sqrt(sum/count)));
 for(let ch=0;ch<out.numberOfChannels;ch++){const dst=out.getChannelData(ch);for(let i=0;i<dst.length;i++)dst[i]*=gain}
 return out;
}
async function unlockGameAudio(){
 try{
  audioGraph();await audio.resume();audioDirector.unlocked=audio.state==='running';
  if(!audioDirector.loading)audioDirector.loading=Promise.all(Object.entries(AUDIO_TRACKS).map(async([key,t])=>{try{const data=await audioFiles[key];if(data.error)throw Error(data.error);const decoded=await audio.decodeAudioData(data.bytes.slice(0));audioDirector.buffers[key]=prepareMusic(decoded,t.from,t.to)}catch(e){audioDirector.errors.push(key+': '+e.message)}}));
  await audioDirector.loading;audioDirector.sync();
 }catch(e){audioDirector.errors.push(e.message)}
}
function synthTone(f,d=.12,type='triangle',vol=.08,delay=0,end=f/2,pan=0){
 if(muted||!audioDirector.unlocked||!audioDirector.sfx)return;
 const now=audio.currentTime+delay,o=audio.createOscillator(),g=audio.createGain(),p=audio.createStereoPanner();
 o.type=type;o.frequency.setValueAtTime(Math.max(25,f),now);o.frequency.exponentialRampToValueAtTime(Math.max(25,end),now+d);
 g.gain.setValueAtTime(.0001,now);g.gain.linearRampToValueAtTime(vol,now+.005);g.gain.exponentialRampToValueAtTime(.0001,now+d);
 p.pan.value=Math.max(-.7,Math.min(.7,pan));o.connect(g);g.connect(p);p.connect(audioDirector.sfx);o.start(now);o.stop(now+d+.01);o.onended=()=>{o.disconnect();g.disconnect();p.disconnect()};
}
sound=function(f=180,d=.09,type='square',vol=.035){synthTone(f,d,type,Math.min(.18,vol*2.6))};
noise=function(d=.1,vol=.06,freq=1200,when=0){
 if(muted||!audioDirector.unlocked||!audioDirector.sfx)return;
 if(!noiseBuf){noiseBuf=audio.createBuffer(1,audio.sampleRate*.6,audio.sampleRate);const data=noiseBuf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1}
 const now=Math.max(when||audio.currentTime,audio.currentTime),s=audio.createBufferSource(),f=audio.createBiquadFilter(),g=audio.createGain();s.buffer=noiseBuf;f.type='lowpass';f.frequency.value=freq;g.gain.setValueAtTime(Math.min(.24,vol*1.8),now);g.gain.exponentialRampToValueAtTime(.0001,now+d);s.connect(f);f.connect(g);g.connect(audioDirector.sfx);s.start(now);s.stop(now+Math.min(d,.59));s.onended=()=>{s.disconnect();f.disconnect();g.disconnect()};
};
function audioCue(name,id=0){
 audioDirector.events.push({name,id,time:tick});if(audioDirector.events.length>160)audioDirector.events.shift();
 if(muted||!audioDirector.unlocked)return;
 const variation=(audioDirector.serial++%3-1)*.035,root=220*Math.pow(2,(id%9)/12),tone=(f,d=.12,type='triangle',v=.1,delay=0,end=f)=>synthTone(f*(1+variation),d,type,v,delay,end);
 if(name==='hit'){tone(115,.13,'sawtooth',.1,0,38);noise(.12,.08,1100)}
 else if(name==='block'){tone(650,.09,'triangle',.08,0,280);noise(.06,.035,5000)}
 else if(name==='charge'){tone(root,.22,'triangle',.075,0,root*1.8);tone(root*2,.18,'sine',.05,.07,root*3)}
 else if(name==='super'){audioDirector.duckUntil=audio.currentTime+1.3;tone(70,.55,'sawtooth',.13,0,35);[1,1.5,2,3].forEach((n,i)=>tone(root*n,.3,'triangle',.09,i*.065,root*n*1.15));noise(.45,.08,2400)}
 else if(name==='special'){tone(root*2,.18,'sawtooth',.085,0,root*4);noise(.12,.035,2200)}
 else if(name==='count'){tone(620,.11,'square',.1);tone(1240,.08,'sine',.06,.04)}
 else if(name==='fight'){[1,1.25,1.5,2].forEach((n,i)=>tone(330*n,.17,'square',.085,i*.07));noise(.18,.06,2000)}
 else if(name==='ko'){audioDirector.duckUntil=audio.currentTime+1.1;tone(95,.7,'sawtooth',.15,0,28);noise(.5,.1,700)}
 else if(name==='victory'||name==='champion'){audioDirector.duckUntil=audio.currentTime+1.6;const seq=name==='champion'?[1,1.25,1.5,2,1.5,2,2.5,3]:[1,1.25,1.5,2];seq.forEach((n,i)=>tone(330*n,.27,'triangle',.12,i*.14));}
 else if(name==='back'){tone(440,.1,'triangle',.075,0,220)}
 else{const base={mode:440,variant:520,difficulty:580,stage:660,characters:740,select:800,title:392}[name]||500;tone(base+id*18,.075,'triangle',.08);tone((base+id*18)*1.5,.08,'sine',.045,.045)}
}
audioDirector.sync=function(){
 if(!audioDirector.output)return;
 const visible=!document.hidden,allowed=audioDirector.unlocked&&!muted&&!paused&&visible;
 const track=['fight','round','match'].includes(state)?'combat':'menu';
 if(track!==audioDirector.track&&audioDirector.buffers[track]){
  const now=audio.currentTime,old=audioDirector.playing;
  if(old){old.gain.gain.cancelScheduledValues(now);old.gain.gain.setTargetAtTime(0,now,.13);old.source.stop(now+.8)}
  const source=audio.createBufferSource(),gain=audio.createGain();source.buffer=audioDirector.buffers[track];source.loop=true;source.connect(gain);gain.connect(audioDirector.musicBus);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(1,now+.55);source.start();source.onended=()=>{source.disconnect();gain.disconnect()};audioDirector.playing={source,gain};audioDirector.track=track;
 }
 const duck=audio&&audio.currentTime<audioDirector.duckUntil?.32:state==='intro'?.6:1;
 const gain=allowed&&musicOn?mix.music*duck:0;
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
const oldFrontGo=frontGo,oldFrontSelect=frontSelect,oldFrontMove=frontMove;
frontGo=function(page,option=0){const prev=front.page;oldFrontGo(page,option);audioCue(page===prev?'back':page);audioDirector.sync()};
frontSelect=function(id){oldFrontSelect(id);audioCue('characters',id)};
frontMove=function(dir){const page=front.page;oldFrontMove(dir);if(page!=='characters')audioCue(page,front.option)};
const oldFrontBackAudio=frontBack;frontBack=function(){audioCue('back');oldFrontBackAudio()};
$('#front-ui').addEventListener('click',e=>{const b=e.target.closest('[data-front]');if(b?.dataset.front==='stage')audioCue('stage',+b.dataset.stage);else if(b?.dataset.front==='side')audioCue('characters',front.picks[front.side])});
const oldAttack=attack,oldDamage=damage,oldEndRoundAudio=endRound;
endRound=function(){const before=state;oldEndRoundAudio();if(before==='fight'&&state==='round')audioCue('ko')};
attack=function(p,id){const ok=oldAttack(p,id);if(ok&&['super','wave','waveLow','moonKick','belly'].includes(id))audioCue(id==='super'?'super':'special',p.id);return ok};
damage=function(...args){const before=lastContact,ok=oldDamage(...args);if(ok&&lastContact!==before)audioCue(lastContact.blocked?'block':'hit',args[0].id);return ok};
const oldStepAudio=step;let countdownKey='',victoryRound=-1;const chargePulse=new WeakMap();
step=function(dt){
 const before=state,wasPaused=paused;oldStepAudio(dt);if(wasPaused||state==='menu')return;
 if(state==='intro'){if(before!=='intro')victoryRound=-1;const count=phaseTime>.65?Math.min(3,Math.max(1,Math.ceil(phaseTime-.65))):0,key=round+':'+count;if(key!==countdownKey){countdownKey=key;audioCue(count?'count':'fight',count)}}else countdownKey='';
 if(state==='round'&&phaseTime<=2.1&&victoryRound!==round){victoryRound=round;audioCue('victory')}
 if(state==='match'&&before!=='match')audioCue('champion');
 if(state==='fight')for(const p of players){if(p.action==='charge'){const beat=Math.floor(p.age/.55);if(chargePulse.get(p)!==beat){chargePulse.set(p,beat);audioCue('charge',p.id)}}else chargePulse.delete(p)}
};
const audioPause=togglePause;togglePause=function(){audioPause();audioDirector.sync()};
document.addEventListener('visibilitychange',()=>audioDirector.sync());
const oldSoundClick=$('#sound').onclick,oldMusicClick=$('#music').onclick;
$('#sound').onclick=()=>{oldSoundClick();audioDirector.sync()};$('#music').onclick=()=>{oldMusicClick();audioDirector.sync()};
const mixer=document.createElement('details');mixer.className='sound-mix';mixer.innerHTML='<summary>Mezcla de audio</summary><label>Música <input id="music-volume" aria-label="Volumen de música" type="range" min="0" max="100" value="34"></label><label>Efectos <input id="effects-volume" aria-label="Volumen de efectos" type="range" min="0" max="100" value="85"></label><small id="audio-hint" aria-live="polite">Pulsa una tecla o haz clic para activar el audio.</small>';
$('.tools').append(mixer);
for(const [id,key]of [['music-volume','music'],['effects-volume','effects']])$('#'+id).addEventListener('input',e=>{mix[key]=+e.target.value/100;audioDirector.sync()});
const initialUnlock=unlockGameAudio;unlockGameAudio=async function(){await initialUnlock();$('#audio-hint').textContent=audioDirector.errors.length?'No se pudo cargar una pista. Reabre el HTML autónomo.':audioDirector.unlocked?'Audio activo · música y efectos independientes.':'Pulsa una tecla para activar el audio.'};
window.fisiAudioDebug=()=>({unlocked:audioDirector.unlocked,track:audioDirector.track,loaded:Object.keys(audioDirector.buffers),mix:{...mix},muted,musicOn,context:audio?.state,musicGain:audioDirector.musicBus?.gain.value,events:audioDirector.events.slice(-80),errors:[...audioDirector.errors]});
