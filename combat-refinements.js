'use strict';
// Una referencia corporal por personaje; agacharse o levantar un brazo no cambia la escala.
function characterHeight(id){return SETS[id]?SETS[id].frames.idle.height/2*SETS[id].scale:258}
function fighterGeometry(id,q){
 const target=characterHeight(id);let s,im,h,anchor=.5;
 if(q.kent!==undefined){s=SETS[id].frames[q.kent];im=s.image;h=s.height/2*SETS[id].scale;anchor=s.anchor;if(/^(intro[AB]|win[ABC]?)$/.test(q.kent))h=target}
 else if(q.fsup!==undefined){s=fielSuper[q.fsup];im=s.image;h=s.height*target/fielSuper.backA.height;anchor=s.anchor}
 else if(q.lj!==undefined){s=ljFrames[q.lj];im=s.image;h=s.height*target/ljFrames.up.height;anchor=s.anchor}
 else if(q.lc!==undefined){s=lcFrames[q.lc];im=s.image;h=id===0?s.height*target/lcFrames.flex.height:s.height/2;anchor=s.anchor}
 else if(q.roll!==undefined){s=rollSprites[q.roll];im=s.image;h=s.height*target/400}
 else if(q.fiel!==undefined){s=fielRoll[q.fiel];im=s.image;h=s.height*target/fielRoll.at(-1).height}
 else if(q.show!==undefined){s=showSprites[id*4+q.show];im=s.image;h=q.show>=2?target:s.height*target/showSprites[id*4+2].height}
 else if(q.extra!==undefined||q.follow!==undefined){s=q.extra!==undefined?extraSprites[id*6+q.extra]:followSprites[id*4+q.follow];im=s.image;h=s.height*target/440;if(q.extra===1)anchor=.4;if([2,3,4].includes(q.extra))anchor=.37}
 else{im=sprites[id*6+(q.base??0)];h=target;anchor=q.base===2?.39:.5}
 return{im,h,w:im.width/im.height*h,anchor:anchor??.5};
}
const SUPER_CLASH={window:.25,goal:18,duration:6,tieLimit:10};
let powerClash=null,clashResult=null;
const usingUltimate=p=>p?.action==='attack'&&p.moveId==='super';
function superEligible(p){return p&&p.hp>0&&p.y===0&&p.action==='idle'&&p.stun<=0&&p.cooldown<=0&&!p.guard&&p.energy>=100}
function faceOpponents(){if(players.length!==2)return;players[0].face=players[1].x>players[0].x?1:-1;players[1].face=-players[0].face}
function beginPowerClash(){
 powerClash={elapsed:0,taps:[0,0],score:0,lastTap:[-1,-1],cpuClock:0,attemptStats:players.map(p=>p.stats.supers)};clashResult=null;superFX=null;freeze=0;slow=0;projectiles=[];
 for(const p of players)Object.assign(p,{energy:0,action:'clash',age:0,move:null,moveId:null,buffer:null,bufferTime:0,guard:false,crouched:false,stun:0,invulnerable:0,vx:0,vy:0,y:0});
 faceOpponents();Object.assign(camera,{x:(players[0].x+players[1].x)/2,y:304,zoom:1.04});audioCue('super',players[0].id);
}
function resolvePowerClash(winner){
 const duel=powerClash;powerClash=null;superFX=null;freeze=0;projectiles=[];
 for(const p of players)Object.assign(p,{energy:0,action:'idle',move:null,moveId:null,age:0,stun:0,cooldown:0,buffer:null,bufferTime:0,guard:false,invulnerable:0});
 clearInput();clashResult={winner,taps:[...duel.taps],time:1.1};faceOpponents();
 if(winner!==null){const p=players[winner];p.energy=100;const ok=preClashAttack(p,'super');if(!ok)throw Error('No se pudo resolver el choque de poderes');p.energy=0;p.stats.supers=duel.attemptStats[winner];}
}
function registerClashTap(index){
 const c=powerClash;if(!c||c.pendingWinner!==undefined||c.elapsed===c.lastTap[index])return;c.lastTap[index]=c.elapsed;c.taps[index]++;updateClashScore(c);sound(300+index*180,.035,'triangle',.035);
}
function updateClashScore(c){const overtime=Math.max(0,c.elapsed-SUPER_CLASH.duration),goal=Math.max(1,SUPER_CLASH.goal-overtime*(SUPER_CLASH.goal-1)/(SUPER_CLASH.tieLimit-SUPER_CLASH.duration));c.score=Math.max(-1,Math.min(1,(c.taps[0]-c.taps[1])/goal))}
function stepPowerClash(dt){
 const c=powerClash;if(c.pendingWinner!==undefined){c.resolveHold-=dt;if(c.resolveHold<=0)resolvePowerClash(c.pendingWinner);return}c.elapsed+=dt;fxClock+=dt;
 for(let i=0;i<2;i++)if(!(i===1&&mode==='cpu')&&input(i).superPress)registerClashTap(i);
 if(mode==='cpu'){const rate={easy:4.5,normal:7,hard:9.5}[difficulty]||7;c.cpuClock+=dt*rate;if(c.cpuClock>=1){c.cpuClock-=1;registerClashTap(1)}}
 updateClashScore(c);
 if(Math.abs(c.score)>=1){c.pendingWinner=c.score>0?0:1;c.resolveHold=.22;sound(880,.16,'triangle',.04)}
 else if(c.elapsed>=SUPER_CLASH.tieLimit)resolvePowerClash(null);
}
const preClashAttack=attack,preClashDamage=damage,preClashStep=step,preClashRound=beginRound,preClashMenu=menu,preClashThrow=canThrow,preClashCounter=guardCounter,preClashSpawn=spawn;
attack=function(p,id){
 if(powerClash)return false;
 if(id==='super'){
  const other=players.find(o=>o!==p);
  if(usingUltimate(other)||projectiles.some(s=>s.owner===other&&s.super)){
   if(superFX?.owner===other&&superFX.elapsed<=SUPER_CLASH.window&&superEligible(p)){p.energy-=100;p.stats.supers++;beginPowerClash();return true}
   return false;
  }
 }
 return preClashAttack(p,id);
};
damage=function(p,o,m,sourceX=p.x){
 if(powerClash||usingUltimate(o))return false;
 const ultimate=!!m.ultimate||usingUltimate(p);if(!ultimate)return preClashDamage(p,o,m,sourceX);
 const inv=o.invulnerable,action=o.action;o.invulnerable=0;o.armorUsed=true;if(['down','thrown'].includes(o.action))o.action='idle';
 const blocked=canBlock(o,sourceX,m.level),hit=preClashDamage(p,o,{...m,cost:blocked?0:m.cost,ultimate:true},sourceX);
 if(!hit){o.invulnerable=inv;o.action=action}return hit;
};
canThrow=function(p,o){return !powerClash&&!usingUltimate(o)&&preClashThrow(p,o)};
guardCounter=function(p){if(!players.some(o=>o!==p&&usingUltimate(o)))preClashCounter(p)};
spawn=function(...args){preClashSpawn(...args);if(args[1]&&projectiles.length)projectiles.at(-1).move.ultimate=true};
beginRound=function(){powerClash=null;clashResult=null;preClashRound();faceOpponents();for(const p of players){p.proneTime=0;p.prevDir={};p.tapAt={left:-9,right:-9};p.jumpAt=-9}};
menu=function(){powerClash=null;clashResult=null;preClashMenu()};
step=function(dt){
 if(paused||state==='menu'){preClashStep(dt);return}
 if(powerClash){stepPowerClash(dt);return}
 if(clashResult)clashResult.time-=dt;
 // Durante el primer acercamiento también se admite la respuesta del segundo jugador.
 if(state==='fight'&&superFX&&cinematic()&&superFX.elapsed<=SUPER_CLASH.window){
  const index=players.findIndex(p=>p!==superFX.owner),p=players[index];let press=false;
  if(index>=0&&superEligible(p)){press=index===1&&mode==='cpu'?Math.random()<dt*({easy:.8,normal:2,hard:3.5}[difficulty]||2):input(index).superPress;if(press){attack(p,'super');if(powerClash)return}}
 }
 preClashStep(dt);if(state==='intro')faceOpponents();
};
function drawClashOverlay(){
 if(!powerClash)return;const c=powerClash;ctx.save();rect(0,0,W,H,'#09051cbd');
 text(c.pendingWinner!==undefined?NAMES[players[c.pendingWinner].id]+' GANA EL CHOQUE':'¡CHOQUE DE PODERES!',W/2,120,38,'#ffe09a','center');text('PULSA RÁPIDAMENTE · NO MANTENGAS LA TECLA',W/2,155,14,'#e9dcff','center');
 const x=105,y=265,w=750,part=(c.score+1)/2;
 rect(x-4,y-4,w+8,42,'#f5d59a');rect(x,y,w,34,'#89dffb');rect(x,y,w*part,34,'#ffc66c');rect(x+w*.5-2,y-9,4,52,'#fff');rect(x+w*part-3,y-6,6,46,'#fff');
 text(NAMES[players[0].id],x,230,23,'#ffc66c');text(NAMES[players[1].id],x+w,230,23,'#89dffb','right');
 const keys=mode==='cpu'?['I / RB','CPU']:['I / RB','NUM 0 / RB'];
 text(keys[0]+' · '+c.taps[0]+' PULSACIONES',x,340,19,'#fff4de');text(keys[1]+' · '+c.taps[1]+' PULSACIONES',x+w,340,19,'#fff4de','right');
 text(c.elapsed>=SUPER_CLASH.duration?'¡ÚLTIMO IMPULSO!':Math.ceil(SUPER_CLASH.duration-c.elapsed)+' s',W/2,390,24,'#ffdc91','center');
 text('El ganador libera su ulti · ambos gastan la energía',W/2,445,15,'#d6c9e6','center');ctx.restore();
}
const preClashRender=render;
render=function(dt){preClashRender(dt);if(state==='fight')drawClashOverlay();if(clashResult?.time>0&&state==='fight'&&!powerClash){ctx.save();rect(170,130,620,52,'#11091edc');text(clashResult.winner===null?'¡EMPATE! ENERGÍA DISIPADA':NAMES[players[clashResult.winner].id]+' GANA EL CHOQUE',480,165,24,'#ffdb94','center');ctx.restore()}};
window.fisiClashDebug=()=>({active:!!powerClash,duel:powerClash?{elapsed:powerClash.elapsed,taps:[...powerClash.taps],score:powerClash.score}:null,result:clashResult?{...clashResult}:null});
const clashGuide=document.createElement('p');clashGuide.textContent='CHOQUE DE ULTIS: si ambos activan su ulti juntos, pulsa rápidamente I (P1) o 0 del teclado numérico (P2), o RB/R1 de tu mando. Mantener el botón no suma. El ganador libera la ulti y ambos gastan su energía. Defiende para bloquear una ulti: los golpes y agarres no la interrumpen.';$('.guide').append(clashGuide);
