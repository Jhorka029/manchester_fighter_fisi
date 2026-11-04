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
 if(q.fiel10)return original; // Los PNG nuevos ya están recortados; no leer sus píxeles durante el ataque.
 if(q.lanchaShot)return geometryAtHeight(original,VISIBLE_FIGHTER_HEIGHT*LANCHA_SHOT_ASSETS[q.lanchaShot].height/LANCHA_SHOT_ASSETS.shot0.height);
 // Una unidad de dibujo por colección, calculada desde el cuerpo de pie.
 // El alto del rectángulo cambia al encoger las piernas o elevar brazos/efectos;
 // eso no debe cambiar el tamaño de la cabeza ni ensanchar el cuerpo.
 let reference,units;
 if(q.kent!==undefined){const idle=SETS[id].frames.idle;reference=idle.height*visibleSprite(idle.image).h/idle.image.height;units=SETS[id].frames[q.kent].height;}
 else if(q.fsup!==undefined){reference=fielSuper.backA.height;units=fielSuper[q.fsup].height;}
 else if(q.lj!==undefined){reference=ljFrames.up.height;units=ljFrames[q.lj].height;}
 else if(q.lc!==undefined){reference=id===0?lcFrames.flex.height:440;units=lcFrames[q.lc].height;}
 else if(q.roll!==undefined){reference=400;units=rollSprites[q.roll].height;}
 else if(q.fiel!==undefined){reference=fielRoll.at(-1).height;units=fielRoll[q.fiel].height;}
 else if(q.show!==undefined){reference=showSprites[id*4+2].height;units=showSprites[id*4+q.show].height;}
 else if(q.extra!==undefined||q.follow!==undefined){reference=440;units=(q.extra!==undefined?extraSprites[id*6+q.extra]:followSprites[id*4+q.follow]).height;}
 else{reference=visibleSprite(sprites[id*6]).h;units=original.im.height;}
 // Estas hojas se dibujaron con resoluciones corporales distintas a su atlas.
 // Compensación única por colección; nunca depende del tiempo ni de la cámara.
 let calibration=1;
 if(id===1&&q.lc!==undefined)calibration=.9;
 if(id===4&&q.kent!==undefined){if(/^air[0-3]$/.test(q.kent))calibration=.88;else if(/^charge[AB]$/.test(q.kent))calibration=1.12;else if(/^jump(Up|Down)$/.test(q.kent))calibration=1.10;else if(q.kent==='flipSpin')calibration=1.08;}
 return trimGeometry(geometryAtHeight(original,VISIBLE_FIGHTER_HEIGHT*units/reference*calibration));
};
frontHero=function(id,x,y,height=320,flip=false,intro=false){
 const q=SETS[id]?{kent:resolvePose(id,intro?(Math.floor(front.time*2)%2?'introB':'introA'):'idle')}:intro?{show:2+Math.floor(front.time*2)%2}:{base:0},g=fighterGeometry(id,q),b=visibleSprite(g.im),w=b.w/b.h*height;
 fc.save();fc.translate(x,y);fc.scale(flip?-1:1,1);fc.fillStyle='#100a2477';fc.beginPath();fc.ellipse(0,0,60,10,0,0,7);fc.fill();fc.drawImage(frontFighterImage(id,b.im,flip),-w/2,-height+Math.sin(front.time*4)*2,w,height);fc.restore();
};
