'use strict';
// Un escudo visual no amplía el hitbox ni cambia los niveles de bloqueo.
function guardShieldGeometry(p){const h=p.crouched?106:178;return{x:p.x+p.face*(p.crouched?43:48),y:FLOOR-p.y-(p.crouched?64:111),w:p.crouched?49:56,h,face:p.face};}
function shieldPath(w,h){ctx.beginPath();ctx.moveTo(0,-h*.52);ctx.lineTo(w*.57,-h*.32);ctx.lineTo(w*.52,h*.20);ctx.quadraticCurveTo(w*.34,h*.42,0,h*.55);ctx.quadraticCurveTo(-w*.34,h*.42,-w*.52,h*.20);ctx.lineTo(-w*.57,-h*.32);ctx.closePath();}
function drawGuardShield(p){
 if(!p.guard||p.hp<=0)return;const g=guardShieldGeometry(p),hit=p.stun>0,blue=p.crouched?'#74ffd4':'#78dfff';
 ctx.save();ctx.translate(Math.round(g.x),Math.round(g.y));ctx.scale(g.face,1);
 const glow=ctx.createRadialGradient(0,0,4,0,0,g.h*.62);glow.addColorStop(0,hit?'#e3fdff55':'#65dfff22');glow.addColorStop(1,'#39aaff00');ctx.fillStyle=glow;ctx.fillRect(-g.w*1.3,-g.h*.65,g.w*2.6,g.h*1.3);
 shieldPath(g.w,g.h);const glass=ctx.createLinearGradient(-g.w,0,g.w,0);glass.addColorStop(0,'#254bce38');glass.addColorStop(.5,hit?'#c4faff99':'#69dfff51');glass.addColorStop(1,'#d6fcff88');ctx.fillStyle=glass;ctx.fill();ctx.shadowColor=blue;ctx.shadowBlur=reducedFX?0:hit?21:12;ctx.strokeStyle=blue;ctx.lineWidth=hit?4:3;ctx.stroke();
 ctx.save();ctx.clip();ctx.shadowBlur=0;ctx.strokeStyle='#d4fbff55';ctx.lineWidth=1;for(let j=-3;j<=3;j++){ctx.beginPath();ctx.moveTo(-g.w,j*23);ctx.lineTo(g.w,j*23-16);ctx.stroke();}const sweep=reducedFX?0:((fxClock*70+p.id*17)%(g.h+65))-g.h*.65;ctx.fillStyle='#e7ffff35';ctx.fillRect(-g.w,sweep,g.w*2,6);ctx.restore();
 ctx.shadowBlur=0;ctx.save();ctx.scale(.73,.79);shieldPath(g.w,g.h);ctx.strokeStyle='#eaffffc9';ctx.lineWidth=1.5;ctx.stroke();ctx.restore();
 ctx.strokeStyle='#eaffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-13);ctx.lineTo(9,0);ctx.lineTo(0,15);ctx.lineTo(-9,0);ctx.closePath();ctx.stroke();
 if(hit){ctx.globalAlpha=.8;ctx.strokeStyle='#f3ffff';ctx.lineWidth=2;const r=12+(Math.sin(fxClock*25)+1)*7;ctx.beginPath();ctx.ellipse(g.w*.26,0,r,r*1.4,0,0,Math.PI*2);ctx.stroke();}
 ctx.restore();
}
