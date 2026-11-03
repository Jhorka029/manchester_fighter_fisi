const GRAB_ASSETS={
  "0-grab0": {
    "src": "assets/personajes/lancha/agarres/grab0.png",
    "height": 254,
    "anchor": 0.5
  },
  "0-grab1": {
    "src": "assets/personajes/lancha/agarres/grab1.png",
    "height": 252,
    "anchor": 0.5
  },
  "0-grab2": {
    "src": "assets/personajes/lancha/agarres/grab2.png",
    "height": 249,
    "anchor": 0.5
  },
  "0-grab3": {
    "src": "assets/personajes/lancha/agarres/grab3.png",
    "height": 248,
    "anchor": 0.5
  },
  "0-grab4": {
    "src": "assets/personajes/lancha/agarres/grab4.png",
    "height": 250,
    "anchor": 0.5
  },
  "0-grab5": {
    "src": "assets/personajes/lancha/agarres/grab5.png",
    "height": 263,
    "anchor": 0.5
  },
  "0-grab6": {
    "src": "assets/personajes/lancha/agarres/grab6.png",
    "height": 219,
    "anchor": 0.5
  },
  "0-grab7": {
    "src": "assets/personajes/lancha/agarres/grab7.png",
    "height": 241,
    "anchor": 0.5
  },
  "0-landing": {
    "src": "assets/personajes/lancha/agarres/landing.png",
    "height": 235,
    "anchor": 0.5
  },
  "0-recover": {
    "src": "assets/personajes/lancha/agarres/recover.png",
    "height": 193,
    "anchor": 0.5
  },
  "1-grab0": {
    "src": "assets/personajes/el-fiel/agarres/grab0.png",
    "height": 266,
    "anchor": 0.5
  },
  "1-grab1": {
    "src": "assets/personajes/el-fiel/agarres/grab1.png",
    "height": 255,
    "anchor": 0.5
  },
  "1-grab2": {
    "src": "assets/personajes/el-fiel/agarres/grab2.png",
    "height": 230,
    "anchor": 0.5
  },
  "1-grab3": {
    "src": "assets/personajes/el-fiel/agarres/grab3.png",
    "height": 270,
    "anchor": 0.5
  },
  "1-grab4": {
    "src": "assets/personajes/el-fiel/agarres/grab4.png",
    "height": 257,
    "anchor": 0.5
  },
  "1-grab5": {
    "src": "assets/personajes/el-fiel/agarres/grab5.png",
    "height": 169,
    "anchor": 0.5
  },
  "1-grab6": {
    "src": "assets/personajes/el-fiel/agarres/grab6.png",
    "height": 229,
    "anchor": 0.5
  },
  "1-grab7": {
    "src": "assets/personajes/el-fiel/agarres/grab7.png",
    "height": 267,
    "anchor": 0.5
  }
};
'use strict';
// Los frames contienen la postura completa: no se vuelve a rotar el cuerpo al dibujarlos.
const grabFrames={},grabFramesReady=Promise.all(Object.entries(GRAB_ASSETS).map(async([name,m])=>{grabFrames[name]={...m,image:await image(m.src)};}));
const priorGrabPose=pose,priorGrabGeometry=fighterGeometry,priorGrabThrower=throwerAt,priorGrabVictim=victimAt;
THROW_DUR[1]=.72;THROWER_DUR[1]=.98;
function grabFrame(p){const times=p.id===0?[0,.1,.2,.3,.4,.52,.64,.82]:[0,.1,.2,.3,.4,.5,.64,.82];let n=0;while(n<7&&p.age>=times[n+1])n++;return p.id+'-grab'+n;}
pose=function(p){if(state==='fight'&&p.id<2){if(p.action==='throwing')return{grab11:grabFrame(p)};if(p.id===0&&p.action==='idle'&&!p.leap&&!p.proneTime){if(p.y>0&&p.vy<=0)return{grab11:'0-landing'};if(p.landTime>0)return{grab11:'0-recover'};}}return priorGrabPose(p);};
fighterGeometry=function(id,q){if(q.grab11){const f=grabFrames[q.grab11],reference=GRAB_ASSETS[id+'-grab0'].height,h=218*f.height/reference;return{im:f.image,h,w:f.image.width/f.image.height*h,anchor:f.anchor};}return priorGrabGeometry(id,q);};
throwerAt=function(p){if(p.id<2&&p.action==='throwing')return{pose:{grab11:grabFrame(p)},dx:0,dy:0,rot:0,sx:1,sy:1};return priorGrabThrower(p);};
victimAt=function(v,a=v.age){return priorGrabVictim(v,v.throwBy===1&&!v.throwUp?a*.52/.72:a);};
const priorGrabDraw=drawFighter;
function drawGrabAura(p){const color=p.id===0?'#ffcf73':'#87edff',a=p.age,beat=p.id===0?.64:.5;ctx.save();ctx.translate(p.x,FLOOR-p.y-100);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=reducedFX?.3:.65;ctx.strokeStyle=color;ctx.lineWidth=2;for(let i=0;i<3;i++){const angle=a*8+i*Math.PI*2/3,x=Math.cos(angle)*65,y=Math.sin(angle)*38;ctx.beginPath();ctx.moveTo(x-5,y);ctx.lineTo(x+5,y);ctx.moveTo(x,y-5);ctx.lineTo(x,y+5);ctx.stroke();}if(a>beat-.12&&a<beat+.2){const k=(a-beat+.12)/.32;ctx.globalAlpha=(1-k)*.7;ctx.lineWidth=4*(1-k)+1;ctx.beginPath();ctx.ellipse(p.face*35,45,25+k*90,12+k*35,0,0,Math.PI*2);ctx.stroke();}ctx.restore();}
drawFighter=function(p,ghost=0){if(!ghost&&p.id<2&&p.action==='throwing')drawGrabAura(p);priorGrabDraw(p,ghost);};
