'use strict';
const VISIBLE_FIGHTER_HEIGHT=218,spriteTrimCache=new WeakMap();
function visibleSprite(im){
 if(spriteTrimCache.has(im))return spriteTrimCache.get(im);
 const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0);const d=g.getImageData(0,0,c.width,c.height).data;let x0=c.width,y0=c.height,x1=-1,y1=-1;
 for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]>32){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
 if(x1<0){x0=y0=0;x1=im.width-1;y1=im.height-1;}
 const crop=document.createElement('canvas');crop.width=x1-x0+1;crop.height=y1-y0+1;crop.getContext('2d').drawImage(im,x0,y0,crop.width,crop.height,0,0,crop.width,crop.height);
 const value={im:crop,x:x0,y:y0,w:crop.width,h:crop.height};spriteTrimCache.set(im,value);spriteTrimCache.set(crop,{im:crop,x:0,y:0,w:crop.width,h:crop.height});return value;
}
function trimGeometry(g){const b=visibleSprite(g.im),h=g.h*b.h/g.im.height,w=g.w*b.w/g.im.width;return{im:b.im,h,w,anchor:(g.anchor*g.im.width-b.x)/b.w};}
function geometryAtHeight(g,h){const k=h/g.h;return{...g,h,w:g.w*k};}
const beforeVisibleGeometry=fighterGeometry;
fighterGeometry=function(id,q){
 const original=beforeVisibleGeometry(id,q);
 if(q.fiel10||q.grab11)return original; // Los PNG nuevos ya están recortados; no leer sus píxeles durante el ataque.
 if(q.lanchaShot)return geometryAtHeight(original,VISIBLE_FIGHTER_HEIGHT*LANCHA_SHOT_ASSETS[q.lanchaShot].height/LANCHA_SHOT_ASSETS.shot0.height);
 let g=trimGeometry(original);
 const idle=SETS[id]?resolvePose(id,'idle'):null;
 if(q.base===0||q.base===1||q.base===2||(q.kent===idle&&idle!==null))g=geometryAtHeight(g,VISIBLE_FIGHTER_HEIGHT);
 return g;
};
frontHero=function(id,x,y,height=320,flip=false,intro=false){
 const q=SETS[id]?{kent:resolvePose(id,intro?(Math.floor(front.time*2)%2?'introB':'introA'):'idle')}:intro?{show:2+Math.floor(front.time*2)%2}:{base:0},g=fighterGeometry(id,q),b=visibleSprite(g.im),w=b.w/b.h*height;
 fc.save();fc.translate(x,y);fc.scale(flip?-1:1,1);fc.fillStyle='#100a2477';fc.beginPath();fc.ellipse(0,0,60,10,0,0,7);fc.fill();fc.drawImage(frontFighterImage(id,b.im,flip),-w/2,-height+Math.sin(front.time*4)*2,w,height);fc.restore();
};
