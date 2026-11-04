'use strict';
// Encuadres de presentación. Las fotografías originales se conservan sin editar.
const PORTRAIT_FRAMING={2:{x:.49,y:.46,zoom:1.1},3:{x:.62,y:.36,zoom:1.5},4:{x:.55,y:.36,zoom:1.55},5:{x:.51,y:.34,zoom:1.6},6:{x:.54,y:.41,zoom:1.35},7:{x:.5,y:.43,zoom:1.05},8:{x:.55,y:.37,zoom:1.5},9:{x:.51,y:.29,zoom:1.35},10:{x:.59,y:.55,zoom:1.25},11:{x:.56,y:.48,zoom:1.12}};
function portraitPhotoCrop(im,id){const f=PORTRAIT_FRAMING[id];if(!f){const side=Math.min(im.width,im.height);return{x:(im.width-side)/2,y:(im.height-side)*.28,side};}const side=Math.min(im.width,im.height)/f.zoom;return{x:Math.max(0,Math.min(im.width-side,im.width*f.x-side/2)),y:Math.max(0,Math.min(im.height-side,im.height*f.y-side/2)),side};}
drawPortrait=function(im,x,y,s,color){const id=portrait.indexOf(im),crop=portraitPhotoCrop(im,id);ctx.save();rect(x-4,y-4,s+8,s+8,color);ctx.drawImage(im,crop.x,crop.y,crop.side,crop.side,x,y,s,s);ctx.restore();};
// Usa exactamente el mismo encuadre que VS e intro en la cuadrícula de selección.
const thumbnailCache=new Map();
function realPortraitThumbnail(id){if(!PORTRAIT_FRAMING[id]||!portrait[id])return FRONT_FACES[id];if(thumbnailCache.has(id))return thumbnailCache.get(id);const im=portrait[id],crop=portraitPhotoCrop(im,id),c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(im,crop.x,crop.y,crop.side,crop.side,0,0,256,256);const url=c.toDataURL('image/jpeg',.92);thumbnailCache.set(id,url);return url;}
const beforePhotoUI=frontUI;
frontUI=function(){beforePhotoUI();if(!ready||front.page!=='characters')return;document.querySelectorAll('[data-id] img').forEach(im=>{const id=+im.closest('[data-id]').dataset.id;if(PORTRAIT_FRAMING[id])im.src=realPortraitThumbnail(id);});};
