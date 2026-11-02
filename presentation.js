'use strict';
// Presentación local 0.6: utiliza el mismo elenco y catálogo que el combate.
const PRESENTATION={creditsBeat:8,sponsorBeat:3,stageBeat:1.0,fighterBeat:1.15,finalBeat:2.4};
const openingDuration=()=>PRESENTATION.creditsBeat+PRESENTATION.sponsorBeat;
const presentationDuration=()=>openingDuration()+GAME_ASSETS.stages.length*PRESENTATION.stageBeat+NAMES.length*PRESENTATION.fighterBeat+PRESENTATION.finalBeat;
const sponsorImage=new Image();sponsorImage.src='assets/interfaz/core-fk-pixel.png';
const originalDrawFront=drawFront,originalFrontUI=frontUI;
const clamp01=n=>Math.max(0,Math.min(1,n));
const introEase=n=>1-Math.pow(1-clamp01(n),3);
function rosterSprite(id,poseName='introA'){
 const set=SETS[id];if(set){const fr=set.frames[resolvePose(id,poseName)];return fr.image}
 return showSprites[id*4+2]?.image||sprites[id*6];
}
function posterMotion(id,time){const phase=time*(1.65+id*.13)+id*.82;return reducedFX?{x:0,y:0,angle:0}:{x:Math.sin(phase*.7)*1.1,y:Math.sin(phase)*2,angle:Math.sin(phase*.8)*.006};}
function posterFighter(id,x,base,height,flip=false,animate=false){
 const g=fighterGeometry(id,SETS[id]?{kent:resolvePose(id,'introA')}:{show:2}),im=g.im;if(!animate)height*=g.h/258;const w=im.width/im.height*height,m=animate?posterMotion(id,front.time):{x:0,y:0,angle:0};
 fc.save();fc.translate(Math.round(x+m.x),base+m.y);fc.scale(flip?-1:1,1);fc.rotate(m.angle);
 fc.fillStyle='#100c1844';fc.beginPath();fc.ellipse(0,0,w*.38,8,0,0,Math.PI*2);fc.fill();
 fc.drawImage(im,Math.round(-w/2),-height,Math.round(w),height);fc.restore();
}
function drawRosterPoster(){
 const i=GAME_ASSETS.stages.findIndex(s=>s.id==='fisi');frontCover(stageImages[i],1);
 // Dos filas escalonadas mantienen visibles las caras y los trajes originales.
 const back=[6,2,4,5,7],near=[0,1,3,8];
 back.forEach((id,j)=>posterFighter(id,115+j*180,405,185,j>2,true));
 near.forEach((id,j)=>posterFighter(id,175+j*205,527,230,j>1,true));
}
function introBackdrop(id,t){
 const progress=clamp01(t/PRESENTATION.stageBeat);
 frontCover(stageImages[id],reducedFX?1.025:1.015+progress*.10,Math.sin(t)*5);
 if(id>0&&progress<.2){fc.save();fc.globalAlpha=1-progress/.2;frontCover(stageImages[id-1],reducedFX?1.025:1.115);fc.restore()}
 frontShade(.22);
}
function drawOpeningCredits(t){
 frontCover(stageImages[6],1.035);frontShade(.9);
 fc.fillStyle='#ee9a3444';fc.fillRect(132,106,696,2);fc.fillRect(132,454,696,2);
 if(t<PRESENTATION.creditsBeat){
  frontText('MANCHESTER FISI FIGHTER',480,82,20,'#ffce88');
  frontText('Creador del Proyecto:',480,152,18,'#e9b56e');
  frontText('Jordy Jhorkaet Curay Acosta',480,187,25,'#fff5dc');
  frontText('Desarrolladores:',480,246,18,'#e9b56e');
  ['Gabriel Alessandro Flores Ramírez','Darick Gerald Herrera Castillo','Ronald Lancha Chuquilin','Jordy Jhorkaet Curay Acosta'].forEach((name,i)=>frontText(name,480,282+i*37,22,'#f1e7fa'));
 }else{
  frontText('Auspiciadores:',480,147,25,'#ffd08a');
  if(sponsorImage.complete&&sponsorImage.naturalWidth){const h=250,w=sponsorImage.width/sponsorImage.height*h;fc.fillStyle='#fff3dd';fc.fillRect(480-w/2-18,163,w+36,h+14);fc.drawImage(sponsorImage,480-w/2,170,w,h)}
  else frontText('CORE FK',480,310,58,'#ee942f');
  frontText('CORE FK',480,441,23,'#f0b15d');
 }
}
function drawFighterCard(id,local,orderIndex=id){
 const duration=PRESENTATION.fighterBeat,k=clamp01(local/duration),color=THEMES[id].color;
 frontCover(stageImages[(id+4)%stageImages.length],1.08);frontShade(.76);
 fc.fillStyle=THEMES[id].dark;fc.beginPath();fc.moveTo(0,0);fc.lineTo(710,0);fc.lineTo(465,H);fc.lineTo(0,H);fc.fill();
 if(!reducedFX){fc.globalAlpha=.28;fc.fillStyle=color;for(let j=0;j<16;j++){const x=((local*900+j*127)%(W+300))-150;fc.fillRect(x,75+j*27,150+j%3*50,2)}fc.globalAlpha=1}
 const enter=reducedFX?1:introEase(local/.32),exit=reducedFX?0:introEase((local-duration+.17)/.17);
 const x=665+(1-enter)*580-exit*100;
 if(portrait[id]){fc.save();fc.globalAlpha=.16;const im=portrait[id],side=Math.min(im.width,im.height);fc.drawImage(im,(im.width-side)/2,0,side,side,0,0,520,520);fc.restore()}
 posterFighter(id,x,530,405,id%2===1);
 frontText(String(orderIndex+1).padStart(2,'0')+' / '+String(NAMES.length).padStart(2,'0'),65,125,20,color,'left');
 frontText('EL ORGULLO DEL CAMPUS',65,173,14,'#cfc2e3','left');
 const size=NAMES[id].length>10?42:54;
 frontText(NAMES[id],65-(1-enter)*450,263,size,color,'left');
 frontText(FRONT_ROLES[id],68,307,20,'#fff0cc','left');
 fc.fillStyle=color;fc.fillRect(68,333,265*enter,4);
 frontText(POWER_NAMES[id],68,376,15,'#dbd1e7','left');
 // Barrido diagonal de salida sin destellos a pantalla completa.
 if(exit>0){fc.fillStyle='#0d091b';fc.beginPath();fc.moveTo(W*(1-exit),0);fc.lineTo(W,0);fc.lineTo(W,H);fc.lineTo(W*(1-exit)-120,H);fc.fill()}
}
frontUI=function(){originalFrontUI();$('#front-ui').classList.toggle('roster-title',front.page==='title');$('.screen').classList.toggle('presentation-cinematic',['intro','title'].includes(front.page));const bar=$('.intro-progress i');if(bar)bar.style.animationDuration=presentationDuration()+'s'};
drawFront=function(dt){
 if(!ready||!['intro','title'].includes(front.page)){originalDrawFront(dt);return}
 front.time+=dt;front.elapsed+=document.hidden?0:dt;fc.imageSmoothingEnabled=false;fc.clearRect(0,0,W,H);if(!front.painted)frontUI();
 const t=front.elapsed,stageStart=openingDuration(),stageEnd=stageStart+GAME_ASSETS.stages.length*PRESENTATION.stageBeat,fighterEnd=stageEnd+NAMES.length*PRESENTATION.fighterBeat;
 if(front.page==='title'){
  drawRosterPoster();const g=fc.createLinearGradient(0,0,0,H);g.addColorStop(0,'#080518bd');g.addColorStop(.4,'#08051800');g.addColorStop(.85,'#08051800');g.addColorStop(1,'#080518dd');fc.fillStyle=g;fc.fillRect(0,0,W,H);
 }else if(t<stageStart){drawOpeningCredits(t)}else if(t<stageEnd){
  const elapsed=t-stageStart,i=Math.floor(elapsed/PRESENTATION.stageBeat),local=elapsed%PRESENTATION.stageBeat;introBackdrop(i,local);
  fc.fillStyle='#0c0923c9';fc.fillRect(0,368,W,126);
  frontText('SIETE ESCENARIOS · UN MISMO ORGULLO',480,394,14,'#ffd18b');
  frontText(GAME_ASSETS.stages[i].name.toUpperCase(),480,438,i===5?27:35);
  frontText(GAME_ASSETS.stages[i].location,480,473,15,'#d5c9e4');
 }else if(t<fighterEnd){const n=(t-stageEnd)/PRESENTATION.fighterBeat,order=typeof ROSTER_ORDER==='undefined'?NAMES.map((_,i)=>i):ROSTER_ORDER,pos=Math.min(NAMES.length-1,Math.floor(n));drawFighterCard(order[pos],(n%1)*PRESENTATION.fighterBeat,pos)}
 else{drawRosterPoster();frontShade(.42);if(crestImage)fc.drawImage(crestImage,423,35,114,114);frontText('MANCHESTER',480,202,48,'#ffe0a0');frontText('FISI FIGHTER',480,258,55,'#ffc469');frontText('NUEVE LUCHADORES · UN SOLO CAMPUS',480,300,16,'#fff0cf');if(t>=presentationDuration())frontGo('title')}
 frontScore();
};
frontUI();
const combatDebugV05=window.fisiDebug;
window.fisiDebug=()=>({...combatDebugV05(),version:'0.7'});
$('.brand small').textContent='TORNEO DEL CAMPUS · EDICIÓN ARCADE 0.7';
