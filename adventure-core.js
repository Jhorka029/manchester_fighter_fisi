'use strict';
const FISIAdventure=(()=>{
 const TILE=32,STATES=Object.freeze({IDLE:'IDLE',RUNNING:'RUNNING',JUMPING:'JUMPING',FALLING:'FALLING',ATTACKING:'ATTACKING',HURT:'HURT',DASHING:'DASHING'});
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),approach=(v,target,amount)=>v<target?Math.min(target,v+amount):Math.max(target,v-amount);
 function aabb(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
 class ObjectPool{
  constructor(factory,size){this.items=Array.from({length:size},()=>{const item=factory();item.active=false;return item;});this.peak=0;}
  acquire(values={}){const item=this.items.find(p=>!p.active);if(!item)return null;Object.assign(item,values,{active:true});this.peak=Math.max(this.peak,this.items.reduce((n,p)=>n+Number(p.active),0));return item;}
  release(item){item.active=false;}clear(){for(const p of this.items)p.active=false;}
 }
 class TileMap{
  constructor(rows){this.rows=rows.map(r=>[...r]);this.width=this.rows[0].length*TILE;this.height=this.rows.length*TILE;}
  tile(c,r){return this.rows[r]?.[c]||'.';}
  active(c,r,time){return this.tile(c,r)!=='='||((time+c*.071)%2.8)<1.95;}
  solid(c,r,time){return['#','~','-','='].includes(this.tile(c,r))&&this.active(c,r,time);}
  rects(box,time,includeOneWay=true){const result=[],c0=Math.floor(box.x/TILE)-1,c1=Math.floor((box.x+box.w)/TILE)+1,r0=Math.floor(box.y/TILE)-1,r1=Math.floor((box.y+box.h)/TILE)+1;for(let r=r0;r<=r1;r++)for(let c=c0;c<=c1;c++)if(this.solid(c,r,time)&&(includeOneWay||!['-','='].includes(this.tile(c,r))))result.push({x:c*TILE,y:r*TILE,w:TILE,h:TILE,oneWay:['-','='].includes(this.tile(c,r))});return result;}
 }
 function moveBody(body,map,dt,time){
  body.wall=0;body.grounded=false;body.x+=body.vx*dt;
  for(const t of map.rects(body,time,false))if(aabb(body,t)){if(body.vx>0){body.x=t.x-body.w;body.wall=1;}else if(body.vx<0){body.x=t.x+t.w;body.wall=-1;}body.vx=0;}
  const oldBottom=body.y+body.h;body.y+=body.vy*dt;
  for(const t of map.rects(body,time))if(aabb(body,t)){if(t.oneWay&&(body.vy<0||oldBottom>t.y+2))continue;if(body.vy>=0){body.y=t.y-body.h;body.grounded=true;}else if(!t.oneWay)body.y=t.y+t.h;else continue;body.vy=0;}
  body.x=clamp(body.x,0,map.width-body.w);
 }
 class Player{
  constructor(hero=1){this.hero=hero;this.x=80;this.y=440;this.w=26;this.h=60;this.vx=0;this.vy=0;this.face=1;this.state=STATES.IDLE;this.hp=100;this.energy=100;this.grounded=false;this.wall=0;this.jumps=0;this.coyote=0;this.buffer=0;this.dashTime=0;this.dashCooldown=0;this.lock=0;this.attackTime=0;this.attackKind='';this.combo=0;this.comboQueue=false;this.comboGrace=0;this.hitIds=new Set();this.invulnerability=0;this.shieldTime=0;this.multiplierTime=0;this.scoreMultiplier=1;this.hurtTime=0;this.anim=0;this.crouched=false;this.blocking=false;this.airSuspend=0;this.sandTime=0;this.stats={hits:0,kills:0,maxCombo:0};}
  get isInvulnerable(){return this.invulnerability>0||this.shieldTime>0;}
  get box(){return{x:this.x,y:this.y,w:this.w,h:this.h};}
  get attackBox(){if(this.attackTime<=0)return null;const elapsed=this.attackDuration-this.attackTime;if(elapsed<.065||elapsed>this.attackDuration-.07)return null;const w=this.attackKind==='air'?64:this.combo===3?65:48;return{x:this.face>0?this.x+this.w-4:this.x-w+4,y:this.y+(this.crouched?4:10),w,h:this.attackKind==='air'?38:32};}
  resetAt(checkpoint){Object.assign(this,{x:checkpoint.x,y:checkpoint.y,vx:0,vy:0,jumps:0,attackTime:0,dashTime:0,hurtTime:0,invulnerability:1.1,state:STATES.IDLE});}
  attack(kind,world){if(this.hurtTime>0||this.dashTime>0)return;if(this.attackTime>0){this.comboQueue=true;return;}this.combo=kind==='kick'?3:this.comboGrace>0?this.combo%3+1:1;this.attackKind=!this.grounded?'air':kind;this.attackDuration=this.attackKind==='air'?.36:this.combo===3?.38:.27;this.attackTime=this.attackDuration;this.hitIds.clear();this.state=STATES.ATTACKING;if(this.attackKind==='air'){this.vy=Math.min(this.vy,15);this.airSuspend=.1;}world.emit('attack',this.x,this.y,this.combo);}
  hurt(amount,source,world){if(this.isInvulnerable||this.hp<=0)return false;if(this.blocking&&this.energy>=10){this.energy-=10;amount=Math.max(1,Math.round(amount*.15));world.emit('block',this.x+this.w/2,this.y+24);}this.hp=clamp(this.hp-amount,0,100);this.invulnerability=.72;this.hurtTime=.22;this.vx=(this.x>=source?1:-1)*220;this.vy=-150;this.attackTime=0;world.hitCombo=0;world.emit('hurt',this.x,this.y,amount);return true;}
  update(input,dt,world){
   this.anim+=dt;for(const key of['dashCooldown','lock','hurtTime','invulnerability','shieldTime','multiplierTime','comboGrace','airSuspend'])this[key]=Math.max(0,this[key]-dt);this.scoreMultiplier=this.multiplierTime>0?2:1;
   this.energy=clamp(this.energy+dt*(this.blocking?4:14),0,100);this.blocking=!!input.block&&this.grounded&&this.attackTime<=0;
   const bottom=this.y+this.h,wantsCrouch=!!input.down&&this.grounded&&!this.attackTime;if(wantsCrouch&&!this.crouched){this.h=36;this.y=bottom-this.h;this.crouched=true;}else if(!wantsCrouch&&this.crouched){const stand={x:this.x,y:bottom-60,w:this.w,h:59};if(!world.map.rects(stand,world.time,false).some(t=>aabb(stand,t))){this.h=60;this.y=bottom-60;this.crouched=false;}}
   if(this.grounded){this.coyote=.1;this.jumps=0;}else this.coyote=Math.max(0,this.coyote-dt);this.buffer=input.jumpPress?.12:Math.max(0,this.buffer-dt);
   const direction=Number(!!input.right)-Number(!!input.left);if(direction&&!this.dashTime&&!this.hurtTime)this.face=direction;
   if(input.dashPress&&this.dashCooldown===0&&this.energy>=20&&!this.hurtTime){this.energy-=20;this.dashTime=.16;this.dashCooldown=.7;this.dashDirection=direction||this.face;this.invulnerability=Math.max(this.invulnerability,.1);world.emit('dash',this.x,this.y);}
   if(this.buffer>0&&!this.hurtTime&&!this.crouched){if(this.wall&&!this.grounded){this.vx=-this.wall*350;this.vy=-590;this.lock=.2;this.face=-this.wall;this.jumps=1;this.buffer=0;world.emit('jump',this.x,this.y,2);}else if(this.coyote>0||this.jumps<2){this.jumps=this.coyote>0?1:this.jumps+1;this.vy=this.jumps===1?-600:-550;this.grounded=false;this.coyote=0;this.buffer=0;world.emit('jump',this.x,this.y,this.jumps);}}
   if(input.jumpRelease&&this.vy<-210)this.vy*=.53;
   if(input.attackPress)this.attack('punch',world);if(input.kickPress)this.attack('kick',world);
   if(input.codePress&&this.energy>=18&&!this.hurtTime){this.energy-=18;world.shot(this.x+this.w/2+this.face*22,this.y+this.h*.4,this.face*530,0,true,'code',18);this.attackKind='code';this.attackDuration=.24;this.attackTime=.24;this.hitIds.clear();world.emit('code',this.x,this.y);}
   if(input.burstPress&&this.energy>=50&&!this.hurtTime){this.energy-=50;this.invulnerability=.35;for(const e of world.enemies.items)if(e.active&&Math.hypot(e.x-this.x,e.y-this.y)<180)e.hurt(35,this.face,world,true);world.emit('burst',this.x+13,this.y+30);}
   if(this.dashTime>0){this.dashTime=Math.max(0,this.dashTime-dt);this.vx=this.dashDirection*680;this.vy=0;this.state=STATES.DASHING;}else{if(this.hurtTime<=0&&this.lock<=0)this.vx=approach(this.vx,direction*(this.crouched?90:this.blocking?70:235),dt*(direction?1500:2000));if(this.airSuspend<=0)this.vy=Math.min(850,this.vy+1650*dt);}
   const lastWall=this.wall;moveBody(this,world.map,dt,world.time);if(!this.wall&&lastWall&&!this.grounded){const probe={x:this.x+lastWall*2,y:this.y,w:this.w,h:this.h};if(world.map.rects(probe,world.time,false).some(t=>aabb(probe,t)))this.wall=lastWall;}if(this.wall&&!this.grounded&&this.vy>180)this.vy=180;
   if(this.attackTime>0){this.attackTime=Math.max(0,this.attackTime-dt);if(this.attackTime===0){this.comboGrace=.35;if(this.comboQueue){this.comboQueue=false;this.attack('punch',world);}}}
   this.state=this.hurtTime>0?STATES.HURT:this.dashTime>0?STATES.DASHING:this.attackTime>0?STATES.ATTACKING:!this.grounded?this.vy<0?STATES.JUMPING:STATES.FALLING:Math.abs(this.vx)>12?STATES.RUNNING:STATES.IDLE;
   const tile=world.map.tile(Math.floor((this.x+13)/TILE),Math.floor((this.y+this.h+2)/TILE));if(tile==='~'&&this.grounded){this.vx*=.46;this.sandTime+=dt;if(this.sandTime>2.5){this.hurt(3,this.x,world);this.sandTime=1.8;}}else this.sandTime=0;
   if(this.y>world.map.height+100){this.hp=Math.max(0,this.hp-15);this.resetAt(world.checkpoint);world.emit('fall',this.x,this.y,15);}
  }
 }
 class Enemy{
  constructor(){this.active=false;}
  init(record,cycle){Object.assign(this,{record,kind:record.kind,x:record.x,y:record.y,w:record.kind==='tank'?43:record.kind==='fly'?30:28,h:record.kind==='tank'?53:record.kind==='fly'?27:25,vx:0,vy:0,face:record.face||1,age:record.age||0,attackTime:0,cooldown:.8,hurtTime:0,flash:0,grounded:false,wall:0,phase:'patrol',superArmor:record.kind==='tank',hp:record.hp??(record.kind==='tank'?48+cycle*3:record.kind==='fly'?18+cycle:22+cycle),maxHp:record.maxHp??(record.kind==='tank'?48+cycle*3:record.kind==='fly'?18+cycle:22+cycle),baseY:record.homeY??record.y,attackHit:false});}
  hurt(amount,dir,world,heavy=false){if(!this.active)return;this.hp-=amount;this.flash=.12;if(!this.superArmor){this.hurtTime=.16;this.attackTime=0;this.cooldown=.3;this.vx=dir*(heavy?310:170);this.vy=-90;}world.registerHit(this,amount);if(this.hp<=0){world.player.stats.kills++;world.score+=100*world.player.scoreMultiplier;world.emit('defeat',this.x+this.w/2,this.y+this.h/2,100*world.player.scoreMultiplier);this.record.dead=true;world.enemies.release(this);}}
  update(dt,world){const p=world.player;this.age+=dt;this.cooldown=Math.max(0,this.cooldown-dt);this.flash=Math.max(0,this.flash-dt);this.hurtTime=Math.max(0,this.hurtTime-dt);const dx=p.x-this.x,d=Math.abs(dx);if(this.kind==='fly'){this.x+=Math.sin(this.age*.9+this.record.id)*55*dt;this.y=this.baseY+Math.sin(this.age*2.8+this.record.id)*28;this.face=dx>=0?1:-1;if(d<420&&this.cooldown===0){world.shot(this.x+15,this.y+25,clamp(dx,-160,160),190,false,'malware',9);this.cooldown=1.6;}return;}
   if(this.attackTime>0){this.attackTime-=dt;this.vx=0;if(this.attackTime<(this.kind==='tank'?.25:.16)&&!this.attackHit){this.attackHit=true;const reach=this.kind==='tank'?74:38,box={x:this.face>0?this.x+this.w-3:this.x-reach+3,y:this.y-3,w:reach,h:this.h+8};if(aabb(box,p.box))p.hurt(this.kind==='tank'?16:9,this.x,world);world.emit('enemy-attack',this.x,this.y,this.kind);}if(this.attackTime<=0){this.phase='recover';this.cooldown=this.kind==='tank'?1.2:.75;}}
   else if(!this.hurtTime){if(d<320){this.face=dx>=0?1:-1;this.phase='chase';}if(d<(this.kind==='tank'?85:48)&&Math.abs(p.y-this.y)<70&&this.cooldown===0){this.phase='windup';this.attackTime=this.kind==='tank'?.8:.38;this.attackHit=false;this.vx=0;}else{this.vx=this.face*(this.kind==='tank'?42:d<320?105:44);if(this.wall)this.face*=-1;const ahead=Math.floor((this.x+(this.face>0?this.w+8:-8))/TILE),below=Math.floor((this.y+this.h+12)/TILE);if(this.grounded&&!world.map.solid(ahead,below,world.time)){this.face*=-1;this.vx=this.face*40;}}}
   this.vy=Math.min(800,this.vy+1650*dt);moveBody(this,world.map,dt,world.time);if(this.y>world.map.height+80){this.record.dead=true;world.enemies.release(this);}}
 }
 function applyCollectible(player,item,world){if(item.taken)return false;item.taken=true;switch(item.kind){case'hp':player.hp=clamp(player.hp+20,0,100);break;case'energy':player.energy=100;break;case'shield':player.shieldTime=5;break;case'multiplier':player.multiplierTime=12;player.scoreMultiplier=2;break;case'credit':world.credits++;world.score+=75;break;default:world.score+=5*player.scoreMultiplier;}world.emit('pickup',item.x,item.y,item.kind);return true;}
 class World{
  constructor(level,hero=1,onEvent=()=>{}){this.level=level;this.map=new TileMap(level.rows);this.player=new Player(hero);this.player.y=17*TILE-60;this.time=0;this.score=0;this.credits=0;this.hitCombo=0;this.comboTimer=0;this.camera={x:0,y:96};this.checkpoint={x:80,y:17*TILE-60};this.onEvent=onEvent;this.items=level.items.map(i=>({...i,taken:false}));this.records=level.enemies.map((e,id)=>({...e,id,homeY:e.y,dead:false}));this.enemies=new ObjectPool(()=>new Enemy(),24);this.shots=new ObjectPool(()=>({}),72);this.fx=new ObjectPool(()=>({}),160);this.checkpoints=level.checkpoints.map(x=>({x,y:17*TILE-60,active:false}));this.trapClocks=new Map();this.deadline=0;this.gateReady=false;this.failed=false;}
  emit(type,x,y,value){const color=type==='hurt'?'#ff7c90':type==='pickup'?'#ffe29b':type==='code'?'#7cfff3':'#bca0ff';for(let j=0;j<(type==='burst'?30:7);j++){const a=j*2.4+this.time,v=type==='burst'?130:45+j*8;this.fx.acquire({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,life:type==='burst'?.6:.35,maxLife:type==='burst'?.6:.35,color,size:2+j%2,type:type==='burst'?'burst':'spark'});}this.onEvent(type,{x,y,value});}
  shot(x,y,vx,vy,friendly,kind,damage){return this.shots.acquire({x,y,vx,vy,w:kind==='equation'?25:18,h:18,friendly,kind,damage,life:2.2,spin:0});}
  registerHit(enemy,damage){this.player.stats.hits++;this.hitCombo++;this.comboTimer=2;this.player.stats.maxCombo=Math.max(this.hitCombo,this.player.stats.maxCombo);this.score+=10*(this.player.combo||1)*this.player.scoreMultiplier;this.emit('hit',enemy.x,enemy.y,damage);}
  update(input,dt){if(this.failed)return;this.time+=dt;this.comboTimer=Math.max(0,this.comboTimer-dt);if(!this.comboTimer)this.hitCombo=0;this.player.update(input,dt,this);const p=this.player,near={x:this.camera.x-420,y:0,w:960+840,h:this.map.height};
   for(const record of this.records){if(record.dead)continue;const active=this.enemies.items.find(e=>e.active&&e.record===record);if(!active&&record.x>near.x&&record.x<near.x+near.w){const enemy=this.enemies.acquire();if(enemy)enemy.init(record,this.level.cycle);}else if(active&&(active.x<near.x-200||active.x>near.x+near.w+200)){Object.assign(record,{x:active.x,y:active.y,hp:active.hp,maxHp:active.maxHp,face:active.face,age:active.age});this.enemies.release(active);}}
   for(const enemy of this.enemies.items)if(enemy.active){enemy.update(dt,this);const box=p.attackKind==='code'?null:p.attackBox;if(box&&aabb(box,enemy)&&!p.hitIds.has(enemy.record.id)){p.hitIds.add(enemy.record.id);enemy.hurt(p.attackKind==='air'?16:p.combo===3?20:p.combo===2?12:9,p.face,this,p.combo===3);}if(enemy.active&&aabb(enemy,p.box)&&enemy.kind!=='tank')p.hurt(7,enemy.x,this);}
   for(const shot of this.shots.items)if(shot.active){shot.life-=dt;shot.x+=shot.vx*dt;shot.y+=shot.vy*dt;shot.spin+=dt;const tile=this.map.tile(Math.floor(shot.x/TILE),Math.floor(shot.y/TILE));if(shot.life<=0||tile==='#'){this.shots.release(shot);continue;}if(shot.friendly){for(const enemy of this.enemies.items)if(enemy.active&&aabb(shot,enemy)){enemy.hurt(shot.damage,Math.sign(shot.vx),this,true);this.shots.release(shot);break;}}else if(aabb(shot,p.box)){p.hurt(shot.damage,shot.x,this);this.shots.release(shot);}}
   for(const item of this.items)if(!item.taken&&aabb(p.box,{x:item.x-12,y:item.y-14,w:26,h:28}))applyCollectible(p,item,this);
   for(const cp of this.checkpoints)if(!cp.reached&&Math.abs(p.x-cp.x)<38&&p.grounded){for(const c of this.checkpoints)c.active=false;cp.active=true;cp.reached=true;this.checkpoint={x:cp.x,y:cp.y};p.hp=Math.min(100,p.hp+10);this.emit('checkpoint',cp.x,cp.y);}
   const c=Math.floor((p.x+p.w/2)/TILE),r=Math.floor((p.y+p.h-5)/TILE);for(let rr=r-1;rr<=r+1;rr++)for(let cc=c-1;cc<=c+1;cc++){const t=this.map.tile(cc,rr),box={x:cc*TILE,y:rr*TILE,w:TILE,h:TILE};if(t==='^'&&aabb(p.box,{...box,y:box.y+17,h:15}))p.hurt(12,box.x,this);if(t==='!'&&((this.time+cc*.1)%2.8)<1.65&&aabb(p.box,{...box,x:box.x+13,w:6}))p.hurt(10,box.x,this);}
   for(const trap of this.level.equations)if(Math.abs(p.x-trap.x)<240){const timer=(this.trapClocks.get(trap.x)||0)-dt;this.trapClocks.set(trap.x,timer);if(timer<=0){this.trapClocks.set(trap.x,2.2);this.shot(trap.x,trap.y,0,250,false,'equation',10);}}
   const inDeadline=this.level.deadline&&p.x>this.level.deadline[0]&&p.x<this.level.deadline[1];if(inDeadline){this.deadline+=dt;if(this.deadline>9){p.hurt(6,p.x,this);this.deadline=6;}}else this.deadline=0;
   for(const fx of this.fx.items)if(fx.active){fx.life-=dt;fx.x+=fx.vx*dt;fx.y+=fx.vy*dt;fx.vy+=150*dt;if(fx.life<=0)this.fx.release(fx);}
   this.camera.x=approach(this.camera.x,clamp(p.x-960*.38,0,this.map.width-960),dt*600);this.camera.y+=(clamp(p.y-540*.52,0,this.map.height-540)-this.camera.y)*(1-Math.exp(-dt*7));
   this.gateReady=Math.abs(p.x-this.level.gate.x)<90&&this.credits>=3;if(this.gateReady&&input.interactPress){this.onEvent('gate',{});return;}if(p.hp<=0){this.failed=true;this.onEvent('defeated',{});}
  }
 }
 return{TILE,STATES,Player,Enemy,World,TileMap,ObjectPool,aabb,moveBody,applyCollectible};
})();
