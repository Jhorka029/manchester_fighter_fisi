'use strict';
front.randomPicks=[false,false];front.randomStage=false;front.battleStage='random';
function randomRoster(){return front.mode==='battle'?ROSTER_ORDER.filter(id=>STUDENT_IDS.includes(id)):ROSTER_ORDER;}
function randomItem(list){return list[Math.floor(Math.random()*list.length)];}
function chooseRandomFighter(){front.randomPicks[front.side]=true;frontUI();audioCue('menu-move');}
function resolveRandomPicks(){const list=randomRoster();for(let side=0;side<(front.mode==='battle'?1:2);side++)if(front.randomPicks[side])front.picks[side]=randomItem(list);selected=front.picks[0];}
function changeBattleStage(delta){const options=['random',...GAME_ASSETS.stages.map((_,i)=>i)],at=options.indexOf(front.battleStage);front.battleStage=options[(at+delta+options.length)%options.length];frontUI();audioCue('menu-move');}
const beforeRandomSelect=frontSelect,beforeRandomMove=frontMove,beforeRandomConfirm=frontConfirm,beforeRandomLaunch=frontLaunch,beforeRandomStart=startBattle,beforeRandomEncounter=launchBattleEncounter,beforeRandomLife=changeLife;
frontSelect=function(id){if(front.mode==='battle'&&!STUDENT_IDS.includes(id))return;front.randomPicks[front.side]=false;beforeRandomSelect(id);};
frontMove=function(dir){
 if(front.page==='characters'){const list=[...randomRoster(),-1],at=list.indexOf(front.randomPicks[front.side]?-1:front.picks[front.side]),id=list[(at+dir+list.length)%list.length];if(id===-1)chooseRandomFighter();else frontSelect(id);return;}
 if(front.page==='stage'){front.option=(front.option+dir+GAME_ASSETS.stages.length+1)%(GAME_ASSETS.stages.length+1);bg=stageImages[front.option]||stageImages[front.stage];frontUI();audioCue('menu-move');return;}
 beforeRandomMove(dir);
};
frontConfirm=function(){if(front.page==='stage'){frontUnlock();front.randomStage=front.option===GAME_ASSETS.stages.length;if(!front.randomStage)front.stage=front.option;bg=stageImages[front.stage];frontGo('characters');return;}beforeRandomConfirm();};
frontLaunch=function(){if(front.mode!=='battle'){resolveRandomPicks();if(front.randomStage)front.stage=randomItem(GAME_ASSETS.stages.map((_,i)=>i));}beforeRandomLaunch();};
startBattle=function(){resolveRandomPicks();battle.stageChoice=front.battleStage;beforeRandomStart();};
launchBattleEncounter=function(retry=false){if(Number.isInteger(battle.stageChoice)){front.stage=battle.stageChoice;battle.lastStage=front.stage;beforeRandomEncounter(true);return;}beforeRandomEncounter(retry);};
changeLife=function(side,delta){if(front.mode==='battle'&&front.page==='characters')changeBattleStage(delta);else beforeRandomLife(side,delta);};
const beforeRandomUI=frontUI;
frontUI=function(){
 const chosenOption=front.option,randomStagePage=front.page==='stage'&&chosenOption===GAME_ASSETS.stages.length;
 if(randomStagePage)front.option=front.stage;try{beforeRandomUI();}finally{front.option=chosenOption;}if(!ready)return;
 if(front.page==='stage'){
  const random=front.option===GAME_ASSETS.stages.length,s=GAME_ASSETS.stages[front.option];
  $('#front-ui').innerHTML='<div class="stage-select"><div class="front-kicker">ELIGE DÓNDE SE DECIDE TODO</div><h2>SELECCIONAR ESCENARIO</h2><div class="stage-current"><b>'+(random?'AL AZAR':s.name)+'</b><span>'+(random?'El escenario se sortea al comenzar el combate.':s.location)+'</span></div><div class="stage-options">'+GAME_ASSETS.stages.map((s,i)=>'<button data-front="stage" data-stage="'+i+'" class="stage-card '+(i===front.option?'focused':'')+'"><img src="'+s.image+'" alt="'+s.name+'"><b>'+s.name+'</b></button>').join('')+'<button data-front="random-stage" class="stage-card random-card '+(random?'focused':'')+'" aria-label="Elegir escenario al azar"><span class="random-stage-icon">?</span><b>AL AZAR</b></button></div><div class="front-actions">'+frontButton('← ATRÁS','back')+frontButton('ELEGIR ESCENARIO →','confirm','class="gold"')+'</div><small>← → elegir · Enter / A confirmar</small></div>';return;
 }
 if(front.page!=='characters')return;
 const campaign=front.mode==='battle',side=front.side;
 const empty=$('.fighter-grid .locked');if(empty){const tile=document.createElement('button');tile.className='fighter-slot card random-card '+(front.randomPicks[side]?'focused':'');tile.dataset.front='random-fighter';tile.setAttribute('aria-label','Elegir luchador al azar');tile.innerHTML='<span class="random-fighter-icon">?</span><b class="random-label">AL AZAR</b><span class="slot-tags">'+(front.randomPicks[0]?'<b class="tag-p1">P1</b>':'')+(!campaign&&front.randomPicks[1]?'<b class="tag-p2">'+(front.mode==='local'?'P2':'CPU')+'</b>':'')+'</span>';empty.replaceWith(tile);}
 if(front.randomPicks[side])document.querySelectorAll('.fighter-slot[data-id]').forEach(b=>b.classList.remove('focused'));
 for(let i=0;i<2;i++)if(front.randomPicks[i]){document.querySelectorAll('.fighter-slot[data-id] .tag-p'+(i+1)).forEach(e=>e.remove());const tab=$('[data-front="side"][data-side="'+i+'"]');if(tab)tab.textContent=(i?(front.mode==='local'?'P2':'CPU'):'P1')+' · AL AZAR';}
 if(campaign){const label=document.createElement('label');label.className='battle-stage-choice';label.innerHTML='<small>ESCENARIO · Q/E o X/Y</small><select data-battle-stage aria-label="Escenario de Batalla"><option value="random">AL AZAR POR COMBATE</option>'+GAME_ASSETS.stages.map((s,i)=>'<option value="'+i+'">'+s.name+'</option>').join('')+'</select>';$('.selection-bar').insertBefore(label,$('[data-front="fight"]'));label.querySelector('select').value=String(front.battleStage);$('.select-hint').textContent=campaignRoute(front.picks[0]).length+' rivales · un estudiante · '+(front.battleStage==='random'?'escenario al azar por combate':'escenario fijo elegido')+' · Q/E o X/Y cambia escenario';}
 else if(front.randomStage)document.querySelectorAll('.selection-bar>div').forEach(el=>{if(el.querySelector('small')?.textContent==='ESCENARIO')el.querySelector('b').textContent='AL AZAR';});
};
const beforeRandomBack=frontBack;
frontBack=function(){const wasCharacters=front.page==='characters';beforeRandomBack();if(wasCharacters&&front.page==='stage'){front.option=front.randomStage?GAME_ASSETS.stages.length:front.stage;frontUI();}};
$('#front-ui').addEventListener('click',e=>{const b=e.target.closest('[data-front]');if(!b)return;if(b.dataset.front==='random-fighter'){e.preventDefault();e.stopImmediatePropagation();frontUnlock();chooseRandomFighter();}else if(b.dataset.front==='random-stage'){e.preventDefault();e.stopImmediatePropagation();frontUnlock();front.option=GAME_ASSETS.stages.length;frontUI();audioCue('menu-move');}},{capture:true});
$('#front-ui').addEventListener('change',e=>{if(!e.target.matches('[data-battle-stage]'))return;front.battleStage=e.target.value==='random'?'random':+e.target.value;frontUI();audioCue('menu-move');canvas.focus();});
const beforeRandomText=frontText,beforeRandomHero=frontHero;
frontText=function(s,x,y,...args){if(front.active&&state==='menu'&&front.page==='characters'&&(x===98||x===864)&&y===475){const side=x===98?0:1;if(front.randomPicks[side]&&(front.mode!=='battle'||side===0))s='AL AZAR';}return beforeRandomText(s,x,y,...args);};
frontHero=function(id,x,y,h=320,flip=false,...args){const side=flip?1:0,random=front.active&&state==='menu'&&front.page==='characters'&&front.randomPicks[side]&&(front.mode!=='battle'||side===0);fc.save();if(random)fc.globalAlpha=.3;beforeRandomHero(id,x,y,h,flip,...args);fc.restore();if(random)frontText('?',x,y-h*.45,72,'#ffdc8e');};
