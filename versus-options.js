'use strict';
const ROSTER_ORDER=[1,0,2,3,8,9,4,5,6,7],STUDENT_IDS=[0,1,2,3,8,9];
const LIFE_COLORS=['#ed4b58','#f4cb50','#9be76b','#79ddf5','#4972f4'],LIFE_NAMES=['Rojo','Amarillo','Verde claro','Celeste','Azul'];
front.lifeBars=[1,1];let lastRoundWinner=-1;
function getMaxHp(p){return p.maxHp||100;}
function setLifeBars(p,n=1){p.lifeBars=Math.max(1,Math.min(5,Math.round(Number(n)||1)));p.maxHp=p.lifeBars*100;p.hp=p.hpTrail=p.maxHp;}
function roundWinner(){const a=players[0],b=players[1],x=a.hp/getMaxHp(a),y=b.hp/getMaxHp(b);return Math.abs(x-y)<1e-7?-1:x>y?0:1;}
function isRoundChampion(p){return lastRoundWinner>=0?players[lastRoundWinner]===p:p.hp>0&&p.hp===Math.max(...players.map(v=>v.hp));}
function applyMatchAppearance(){if(players.length!==2)return;players[0].alternate=false;players[1].alternate=players[0].id===players[1].id;}
const outfitCache=new WeakMap();
function alternateClothesImage(im,id){
 let cache=outfitCache.get(im);if(!cache){cache={};outfitCache.set(im,cache)}if(cache[id])return cache[id];
 const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);const d=x.getImageData(0,0,c.width,c.height);
 for(let i=0;i<d.data.length;i+=4){if(!d.data[i+3])continue;const r=d.data[i]/255,g=d.data[i+1]/255,b=d.data[i+2]/255,max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,s=max?delta/max:0;let hue=0;if(delta)hue=(max===r?(g-b)/delta+(g<b?6:0):max===g?(b-r)/delta+2:(r-g)/delta+4)*60;
 const skin=hue>9&&hue<55&&s>.19&&r>g&&g>b,yy=Math.floor(i/4/c.width)/c.height;
 const chroma=s>.28&&(hue<12||hue>310||hue>180&&hue<310),neutral=s<.22&&max>.25&&yy>.17&&yy<.77;
 if(skin||max<.12||!(chroma||neutral))continue;const v=Math.min(1,max*(id===0||id===1?1.22:1.05)+.06),sat=id===0||id===1?.4:.62;const C=v*sat,X=C*.68,m=v-C;d.data[i]=(X+m)*255;d.data[i+1]=m*255;d.data[i+2]=(C+m)*255;
 }x.putImageData(d,0,0);cache[id]=c;return c;
}
function fighterImage(p,im){return p.alternate?alternateClothesImage(im,p.id):im;}
function frontFighterImage(id,im,flip){return front.page==='characters'&&front.mode!=='battle'&&flip&&front.picks[0]===front.picks[1]?alternateClothesImage(im,id):im;}
const baseHealthRound=beginRound;
beginRound=function(){lastRoundWinner=-1;baseHealthRound();applyMatchAppearance();};
hud=function(){
 players.forEach((p,i)=>{const x=i?543:35,hp=Math.max(0,p.hp),layer=Math.max(1,Math.ceil(hp/100)),part=hp<=0?0:((hp-1e-7)%100+1e-7)/100,al=i?'right':'left';
 rect(x-3,36,385,27,'#e4c48e');rect(x,39,379,21,'#25192e');if(layer>1)rect(x,39,379,21,LIFE_COLORS[layer-2]);const width=379*Math.min(1,part);rect(i?x+379-width:x,39,width,21,LIFE_COLORS[layer-1]);rect(x,39,379,4,'#ffffff44');if(p.hpShake>0)rect(x,39,379,21,'#ffffff33');
 text(NAMES[p.id]+(p.alternate?' · FISI':''),i?925:35,27,19,'#fff1d0',al);text(layer+' / '+(p.lifeBars||1)+' BARRAS · '+Number(hp.toFixed(1))+' / '+getMaxHp(p),i?925:35,76,10,'#e8dff3',al);
 if(p.dizzy>0)rect(x,62,379*p.dizzy/100,3,'#fa8acb');for(let n=1;n<=(p.lifeBars||1);n++)rect(x+145+(n-1)*18,83,14,4,hp>0&&n<=layer?LIFE_COLORS[n-1]:'#332841');if(typeof battle!=='undefined'&&!battle.active)for(let j=0;j<2;j++){ctx.fillStyle=j<p.wins?'#ffdb72':'#42304e';ctx.beginPath();ctx.arc(i?915-j*18:45+j*18,90,4,0,7);ctx.fill();}
 rect(x,487,379,13,'#19172b');rect(i?x+379-379*p.energy/100:x,487,379*p.energy/100,13,p.energy>=100?THEMES[p.id].color:'#738de9');text(p.energy>=100?'SUPER LISTO':Math.floor(p.energy)+'% ENERGÍA',i?922:35,517,13,'#d9d0eb',al);
 });text(mode==='training'?'∞':Math.ceil(Math.max(0,clock)).toString().padStart(2,'0'),480,60,36,'#fff0c8','center');text(typeof battle!=='undefined'&&battle.active?'BATALLA '+(battle.index+1)+'/8':'AL MEJOR DE 3',480,79,10,'#d2bbdf','center');
};
