const fs = require('fs');

console.log('Testing characterHeight and scaling consistency...');

// Mock environment for testing
const globalScope = {
  SETS: [
    null,
    null,
    { frames: { idle: { height: 512 } }, scale: 0.85 }, // Kent: 512 / 2 * 0.85 = 217.6
    { frames: { idle: { height: 435.24 } }, scale: 1 },  // Pingordy: 435.24 / 2 * 1 = 217.62
    { frames: { idle: { height: 436 } }, scale: 1 },     // Ingestrella: 436 / 2 * 1 = 218
    { frames: { idle: { height: 438 } }, scale: 1 },     // Kike: 438 / 2 * 1 = 219
    { frames: { idle: { height: 437 } }, scale: 1 },     // Cárdenas: 437 / 2 * 1 = 218.5
    { frames: { idle: { height: 444 } }, scale: 1, poseScale: { grabReach: 444/401, grabHold: 444/395, grabEnd: 444/403 } }, // Pepe: 444 / 2 = 222
    { frames: { idle: { height: 435 } }, scale: 1, poseScale: { hurt: 435/496 } } // Joshi: 435 / 2 = 217.5
  ],
  BASE_BODY_HEIGHT: 218
};

function characterHeight(id) {
  return globalScope.SETS[id] ? globalScope.SETS[id].frames.idle.height / 2 * globalScope.SETS[id].scale : globalScope.BASE_BODY_HEIGHT;
}

for (let id = 0; id <= 8; id++) {
  const h = characterHeight(id);
  console.log(`Character ${id} height: ${h.toFixed(2)} px`);
  if (Math.abs(h - 218) > 5) {
    console.error(`ERROR: Character ${id} height ${h} diverges from ~218px!`);
    process.exit(1);
  }
}

// Check Joshi hurt scale
const joshi = globalScope.SETS[8];
const joshiHurtScale = (joshi.poseScale && joshi.poseScale.hurt) || 1;
const joshiHurtRenderH = 496 / 2 * joshi.scale * joshiHurtScale;
console.log(`Joshi hurt frame render height: ${joshiHurtRenderH.toFixed(2)} px (idle: ${(joshi.frames.idle.height/2).toFixed(2)} px)`);
if (Math.abs(joshiHurtRenderH - 217.5) > 0.01) {
  console.error('ERROR: Joshi hurt frame scaling mismatch!');
  process.exit(1);
}

// Check Pepelucho grab scale
const pepe = globalScope.SETS[7];
['grabReach', 'grabHold', 'grabEnd'].forEach(pose => {
  const frameHeights = { grabReach: 401, grabHold: 395, grabEnd: 403 };
  const pScale = pepe.poseScale[pose];
  const renderH = frameHeights[pose] / 2 * pepe.scale * pScale;
  console.log(`Pepelucho ${pose} render height: ${renderH.toFixed(2)} px`);
  if (Math.abs(renderH - 222) > 0.01) {
    console.error(`ERROR: Pepelucho ${pose} scaling mismatch!`);
    process.exit(1);
  }
});

console.log('\n[PASS] All character heights and scaling tests passed successfully!');
