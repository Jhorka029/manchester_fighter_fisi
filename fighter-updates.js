'use strict';
// Las láminas se recortan por celda; height expresa escala corporal, no una altura fija por pose.
const TEACHER_FRAME_ASSETS={
  "kike-parker": {
    "walkF0": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkF0.png",
      "height": 438,
      "anchor": 0.6135,
      "width": 132,
      "sourceHeight": 233
    },
    "walkF1": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkF1.png",
      "height": 432.361,
      "anchor": 0.5882,
      "width": 124,
      "sourceHeight": 230
    },
    "walkF2": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkF2.png",
      "height": 424.841,
      "anchor": 0.6155,
      "width": 135,
      "sourceHeight": 226
    },
    "walkF3": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkF3.png",
      "height": 424.841,
      "anchor": 0.5924,
      "width": 126,
      "sourceHeight": 226
    },
    "walkF4": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkF4.png",
      "height": 419.202,
      "anchor": 0.5975,
      "width": 129,
      "sourceHeight": 223
    },
    "walkF5": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkF5.png",
      "height": 419.202,
      "anchor": 0.6295,
      "width": 145,
      "sourceHeight": 223
    },
    "walkB0": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkB0.png",
      "height": 430.481,
      "anchor": 0.492,
      "width": 116,
      "sourceHeight": 229
    },
    "walkB1": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkB1.png",
      "height": 426.721,
      "anchor": 0.4896,
      "width": 110,
      "sourceHeight": 227
    },
    "walkB2": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkB2.png",
      "height": 424.841,
      "anchor": 0.4445,
      "width": 100,
      "sourceHeight": 226
    },
    "walkB3": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkB3.png",
      "height": 424.841,
      "anchor": 0.4545,
      "width": 98,
      "sourceHeight": 226
    },
    "walkB4": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkB4.png",
      "height": 424.841,
      "anchor": 0.4895,
      "width": 96,
      "sourceHeight": 226
    },
    "walkB5": {
      "src": "assets/personajes/kike-parker/revision-0.8/walkB5.png",
      "height": 424.841,
      "anchor": 0.5308,
      "width": 99,
      "sourceHeight": 226
    },
    "air0": {
      "src": "assets/personajes/kike-parker/revision-0.8/air0.png",
      "height": 436.12,
      "anchor": 0.5042,
      "width": 144,
      "sourceHeight": 232
    },
    "air1": {
      "src": "assets/personajes/kike-parker/revision-0.8/air1.png",
      "height": 422.961,
      "anchor": 0.5344,
      "width": 148,
      "sourceHeight": 225
    },
    "air2": {
      "src": "assets/personajes/kike-parker/revision-0.8/air2.png",
      "height": 344.009,
      "anchor": 0.4358,
      "width": 188,
      "sourceHeight": 183
    },
    "air3": {
      "src": "assets/personajes/kike-parker/revision-0.8/air3.png",
      "height": 278.215,
      "anchor": 0.3733,
      "width": 235,
      "sourceHeight": 148
    },
    "bite0": {
      "src": "assets/personajes/kike-parker/revision-0.8/bite0.png",
      "height": 421.082,
      "anchor": 0.5528,
      "width": 177,
      "sourceHeight": 224
    },
    "bite1": {
      "src": "assets/personajes/kike-parker/revision-0.8/bite1.png",
      "height": 415.442,
      "anchor": 0.5234,
      "width": 183,
      "sourceHeight": 221
    },
    "summon0": {
      "src": "assets/personajes/kike-parker/revision-0.8/summon0.png",
      "height": 438,
      "anchor": 0.4685,
      "width": 138,
      "sourceHeight": 233
    },
    "summon1": {
      "src": "assets/personajes/kike-parker/revision-0.8/summon1.png",
      "height": 438,
      "anchor": 0.4748,
      "width": 159,
      "sourceHeight": 233
    },
    "summon2": {
      "src": "assets/personajes/kike-parker/revision-0.8/summon2.png",
      "height": 438,
      "anchor": 0.4507,
      "width": 164,
      "sourceHeight": 233
    },
    "summon3": {
      "src": "assets/personajes/kike-parker/revision-0.8/summon3.png",
      "height": 438,
      "anchor": 0.4476,
      "width": 169,
      "sourceHeight": 233
    },
    "summon4": {
      "src": "assets/personajes/kike-parker/revision-0.8/summon4.png",
      "height": 434.24,
      "anchor": 0.409,
      "width": 208,
      "sourceHeight": 231
    },
    "summon5": {
      "src": "assets/personajes/kike-parker/revision-0.8/summon5.png",
      "height": 438,
      "anchor": 0.5061,
      "width": 155,
      "sourceHeight": 233
    }
  },
  "tigrillos": {
    "run0": {
      "src": "assets/personajes/kike-parker/tigrillos/run0.png",
      "height": 151,
      "anchor": 0.4096,
      "width": 273,
      "sourceHeight": 151
    },
    "run1": {
      "src": "assets/personajes/kike-parker/tigrillos/run1.png",
      "height": 151,
      "anchor": 0.4359,
      "width": 250,
      "sourceHeight": 151
    },
    "run2": {
      "src": "assets/personajes/kike-parker/tigrillos/run2.png",
      "height": 152,
      "anchor": 0.4315,
      "width": 246,
      "sourceHeight": 152
    },
    "run3": {
      "src": "assets/personajes/kike-parker/tigrillos/run3.png",
      "height": 144,
      "anchor": 0.4769,
      "width": 270,
      "sourceHeight": 144
    },
    "run4": {
      "src": "assets/personajes/kike-parker/tigrillos/run4.png",
      "height": 160,
      "anchor": 0.5032,
      "width": 275,
      "sourceHeight": 160
    },
    "run5": {
      "src": "assets/personajes/kike-parker/tigrillos/run5.png",
      "height": 157,
      "anchor": 0.5252,
      "width": 268,
      "sourceHeight": 157
    },
    "run6": {
      "src": "assets/personajes/kike-parker/tigrillos/run6.png",
      "height": 147,
      "anchor": 0.5325,
      "width": 270,
      "sourceHeight": 147
    },
    "run7": {
      "src": "assets/personajes/kike-parker/tigrillos/run7.png",
      "height": 147,
      "anchor": 0.4864,
      "width": 259,
      "sourceHeight": 147
    },
    "bite0": {
      "src": "assets/personajes/kike-parker/tigrillos/bite0.png",
      "height": 203,
      "anchor": 0.7732,
      "width": 246,
      "sourceHeight": 203
    },
    "bite1": {
      "src": "assets/personajes/kike-parker/tigrillos/bite1.png",
      "height": 202,
      "anchor": 0.6936,
      "width": 289,
      "sourceHeight": 202
    },
    "bite2": {
      "src": "assets/personajes/kike-parker/tigrillos/bite2.png",
      "height": 184,
      "anchor": 0.6814,
      "width": 299,
      "sourceHeight": 184
    },
    "bite3": {
      "src": "assets/personajes/kike-parker/tigrillos/bite3.png",
      "height": 168,
      "anchor": 0.6164,
      "width": 250,
      "sourceHeight": 168
    },
    "claw0": {
      "src": "assets/personajes/kike-parker/tigrillos/claw0.png",
      "height": 167,
      "anchor": 0.4032,
      "width": 289,
      "sourceHeight": 167
    },
    "claw1": {
      "src": "assets/personajes/kike-parker/tigrillos/claw1.png",
      "height": 163,
      "anchor": 0.449,
      "width": 292,
      "sourceHeight": 163
    },
    "claw2": {
      "src": "assets/personajes/kike-parker/tigrillos/claw2.png",
      "height": 169,
      "anchor": 0.4225,
      "width": 274,
      "sourceHeight": 169
    },
    "claw3": {
      "src": "assets/personajes/kike-parker/tigrillos/claw3.png",
      "height": 163,
      "anchor": 0.1881,
      "width": 242,
      "sourceHeight": 163
    }
  },
  "ingestrella": {
    "air0": {
      "src": "assets/personajes/ingestrella/revision-0.8/air0.png",
      "height": 436,
      "anchor": 0.4434,
      "width": 174,
      "sourceHeight": 308
    },
    "air1": {
      "src": "assets/personajes/ingestrella/revision-0.8/air1.png",
      "height": 414.766,
      "anchor": 0.3247,
      "width": 256,
      "sourceHeight": 293
    },
    "air2": {
      "src": "assets/personajes/ingestrella/revision-0.8/air2.png",
      "height": 362.39,
      "anchor": 0.3209,
      "width": 285,
      "sourceHeight": 256
    },
    "air3": {
      "src": "assets/personajes/ingestrella/revision-0.8/air3.png",
      "height": 448.74,
      "anchor": 0.5057,
      "width": 179,
      "sourceHeight": 317
    },
    "kick0": {
      "src": "assets/personajes/ingestrella/revision-0.8/kick0.png",
      "height": 436,
      "anchor": 0.3797,
      "width": 266,
      "sourceHeight": 600
    },
    "kick1": {
      "src": "assets/personajes/ingestrella/revision-0.8/kick1.png",
      "height": 428.733,
      "anchor": 0.2804,
      "width": 425,
      "sourceHeight": 590
    },
    "kick2": {
      "src": "assets/personajes/ingestrella/revision-0.8/kick2.png",
      "height": 424.373,
      "anchor": 0.4465,
      "width": 239,
      "sourceHeight": 584
    }
  },
  "cardenas": {
    "air0": {
      "src": "assets/personajes/cardenas/revision-0.8/air0.png",
      "height": 442,
      "anchor": 0.3909,
      "width": 193,
      "sourceHeight": 316
    },
    "air1": {
      "src": "assets/personajes/cardenas/revision-0.8/air1.png",
      "height": 419.62,
      "anchor": 0.2813,
      "width": 290,
      "sourceHeight": 300
    },
    "air2": {
      "src": "assets/personajes/cardenas/revision-0.8/air2.png",
      "height": 374.861,
      "anchor": 0.2974,
      "width": 294,
      "sourceHeight": 268
    },
    "air3": {
      "src": "assets/personajes/cardenas/revision-0.8/air3.png",
      "height": 444.797,
      "anchor": 0.461,
      "width": 179,
      "sourceHeight": 318
    },
    "over0": {
      "src": "assets/personajes/cardenas/revision-0.8/over0.png",
      "height": 418.222,
      "anchor": 0.3568,
      "width": 241,
      "sourceHeight": 299
    },
    "over1": {
      "src": "assets/personajes/cardenas/revision-0.8/over1.png",
      "height": 479.766,
      "anchor": 0.4072,
      "width": 243,
      "sourceHeight": 343
    },
    "over2": {
      "src": "assets/personajes/cardenas/revision-0.8/over2.png",
      "height": 397.241,
      "anchor": 0.4316,
      "width": 302,
      "sourceHeight": 284
    },
    "over3": {
      "src": "assets/personajes/cardenas/revision-0.8/over3.png",
      "height": 372.063,
      "anchor": 0.4579,
      "width": 292,
      "sourceHeight": 266
    }
  }
};
const teacherFrames={},tigrilloFrames={};
const teacherFramesReady=Promise.all(Object.entries(TEACHER_FRAME_ASSETS).map(async([who,frames])=>{
 const store=who==='tigrillos'?tigrilloFrames:(teacherFrames[who]={});
 await Promise.all(Object.entries(frames).map(async([name,meta])=>{store[name]={image:await image(meta.src),height:meta.height,anchor:meta.anchor};}));
}));
// La frase de activación de Kike se conserva solo como texto, sin pista de voz.
const teacherAudioReady=Promise.resolve();
function applyTeacherFrames(){
 Object.assign(kpFrames,teacherFrames['kike-parker']);Object.assign(ieFrames,teacherFrames.ingestrella);Object.assign(cdFrames,teacherFrames.cardenas);
 ieFrames.airKick=ieFrames.air2;kpFrames.airKick=kpFrames.air3;cdFrames.airKick=cdFrames.air2;
 cdFrames.overheadPrep=cdFrames.over0;cdFrames.overheadHit=cdFrames.over2;
 SETS[4].midKick=['kick0','kick1','kick0','kick2'];
}
let tigrillos=[],tigrilloEvents=[];
function tigerEvent(event){tigrilloEvents.push(event);if(tigrilloEvents.length>100)tigrilloEvents.shift();}
function stopKikePhrase(){}
function startKikeUltimate(p){
 const phrase=.65;
 p.move={...p.move,startup:phrase+.14,active:3.8,recovery:.45};p.tigerSpawned=0;p.tigerDone=0;p.tigerEnd=null;p.tigerCasting=true;
 floaters.push({s:'¡Ya me aburrieron tigrillos!',x:p.x,y:FLOOR-255,t:phrase+.3,c:'#ffe39c'});tigerEvent({type:'ultimate',id:p.id});
}
const teacherOldAttack=attack;
attack=function(p,id){
 const ok=teacherOldAttack(p,id);if(!ok)return false;
 if(p.id===5&&id==='super'&&usingUltimate(p)&&!powerClash){
  startKikeUltimate(p);
 }else if(p.id===5&&id==='overhead')p.move={...p.move,startup:.4,active:.18,recovery:.4,reach:190};
 return true;
};
function launchTigrillo(owner,index){
 const target=players.find(p=>p!==owner);if(!target)return;
 const lane=index%3;tigrillos.push({owner,target,index,x:owner.x+owner.face*(35-index%2*14),y:FLOOR-18-lane*5,face:owner.face,age:0,phase:'run',phaseAge:0,lane});
 tigerEvent({type:'spawn',index});if(index%3===0){synthTone(200+index*17,.10,'sawtooth',.05,0,90);noise(.08,.035,1300);}
}
const teacherOldAdvance=advanceAttack;
advanceAttack=function(p,o,dt){
 if(p.id===5&&p.moveId==='super'){
  p.age+=dt;const t=p.age-p.move.startup;
  if(t>=0)while(p.tigerSpawned<10&&t>=p.tigerSpawned*.145)launchTigrillo(p,p.tigerSpawned++);
  if(p.tigerSpawned===10&&p.tigerDone===10){p.tigerEnd??=p.age;if(p.age-p.tigerEnd>=p.move.recovery){p.action='idle';p.move=null;p.age=0;p.cooldown=.1;p.tigerCasting=false;}}
  return;
 }
 if(p.id===5&&p.moveId==='charged'&&p.move.reach!==190)p.move={...p.move,reach:190};
 teacherOldAdvance(p,o,dt);
};
function stepTigrillos(dt){
 for(const cat of tigrillos){cat.age+=dt;cat.phaseAge+=dt;const o=cat.target;
  if(cat.phase==='claw'){if(cat.phaseAge>=.28)cat.phase='gone';continue;}
  const tx=o.x+(cat.index%2?16:-16),ty=FLOOR-o.y-75-(cat.index%3)*13;
  const dx=tx-cat.x,dy=ty-cat.y;cat.face=dx>=0?1:-1;
  if(cat.phase==='run'&&Math.abs(dx)<135){cat.phase='leap';cat.phaseAge=0;}
  const speed=cat.phase==='run'?650+cat.index*12:950,dist=Math.hypot(dx,dy),travel=speed*dt;
  if(cat.phase==='run'){cat.x+=Math.sign(dx)*Math.min(Math.abs(dx),travel);cat.y=FLOOR-18-cat.lane*5;}
  else{cat.x+=dx*Math.min(1,travel/Math.max(dist,1));cat.y+=dy*Math.min(1,travel/Math.max(dist,1));}
  if(cat.phase==='leap'&&dist<38){
   const hit=damage(cat.owner,o,{...MOVES.super,damage:4,stun:.16,push:4,reach:0,knockdown:false,level:'mid',ultimate:true},o.x-cat.owner.face*60);
   // Un intento se consume al contactar: la guardia bloquea sin multiplicar el daño.
   cat.phase='claw';cat.phaseAge=0;cat.owner.tigerDone++;tigerEvent({type:'contact',index:cat.index,hit,blocked:!!o.guard});
   sparks(o.x,FLOOR-o.y-95,false,reducedFX?3:7);synthTone(450+cat.index*22,.065,'triangle',.045,0,180);
  }
 }
 tigrillos=tigrillos.filter(c=>c.phase!=='gone');
}
function drawCatSprite(name,x,y,face,width,alpha=1){const f=tigrilloFrames[name];if(!f)return;const h=width*f.image.height/f.image.width;ctx.save();ctx.globalAlpha=alpha;ctx.translate(Math.round(x),Math.round(y));ctx.scale(face,1);ctx.imageSmoothingEnabled=false;ctx.drawImage(f.image,-width*.5,-h,width,h);ctx.restore();}
function drawTigrillos(){
 for(const c of tigrillos){const frame=c.phase==='run'?'run'+Math.floor(c.age*18)%8:c.phase==='leap'?'bite'+Math.min(3,Math.floor(c.phaseAge*13)):'claw'+Math.min(3,Math.floor(c.phaseAge*15));
  if(c.phase==='claw'){c.x=c.target.x+(c.index%2?18:-18);c.y=FLOOR-c.target.y-55-(c.index%3)*16;}
  if(!reducedFX&&c.phase==='run'){rect(c.x-c.face*39,c.y-14,18,2,'#ffde9c99');rect(c.x-c.face*48,c.y-6,12,2,'#d89c6d77');}
  drawCatSprite(frame,c.x,c.y,c.face,65,c.phase==='claw'?Math.min(1,(.28-c.phaseAge)/.07):1);
 }
}
function drawBiteTigrillo(p){
 if(state!=='fight'||p.id!==5||p.action!=='attack'||!['overhead','charged'].includes(p.moveId))return;
 const m=p.move,t=p.age-m.startup;if(t<-.17||t>m.active+.22)return;
 const k=Math.max(0,Math.min(1,(t+.17)/(.17+m.active))),distance=38+k*125,arc=Math.sin(k*Math.PI)*50;
 drawCatSprite(t<0?'bite'+Math.min(2,Math.floor((t+.17)/.17*3)):'claw'+Math.min(3,Math.floor(t*18)),p.x+p.face*distance,FLOOR-p.y-65-arc,p.face,96,Math.min(1,(m.active+.22-t)/.15));
 if(!reducedFX&&t>=0&&t<m.active){ctx.save();ctx.strokeStyle='#ffe5a8';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(p.x+p.face*(distance-12-i*7),FLOOR-128+i*12);ctx.lineTo(p.x+p.face*(distance+15-i*7),FLOOR-91+i*12);ctx.stroke();}ctx.restore();}
}
const teacherOldDraw=drawFighter;
drawFighter=function(p,ghost=0){teacherOldDraw(p,ghost);if(!ghost)drawBiteTigrillo(p);};
const teacherOldPose=pose;
function timedKick(p,names){const m=p.move;if(p.age<m.startup)return names[p.age<m.startup*.5?0:1];if(p.age<m.startup+m.active)return names[2];return names[3];}
pose=function(p){
 if(state!=='fight')return teacherOldPose(p);
 if([4,5,6].includes(p.id)&&p.action==='attack'&&p.moveId==='airKick')return{kent:timedKick(p,p.id===5?['air0','air2','air3','air1']:['air0','air1','air2','air3'])};
 if(p.id===6&&p.action==='attack'&&['overhead','charged'].includes(p.moveId))return{kent:timedKick(p,['over0','over1','over2','over3'])};
 if(p.id===5&&p.action==='attack'){
  if(p.moveId==='super'){const t=p.age,m=p.move;return{kent:t<m.startup?'summon'+Math.min(3,Math.floor(t/m.startup*4)):t<m.startup+1.55?'summon'+(3+Math.floor((t-m.startup)*7)%2):'summon5'};}
  if(['overhead','charged'].includes(p.moveId)){const m=p.move;return{kent:p.age<m.startup*.5?'summon1':p.age<m.startup?'bite0':p.age<m.startup+m.active?'bite1':p.age<m.startup+m.active+m.recovery*.6?'summon4':'summon5'};}
 }
 if(p.id===5&&(p.action==='dash'||p.action==='idle'&&p.walk)&&!p.guard&&!p.crouched&&p.y===0){const backward=p.action==='dash'?p.dashDir!==p.face:(p.walkDirection||p.face)!==p.face,clock=p.action==='dash'?p.age*18:(p.walkClock||0)*11;return{kent:(backward?'walkB':'walkF')+(Math.floor(clock)%6)};}
 return teacherOldPose(p);
};
const teacherOldStep=step;
step=function(dt){
 const running=!paused&&state==='fight'&&!powerClash&&!cinematic()&&freeze<=0,oldTick=tick,positions=players.map(p=>p.x);
 teacherOldStep(dt);
 const elapsed=Math.max(0,tick-oldTick);
 if(running&&state==='fight')stepTigrillos(elapsed);
 if(!paused&&state==='fight')players.forEach((p,i)=>{if(p.walk&&p.y===0){p.walkClock=(p.walkClock||0)+elapsed;const dx=p.x-positions[i];if(Math.abs(dx)>.01)p.walkDirection=Math.sign(dx);}else if(p.action==='idle')p.walkClock=0;});
 if(state!=='fight'||powerClash){tigrillos=[];stopKikePhrase();}
};
const teacherOldRound=beginRound,teacherOldMenu=menu;
beginRound=function(){tigrillos=[];stopKikePhrase();teacherOldRound();};
menu=function(){tigrillos=[];stopKikePhrase();teacherOldMenu();};
const teacherOldBeginClash=beginPowerClash,teacherOldResolveClash=resolvePowerClash;
beginPowerClash=function(){stopKikePhrase();tigrillos=[];teacherOldBeginClash();};
resolvePowerClash=function(winner){teacherOldResolveClash(winner);if(winner!==null&&players[winner].id===5&&usingUltimate(players[winner]))startKikeUltimate(players[winner]);};
window.fisiTeacherDebug=()=>({frames:Object.fromEntries(Object.entries(teacherFrames).map(([n,f])=>[n,Object.keys(f).length])),tigrilloFrames:Object.keys(tigrilloFrames).length,tigrillos:tigrillos.map(c=>({index:c.index,phase:c.phase,x:c.x,y:c.y})),events:[...tigrilloEvents],exit:{active:exitPrompt.active,choice:exitPrompt.choice}});
