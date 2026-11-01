'use strict';
// Presentación local 0.6: utiliza el mismo elenco y catálogo que el combate.
const PRESENTATION={stageBeat:1.4,fighterBeat:1.15,finalBeat:2.4};
const presentationDuration=()=>GAME_ASSETS.stages.length*PRESENTATION.stageBeat+NAMES.length*PRESENTATION.fighterBeat+PRESENTATION.finalBeat;
const originalDrawFront=drawFront,originalFrontUI=frontUI;
const clamp01=n=>Math.max(0,Math.min(1,n));
const introEase=n=>1-Math.pow(1-clamp01(n),3);
function rosterSprite(id,poseName='introA'){
 const set=SETS[id];if(set){const fr=set.frames[resolvePose(id,poseName)];return fr.image}
 return showSprites[id*4+2]?.image||sprites[id*6];
}
function posterFighter(id,x,base,height,flip=false){
 const im=rosterSprite(id),w=im.width/im.height*height;
 fc.save();fc.translate(Math.round(x),base);fc.scale(flip?-1:1,1);
 fc.fillStyle='#100c1844';fc.beginPath();fc.ellipse(0,0,w*.38,8,0,0,Math.PI*2);fc.fill();
 fc.drawImage(im,Math.round(-w/2),-height,Math.round(w),height);fc.restore();
}
function drawRosterPoster(){
 const i=GAME_ASSETS.stages.findIndex(s=>s.id==='fisi');frontCover(stageImages[i],1);
 // Dos filas escalonadas mantienen visibles las caras y los trajes originales.
 const back=[6,2,4,5,7],near=[0,1,3,8];
 back.forEach((id,j)=>posterFighter(id,115+j*180,405,185,j>2));
 near.forEach((id,j)=>posterFighter(id,175+j*205,527,id===0?243:230,j>1));
}
function introBackdrop(id,t){
 frontCover(stageImages[id],1.035+Math.min(t,.9)*.025,Math.sin(t)*8);
 frontShade(.22);
}
function drawFighterCard(id,local){
 const duration=PRESENTATION.fighterBeat,k=clamp01(local/duration),color=THEMES[id].color;
 frontCover(stageImages[(id+4)%stageImages.length],1.08);frontShade(.76);
 fc.fillStyle=THEMES[id].dark;fc.beginPath();fc.moveTo(0,0);fc.lineTo(710,0);fc.lineTo(465,H);fc.lineTo(0,H);fc.fill();
 if(!reducedFX){fc.globalAlpha=.28;fc.fillStyle=color;for(let j=0;j<16;j++){const x=((local*900+j*127)%(W+300))-150;fc.fillRect(x,75+j*27,150+j%3*50,2)}fc.globalAlpha=1}
 const enter=reducedFX?1:introEase(local/.32),exit=reducedFX?0:introEase((local-duration+.17)/.17);
 const x=665+(1-enter)*580-exit*100;
 if(portrait[id]){fc.save();fc.globalAlpha=.16;const im=portrait[id],side=Math.min(im.width,im.height);fc.drawImage(im,(im.width-side)/2,0,side,side,0,0,520,520);fc.restore()}
 posterFighter(id,x,530,405,id%2===1);
 frontText(String(id+1).padStart(2,'0')+' / '+String(NAMES.length).padStart(2,'0'),65,125,20,color,'left');
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
 const t=front.elapsed,stageEnd=GAME_ASSETS.stages.length*PRESENTATION.stageBeat,fighterEnd=stageEnd+NAMES.length*PRESENTATION.fighterBeat;
 if(front.page==='title'){
  drawRosterPoster();const g=fc.createLinearGradient(0,0,0,H);g.addColorStop(0,'#080518bd');g.addColorStop(.4,'#08051800');g.addColorStop(.85,'#08051800');g.addColorStop(1,'#080518dd');fc.fillStyle=g;fc.fillRect(0,0,W,H);
 }else if(t<stageEnd){
  const i=Math.floor(t/PRESENTATION.stageBeat),local=t%PRESENTATION.stageBeat;introBackdrop(i,local);
  fc.fillStyle='#0c0923c9';fc.fillRect(0,368,W,126);
  frontText('SIETE ESCENARIOS · UN MISMO ORGULLO',480,394,14,'#ffd18b');
  frontText(GAME_ASSETS.stages[i].name.toUpperCase(),480,438,i===5?27:35);
  frontText(GAME_ASSETS.stages[i].location,480,473,15,'#d5c9e4');
  if(!reducedFX){const cover=1-introEase(local/.22);fc.fillStyle='#0b0719';fc.fillRect(0,0,W*cover,H)}
 }else if(t<fighterEnd){const n=(t-stageEnd)/PRESENTATION.fighterBeat;drawFighterCard(Math.min(NAMES.length-1,Math.floor(n)),(n%1)*PRESENTATION.fighterBeat)}
 else{drawRosterPoster();frontShade(.42);if(crestImage)fc.drawImage(crestImage,423,35,114,114);frontText('MANCHESTER',480,202,48,'#ffe0a0');frontText('FISI FIGHTER',480,258,55,'#ffc469');frontText('NUEVE LUCHADORES · UN SOLO CAMPUS',480,300,16,'#fff0cf');if(t>=presentationDuration())frontGo('title')}
 frontScore();
};
frontUI();
const combatDebugV05=window.fisiDebug;
window.fisiDebug=()=>({...combatDebugV05(),version:'0.6'});
$('.brand small').textContent='TORNEO DEL CAMPUS · EDICIÓN ARCADE 0.6';
