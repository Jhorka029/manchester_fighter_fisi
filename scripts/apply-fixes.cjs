const fs = require('fs');
const path = require('path');

function patchFile(filePath, searchStr, replaceStr) {
  let content = fs.readFileSync(filePath, 'utf8');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedSearch = searchStr.replace(/\r\n/g, '\n');
  if (!normalizedContent.includes(normalizedSearch)) {
    throw new Error(`Target snippet not found in ${filePath}`);
  }
  const isCRLF = content.includes('\r\n');
  let updated = normalizedContent.replace(normalizedSearch, replaceStr.replace(/\r\n/g, '\n'));
  if (isCRLF) {
    updated = updated.replace(/\n/g, '\r\n');
  }
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`[OK] Successfully patched ${filePath}`);
}

// 1. js/combat-refinements.js
const combatOld = `function characterHeight(id){return SETS[id]?SETS[id].frames.idle.height/2*SETS[id].scale:258}
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
}`;

const combatNew = `const BASE_BODY_HEIGHT=218;
function characterHeight(id){return SETS[id]?SETS[id].frames.idle.height/2*SETS[id].scale:BASE_BODY_HEIGHT}
function fighterGeometry(id,q){
 const target=characterHeight(id);let s,im,h,anchor=.5;
 if(q.kent!==undefined){
  s=SETS[id].frames[q.kent];im=s.image;anchor=s.anchor;
  const pScale=(SETS[id].poseScale&&SETS[id].poseScale[q.kent])||1;
  h=s.height/2*SETS[id].scale*pScale;
  if(/^(intro[AB])$/.test(q.kent)&&!SETS[id]?.poseScale?.[q.kent]&&s.height<500)h=target;
 }
 else if(q.fsup!==undefined){s=fielSuper[q.fsup];im=s.image;h=s.height*target/fielSuper.backA.height;anchor=s.anchor}
 else if(q.lj!==undefined){s=ljFrames[q.lj];im=s.image;h=s.height*target/ljFrames.up.height;anchor=s.anchor}
 else if(q.lc!==undefined){s=lcFrames[q.lc];im=s.image;h=id===0?s.height*target/lcFrames.ready.height:s.height*target/430;anchor=s.anchor}
 else if(q.roll!==undefined){s=rollSprites[q.roll];im=s.image;h=s.height*target/350}
 else if(q.fiel!==undefined){s=fielRoll[q.fiel];im=s.image;h=s.height*target/fielRoll.at(-1).height}
 else if(q.show!==undefined){s=showSprites[id*4+q.show];im=s.image;h=q.show>=2?target:s.height*target/showSprites[id*4+2].height}
 else if(q.extra!==undefined||q.follow!==undefined){
  s=q.extra!==undefined?extraSprites[id*6+q.extra]:followSprites[id*4+q.follow];im=s.image;
  const ref=(id===0&&q.extra===3)?347:(id===0?395:405);
  h=s.height*target/ref;
  if(q.extra===1)anchor=.4;if([2,3,4].includes(q.extra))anchor=.37;
 }
 else{im=sprites[id*6+(q.base??0)];const ref=id===0?395:405;h=im.height*target/ref;anchor=q.base===2?.39:.5}
 return{im,h,w:im.width/im.height*h,anchor:anchor??.5};
}`;

patchFile('js/combat-refinements.js', combatOld, combatNew);

// 2. js/sprite-scaling.js
const spriteScalingOld = `fighterGeometry=function(id,q){
 const original=beforeVisibleGeometry(id,q);
 if(q.fiel10)return original; // Los PNG nuevos ya están recortados; no leer sus píxeles durante el ataque.
 if(q.lanchaShot)return geometryAtHeight(original,VISIBLE_FIGHTER_HEIGHT*LANCHA_SHOT_ASSETS[q.lanchaShot].height/LANCHA_SHOT_ASSETS.shot0.height);
 let g=trimGeometry(original);
 if(state==='intro')return geometryAtHeight(g,VISIBLE_FIGHTER_HEIGHT);
 const idle=SETS[id]?resolvePose(id,'idle'):null;
 if(q.base===0||q.base===1||q.base===2||q.base===4||q.kent===idle&&idle!==null)g=geometryAtHeight(g,VISIBLE_FIGHTER_HEIGHT);
 return g;
};`;

const spriteScalingNew = `fighterGeometry=function(id,q){
 const original=beforeVisibleGeometry(id,q);
 if(q.fiel10||q.grab11)return original; // Los PNG nuevos ya están recortados; no leer sus píxeles durante el ataque.
 if(q.lanchaShot)return geometryAtHeight(original,VISIBLE_FIGHTER_HEIGHT*LANCHA_SHOT_ASSETS[q.lanchaShot].height/LANCHA_SHOT_ASSETS.shot0.height);
 let g=trimGeometry(original);
 const idle=SETS[id]?resolvePose(id,'idle'):null;
 if(q.base===0||q.base===1||q.base===2||(q.kent===idle&&idle!==null))g=geometryAtHeight(g,VISIBLE_FIGHTER_HEIGHT);
 return g;
};`;

patchFile('js/sprite-scaling.js', spriteScalingOld, spriteScalingNew);

// 3. js/grab-updates.js
const grabOld = `fighterGeometry=function(id,q){if(q.grab11){const f=grabFrames[q.grab11],reference=GRAB_ASSETS[id+'-grab0'].height,h=218*f.height/reference;return{im:f.image,h,w:f.image.width/f.image.height*h,anchor:f.anchor};}return priorGrabGeometry(id,q);};`;
const grabNew = `fighterGeometry=function(id,q){if(q.grab11){const f=grabFrames[q.grab11];let reference=GRAB_ASSETS[id+'-grab0'].height;if(q.grab11==='0-landing')reference=235;else if(q.grab11==='0-recover')reference=218;const h=218*f.height/reference;return{im:f.image,h,w:f.image.width/f.image.height*h,anchor:f.anchor};}return priorGrabGeometry(id,q);};`;

patchFile('js/grab-updates.js', grabOld, grabNew);

// 4. js/battle-scenes.js
const battleOld = `"0-1":{"hero":"","rival":"Lancha, la fidelidad se demuestra peleando."}`;
const battleNew = `"0-1":{"hero":"A ver si esa lealtad aguanta mi barrigazo.","rival":"Lancha, la fidelidad se demuestra peleando."}`;

patchFile('js/battle-scenes.js', battleOld, battleNew);

// 5. docs/DIALOGOS-BATALLA.json
const dialogOld = `  "0-1": {
    "hero": "",
    "rival": "Lancha, la fidelidad se demuestra peleando."
  },`;
const dialogNew = `  "0-1": {
    "hero": "A ver si esa lealtad aguanta mi barrigazo.",
    "rival": "Lancha, la fidelidad se demuestra peleando."
  },`;

patchFile('docs/DIALOGOS-BATALLA.json', dialogOld, dialogNew);

// 6. js/presentation.js
const presOld1 = `frontText('SIETE ESCENARIOS · UN MISMO ORGULLO',480,394,14,'#ffd18b');`;
const presNew1 = `frontText('DIEZ ESCENARIOS · UN MISMO ORGULLO',480,394,14,'#ffd18b');`;
patchFile('js/presentation.js', presOld1, presNew1);

const presOld2 = `window.fisiDebug=()=>({...combatDebugV05(),version:'0.7'});
$('.brand small').textContent='TORNEO DEL CAMPUS · EDICIÓN ARCADE 0.7';`;
const presNew2 = `window.fisiDebug=()=>({...combatDebugV05(),version:'0.11'});
$('.brand small').textContent='TORNEO DEL CAMPUS · EDICIÓN ARCADE 0.11';`;
patchFile('js/presentation.js', presOld2, presNew2);

// 7. js/game-v4.js (SETS[7], SETS[8], fielRollK, fisiDebug)
const gameOld1 = `fielRoll=[...extractRow(flipPrep,1),...extractRow(flip,4)];fielRollK=258*.95/fielRoll[4].height;`;
const gameNew1 = `fielRoll=[...extractRow(flipPrep,1),...extractRow(flip,4)];fielRollK=218*.95/fielRoll[4].height;`;
patchFile('js/game-v4.js', gameOld1, gameNew1);

const gameOld2 = `window.fisiDebug=()=>({version:'0.5',pads:pads().map(g=>g.id)`;
const gameNew2 = `window.fisiDebug=()=>({version:'0.11',pads:pads().map(g=>g.id)`;
patchFile('js/game-v4.js', gameOld2, gameNew2);

const gameOldSets = `const SETS=[null,null,{frames:kentFrames,scale:.85,extra:{introA:1.15,introB:1.15},charge:['overheadPrep','overheadHit']},{frames:pingFrames,scale:1,extra:{introA:1.2,introB:1.2,win:1.2},charge:['introA','charge'],lowPunch:{frame:'lowPunch'},grab:['grabReach','grabHold','grabEnd'],airGrab:['airReach','airClutch','airLift','airLaunch','airEnd'],moonKick:['ml0','ml1','ml2','ml3','ml4','ml5'],moonKickFrame:'ml6'},{frames:ieFrames,scale:1,extra:{introA:1.15,introB:1.15},shot:{x:90,y:160},charge:['chargeA','chargeB'],lowPunch:{frame:'lowPunch'},midKick:['kickUp','kickHit','kickUp','kickEnd'],grab:['grabReach','grabHold','grabThrow','grabEnd']},{frames:kpFrames,scale:1,extra:{},tigerSeq:['kA','tiger','kB','idle'],grab:['gReach','gHold','gHold'],airGrab:['gReach','gHold','gThrow','gTiger','gYawn'],upThrow:true,midKick:['kickUp','kickHit','kickKnee','kickEnd'],charge:['chargeA','charge'],fallback:{airKick:'jumpDown',flipTuck:'jumpUp',flipSpin:'jumpUp',sweep:'low',win:'introB',mid:'punch'}},{frames:cdFrames,scale:1,extra:{},superSeq:['ulti0','ulti1','ulti2','ulti3','ulti4','ulti4'],rollSeq:['roll0','roll1','roll2','roll3'],rollT:[.15,.32,.82],rollSpin:'roll2',walkSeq:['walkA','walkB','walkC','walkD'],charge:['chargeA','charge'],lowPunch:{frame:'lowPunch'},fallback:{airKick:'jumpDown',flipTuck:'jumpUp',flipSpin:'jumpUp',landing:'crouch',mid:'punch'}},{frames:ppFrames,scale:1,extra:{},walkSeq:['walkA','walkB','walkC','walkB'],charge:['chargeA','charge'],lowPunch:{frame:'lowPunch'},midKick:['kickUp','kickHit','kickUp','kickEnd'],grab:['grabReach','grabHold','grabEnd'],superSeq:['moto','motoKick','motoKick','papers1','papers2','ultiEnd'],bikeFx:'motoFly',rollSeq:['crouch','moto','idle'],fallback:{flipTuck:'jumpUp',flipSpin:'jumpUp',landing:'crouch',superA:'papers1',superB:'motoKick'}},{frames:joFrames,scale:1,extra:{},walkSeq:['walk0','walk1','walk2','walk3','walk4','walk5','walk6','walk7','walk8'],walkRate:13,charge:['charge0','charge1','charge2'],lowPunch:{frame:'lowPunch'},midKick:['kickUp','kickHit','kickUp','idle'],superSeq:['ulti0','ulti1','ulti2','ulti3','ulti4','ulti5'],overheadEnd:'ulti4',rollSeq:['crouch','roll0','roll1','roll2','idle'],rollT:[.12,.4,.62,.85],grab:['grabReach','grabClench','grabLift'],airGrab:['grabReach','grabClench','grabLift','grabUp','grabUp'],winSeq:['winA','winB','winC','winB'],shot:{x:103,y:171,low:{x:66,y:91}},fallback:{walkA:'walk0',walkB:'walk4',walkC:'walk6',jumpUp:'kickUp',jumpDown:'kickUp',flipTuck:'kickUp',flipSpin:'kickUp',introA:'winC',introB:'winB',mid:'kickHit',superA:'ulti0',superB:'ulti2'}}];`;

const gameNewSets = `const SETS=[null,null,{frames:kentFrames,scale:.85,extra:{introA:1.15,introB:1.15},charge:['overheadPrep','overheadHit']},{frames:pingFrames,scale:1,extra:{introA:1.2,introB:1.2,win:1.2},charge:['introA','charge'],lowPunch:{frame:'lowPunch'},grab:['grabReach','grabHold','grabEnd'],airGrab:['airReach','airClutch','airLift','airLaunch','airEnd'],moonKick:['ml0','ml1','ml2','ml3','ml4','ml5'],moonKickFrame:'ml6'},{frames:ieFrames,scale:1,extra:{introA:1.15,introB:1.15},shot:{x:90,y:160},charge:['chargeA','chargeB'],lowPunch:{frame:'lowPunch'},midKick:['kickUp','kickHit','kickUp','kickEnd'],grab:['grabReach','grabHold','grabThrow','grabEnd']},{frames:kpFrames,scale:1,extra:{},tigerSeq:['kA','tiger','kB','idle'],grab:['gReach','gHold','gHold'],airGrab:['gReach','gHold','gThrow','gTiger','gYawn'],upThrow:true,midKick:['kickUp','kickHit','kickKnee','kickEnd'],charge:['chargeA','charge'],fallback:{airKick:'jumpDown',flipTuck:'jumpUp',flipSpin:'jumpUp',sweep:'low',win:'introB',mid:'punch'}},{frames:cdFrames,scale:1,extra:{},superSeq:['ulti0','ulti1','ulti2','ulti3','ulti4','ulti4'],rollSeq:['roll0','roll1','roll2','roll3'],rollT:[.15,.32,.82],rollSpin:'roll2',walkSeq:['walkA','walkB','walkC','walkD'],charge:['chargeA','charge'],lowPunch:{frame:'lowPunch'},fallback:{airKick:'jumpDown',flipTuck:'jumpUp',flipSpin:'jumpUp',landing:'crouch',mid:'punch'}},{frames:ppFrames,scale:1,extra:{},poseScale:{grabReach:444/401,grabHold:444/395,grabEnd:444/403},walkSeq:['walkA','walkB','walkC','walkB'],charge:['chargeA','charge'],lowPunch:{frame:'lowPunch'},midKick:['kickUp','kickHit','kickUp','kickEnd'],grab:['grabReach','grabHold','grabEnd'],superSeq:['moto','motoKick','motoKick','papers1','papers2','ultiEnd'],bikeFx:'motoFly',rollSeq:['crouch','moto','idle'],fallback:{flipTuck:'jumpUp',flipSpin:'jumpUp',landing:'crouch',superA:'papers1',superB:'motoKick'}},{frames:joFrames,scale:1,extra:{},poseScale:{hurt:435/496},walkSeq:['walk0','walk1','walk2','walk3','walk4','walk5','walk6','walk7','walk8'],walkRate:13,charge:['charge0','charge1','charge2'],lowPunch:{frame:'lowPunch'},midKick:['kickUp','kickHit','kickUp','idle'],superSeq:['ulti0','ulti1','ulti2','ulti3','ulti4','ulti5'],overheadEnd:'ulti4',rollSeq:['crouch','roll0','roll1','roll2','idle'],rollT:[.12,.4,.62,.85],grab:['grabReach','grabClench','grabLift'],airGrab:['grabReach','grabClench','grabLift','grabUp','grabUp'],winSeq:['winA','winB','winC','winB'],shot:{x:103,y:171,low:{x:66,y:91}},fallback:{walkA:'walk0',walkB:'walk4',walkC:'walk6',jumpUp:'kickUp',jumpDown:'kickUp',flipTuck:'kickUp',flipSpin:'kickUp',introA:'winC',introB:'winB',mid:'kickHit',superA:'ulti0',superB:'ulti2'}}];`;

patchFile('js/game-v4.js', gameOldSets, gameNewSets);

// 8. js/pingordy-animation.js (PINGORDY_FRAMES heights)
const pingCombat4Old = `{"name":"combat4","src":"assets/personajes/pingordy/unificado/combat4.png","height":393.49333333333334,"anchor":0.2867132867132867}`;
const pingCombat4New = `{"name":"combat4","src":"assets/personajes/pingordy/unificado/combat4.png","height":425,"anchor":0.2867132867132867}`;
patchFile('js/pingordy-animation.js', pingCombat4Old, pingCombat4New);

const pingCombat5Old = `{"name":"combat5","src":"assets/personajes/pingordy/unificado/combat5.png","height":396.38666666666666,"anchor":0.16607773851590105}`;
const pingCombat5New = `{"name":"combat5","src":"assets/personajes/pingordy/unificado/combat5.png","height":428,"anchor":0.16607773851590105}`;
patchFile('js/pingordy-animation.js', pingCombat5Old, pingCombat5New);

const pingFlourish0Old = `{"name":"flourish0","src":"assets/personajes/pingordy/unificado/flourish0.png","height":385.64,"anchor":0.6721311475409836}`;
const pingFlourish0New = `{"name":"flourish0","src":"assets/personajes/pingordy/unificado/flourish0.png","height":416,"anchor":0.6721311475409836}`;
patchFile('js/pingordy-animation.js', pingFlourish0Old, pingFlourish0New);

const pingFlourish1Old = `{"name":"flourish1","src":"assets/personajes/pingordy/unificado/flourish1.png","height":388.12,"anchor":0.48184818481848185}`;
const pingFlourish1New = `{"name":"flourish1","src":"assets/personajes/pingordy/unificado/flourish1.png","height":416,"anchor":0.48184818481848185}`;
patchFile('js/pingordy-animation.js', pingFlourish1Old, pingFlourish1New);

const pingFlourish2Old = `{"name":"flourish2","src":"assets/personajes/pingordy/unificado/flourish2.png","height":385.64,"anchor":0.4882154882154882}`;
const pingFlourish2New = `{"name":"flourish2","src":"assets/personajes/pingordy/unificado/flourish2.png","height":416,"anchor":0.4882154882154882}`;
patchFile('js/pingordy-animation.js', pingFlourish2Old, pingFlourish2New);

const pingFlourish3Old = `{"name":"flourish3","src":"assets/personajes/pingordy/unificado/flourish3.png","height":381.92,"anchor":0.4689655172413793}`;
const pingFlourish3New = `{"name":"flourish3","src":"assets/personajes/pingordy/unificado/flourish3.png","height":416,"anchor":0.4689655172413793}`;
patchFile('js/pingordy-animation.js', pingFlourish3Old, pingFlourish3New);

console.log('\\n>>> All scaling bug fixes applied successfully! <<<');

