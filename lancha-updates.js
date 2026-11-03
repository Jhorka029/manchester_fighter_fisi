'use strict';
const LANCHA_SHOT_ASSETS={
  "shot0": {
    "src": "assets/personajes/lancha/revision-0.9/shot0.png",
    "height": 516,
    "anchor": 0.5586,
    "width": 226,
    "sourceHeight": 401
  },
  "shot1": {
    "src": "assets/personajes/lancha/revision-0.9/shot1.png",
    "height": 516,
    "anchor": 0.6011,
    "width": 252,
    "sourceHeight": 401
  },
  "shot2": {
    "src": "assets/personajes/lancha/revision-0.9/shot2.png",
    "height": 516,
    "anchor": 0.5502,
    "width": 230,
    "sourceHeight": 401
  },
  "shot3": {
    "src": "assets/personajes/lancha/revision-0.9/shot3.png",
    "height": 482.544,
    "anchor": 0.4116,
    "width": 355,
    "sourceHeight": 375
  },
  "shot4": {
    "src": "assets/personajes/lancha/revision-0.9/shot4.png",
    "height": 477.397,
    "anchor": 0.5733,
    "width": 361,
    "sourceHeight": 371
  },
  "shot5": {
    "src": "assets/personajes/lancha/revision-0.9/shot5.png",
    "height": 482.544,
    "anchor": 0.6498,
    "width": 353,
    "sourceHeight": 375
  },
  "shot6": {
    "src": "assets/personajes/lancha/revision-0.9/shot6.png",
    "height": 482.544,
    "anchor": 0.6105,
    "width": 368,
    "sourceHeight": 375
  },
  "shot7": {
    "src": "assets/personajes/lancha/revision-0.9/shot7.png",
    "height": 514.713,
    "anchor": 0.5605,
    "width": 226,
    "sourceHeight": 400
  }
};
const lanchaShotFrames={};
const lanchaFramesReady=Promise.all(Object.entries(LANCHA_SHOT_ASSETS).map(async([name,meta])=>{lanchaShotFrames[name]={...meta,image:await image(meta.src)};}));
const LANCHA_ROLL={startup:.28,active:4.6,recovery:.32,speed:1320,damage:7,interval:.24,maxHits:6};
let shotPuts=[],lanchaEvents=[];
function recordLancha(event){lanchaEvents.push(event);if(lanchaEvents.length>100)lanchaEvents.shift();}
function startLanchaRoll(p){
 p.move={...MOVES.super,...LANCHA_ROLL,level:'mid',knockdown:false,push:8,stun:.18};p.moveId='super';
 const o=players.find(o=>o!==p);p.rollingUltimate={dir:o&&o.x<p.x?-1:1,hits:0,nextHit:0,lift:0,bounces:0,soundBeat:-1};p.vx=p.vy=p.y=0;
 recordLancha({type:'start',x:p.x});
}
function useShotPutMove(p){p.move={...p.move,projectile:true,shotPut:true,reach:0};}
const priorLanchaAttack=attack;
attack=function(p,id){const ok=priorLanchaAttack(p,id);if(!ok)return false;
 if(p.id===0&&id==='super'&&usingUltimate(p)&&!powerClash)startLanchaRoll(p);
 else if(p.id===0&&id==='overhead'){p.move={...p.move,startup:.38,active:.12,recovery:.4};useShotPutMove(p);}
 return true;
};
const priorLanchaAdvance=advanceAttack;
advanceAttack=function(p,o,dt){
 if(p.id!==0)return priorLanchaAdvance(p,o,dt);
 if(p.moveId!=='super'){if(['overhead','charged'].includes(p.moveId)&&!p.move.shotPut)useShotPutMove(p);return priorLanchaAdvance(p,o,dt);}
 if(!p.rollingUltimate)startLanchaRoll(p);
 p.age+=dt;const m=p.move,r=p.rollingUltimate,t=p.age-m.startup;
 if(t>=0&&t<m.active){
  p.x+=r.dir*LANCHA_ROLL.speed*dt;
  if(p.x>=WORLD-65||p.x<=65){p.x=Math.max(65,Math.min(WORLD-65,p.x));r.dir*=-1;r.bounces++;recordLancha({type:'bounce',x:p.x});dust(p.x,7,r.dir,1.2);synthTone(95,.1,'triangle',.06,0,180);}
  const gap=Math.abs(p.x-o.x),desiredLift=gap<240?o.y:0;r.lift+=Math.max(-dt*900,Math.min(dt*900,desiredLift-r.lift));
  if(gap<90&&t>=r.nextHit&&r.hits<LANCHA_ROLL.maxHits){
   // La guardia mira a Lancha en el mismo instante del cruce, sin un fotograma vulnerable al girarse.
   if(o.guard)o.face=p.x>o.x?1:-1;
   r.lift=o.y;const blocked=canBlock(o,p.x,'mid'),hit=damage(p,o,{...m,ultimate:true},p.x);
   if(hit){r.hits++;r.nextHit=t+LANCHA_ROLL.interval;recordLancha({type:'hit',x:p.x,blocked,hp:o.hp});sparks(o.x,FLOOR-o.y-85,true,reducedFX?5:12);}
  }
  const beat=Math.floor(t/.25);if(beat!==r.soundBeat){r.soundBeat=beat;synthTone(65+(beat%4)*12,.11,'triangle',.035,0,40);if(!reducedFX)dust(p.x-r.dir*25,2,-r.dir,.7);}
 }else r.lift=Math.max(0,r.lift-dt*900);
 if(p.age>=m.startup+m.active+m.recovery){recordLancha({type:'end',hits:r.hits,bounces:r.bounces});Object.assign(p,{action:'idle',move:null,age:0,cooldown:.12,rollingUltimate:null});}
};
const priorShotSpawn=spawn;
spawn=function(p,superPower=false,...args){
 if(p.id!==0||superPower||!p.move?.shotPut)return priorShotSpawn(p,superPower,...args);
 const charged=p.moveId==='charged',range=charged?240:220;
 shotPuts.push({owner:p,x:p.x+p.face*75,y:FLOOR-p.y-130,vx:p.face*560,vy:-30,distance:0,range,age:0,move:{...p.move,projectile:false,damage:charged?20:15}});
 recordLancha({type:'shot',charged,range});synthTone(150,.15,'triangle',.07,0,60);noise(.08,.045,1000);
};
function stepShotPuts(dt){
 for(const ball of shotPuts){ball.age+=dt;const dx=ball.vx*dt;ball.x+=dx;ball.distance+=Math.abs(dx);ball.vy+=700*dt;ball.y+=ball.vy*dt;
  const o=players.find(p=>p!==ball.owner);if(!o){ball.gone=true;continue;}
  if(ball.distance>ball.range||ball.y>FLOOR-10){ball.gone=true;dust(ball.x,3,0,.65);continue;}
  if(overlap({x:ball.x-12,y:ball.y-12,w:24,h:24},hurtbox(o))){const hit=damage(ball.owner,o,ball.move,ball.x-Math.sign(ball.vx)*50);if(hit||usingUltimate(o)){ball.gone=true;recordLancha({type:'shot-contact',hit,hp:o.hp});noise(.08,.04,600);}}
 }
 shotPuts=shotPuts.filter(b=>!b.gone);
}
function drawShotPuts(){
 for(const b of shotPuts){ctx.save();ctx.translate(Math.round(b.x),Math.round(b.y));ctx.rotate(b.age*5*Math.sign(b.vx));
  // Bala deportiva: esfera metálica maciza, sin mecha ni explosión.
  ctx.fillStyle='#171923';ctx.beginPath();ctx.moveTo(-7,-11);ctx.lineTo(5,-11);ctx.lineTo(11,-5);ctx.lineTo(11,6);ctx.lineTo(5,11);ctx.lineTo(-6,11);ctx.lineTo(-11,5);ctx.lineTo(-11,-5);ctx.closePath();ctx.fill();
  rect(-6,-8,11,14,'#656c80');rect(-3,-8,8,5,'#a6b1bf');rect(-6,-5,4,6,'#c8d3df');rect(3,3,6,5,'#373d51');ctx.restore();
 }
}
function lanchaRollFrame(p){const m=p.move,t=p.age-m.startup;if(t<0)return Math.min(2,Math.floor(p.age/m.startup*3));if(t<m.active)return 2+Math.floor(t*18)%6;return p.age<m.startup+m.active+m.recovery*.5?8:9;}
const priorLanchaPose=pose,priorLanchaGeometry=fighterGeometry;
pose=function(p){
 if(state==='fight'&&p.id===0&&p.action==='attack'){
  if(p.moveId==='super')return{roll:lanchaRollFrame(p)};
  if(['overhead','charged'].includes(p.moveId)){
   const m=p.move;let i;if(p.age<m.startup)i=Math.min(4,Math.floor(p.age/m.startup*5));else if(p.age<m.startup+m.active)i=5;else i=p.age<m.startup+m.active+m.recovery*.55?6:7;
   return{lanchaShot:'shot'+i};
  }
 }
 return priorLanchaPose(p);
};
fighterGeometry=function(id,q){if(q.lanchaShot){const f=lanchaShotFrames[q.lanchaShot],h=characterHeight(0)*f.height/LANCHA_SHOT_ASSETS.shot0.height;return{im:f.image,h,w:f.image.width/f.image.height*h,anchor:f.anchor};}return priorLanchaGeometry(id,q);};
const priorLanchaDraw=drawFighter;
drawFighter=function(p,ghost=0){
 const rolling=state==='fight'&&p.id===0&&usingUltimate(p)&&p.rollingUltimate,lift=rolling?p.rollingUltimate.lift:0;
 if(rolling&&!ghost&&!reducedFX){ctx.save();ctx.strokeStyle='#dba2ff88';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(p.x,FLOOR-lift-64,83,65,-p.age*5,.2,Math.PI*1.8);ctx.stroke();ctx.restore();}
 ctx.save();ctx.translate(0,-lift);priorLanchaDraw(p,ghost);ctx.restore();
};
const priorShotWorld=drawWorld;
drawWorld=function(dt){priorShotWorld(dt);if(!shotPuts.length)return;ctx.save();ctx.translate(W/2,H/2);ctx.scale(camera.zoom,camera.zoom);ctx.translate(-camera.x,-camera.y);ctx.imageSmoothingEnabled=false;drawShotPuts();ctx.restore();};
const priorLanchaStep=step;
step=function(dt){const running=!paused&&state==='fight'&&!powerClash&&!cinematic()&&freeze<=0,oldTick=tick;priorLanchaStep(dt);if(running&&state==='fight')stepShotPuts(Math.max(0,tick-oldTick));if(state!=='fight'||powerClash)shotPuts=[];};
const priorLanchaRound=beginRound,priorLanchaMenu=menu,priorLanchaClash=resolvePowerClash;
beginRound=function(){shotPuts=[];priorLanchaRound();for(const p of players)p.rollingUltimate=null;};
menu=function(){shotPuts=[];priorLanchaMenu();};
resolvePowerClash=function(winner){priorLanchaClash(winner);if(winner!==null&&players[winner].id===0&&usingUltimate(players[winner]))startLanchaRoll(players[winner]);};
const priorLanchaBeginClash=beginPowerClash;
beginPowerClash=function(){shotPuts=[];for(const p of players)p.rollingUltimate=null;priorLanchaBeginClash();};
window.fisiLanchaDebug=()=>({shots:shotPuts.map(b=>({x:b.x,y:b.y,distance:b.distance,range:b.range})),events:[...lanchaEvents],roll:players.find(p=>p.id===0)?.rollingUltimate,chipFraction:.1});
