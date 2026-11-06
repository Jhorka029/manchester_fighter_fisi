'use strict';
const battle={active:false,hero:0,route:[],index:0,phase:'combat',age:0,continues:0,lastStage:-1,needDialogue:true,preparing:false,choice:0,pad:{},lastBeat:-1};
const CAMPAIGN_BARS=[1,1,2,2,3,3,4,4,4,5,5,5];
FRONT_PAGES.mode=['VS','BATALLA'];
function battleLevel(){return{enemy:battle.route[battle.index],bars:CAMPAIGN_BARS[battle.index],reaction:1.28-battle.index*.105,difficulty:battle.index<2?'easy':battle.index<5?'normal':'hard'};}
function campaignRoute(hero){return ROSTER_ORDER.filter(id=>id!==hero&&id!==7).concat(7);}
function isBattleScene(){return battle.active&&battle.phase!=='combat';}
function gameMusicTrack(){if(battle.active)return'combat';return['fight','round','match','intro','vs'].includes(state)?'combat':state==='menu'&&front.page==='characters'?'characters':'menu';}
function campaignUI(){
 const el=$('#campaign-ui');if(!el)return;el.hidden=!isBattleScene();let html='';
 if(battle.phase==='continue')html='<div class="campaign-actions"><button data-campaign="confirm">ESPACIO / A · CONTINUAR</button><button data-campaign="menu">MENÚ PRINCIPAL</button><span id="continue-seconds" role="timer" aria-live="polite">9</span></div>';
 if(battle.phase==='ending'&&battle.age<7)html='<div class="campaign-actions"><button data-campaign="confirm">ESPACIO / A · VER RESULTADO</button></div>';
 else if(battle.phase==='ending'||battle.phase==='gameover')html='<div class="campaign-actions"><button class="'+(battle.choice===0?'chosen':'')+'" data-campaign="replay">VOLVER A JUGAR</button><button class="'+(battle.choice===1?'chosen':'')+'" data-campaign="menu">MENÚ PRINCIPAL</button></div>';
 if(['transition','dialogue'].includes(battle.phase))html='<div class="campaign-actions"><button data-campaign="confirm">ESPACIO / A · CONTINUAR</button></div>';
 el.innerHTML=html;
}
function setBattlePhase(phase){battle.phase=phase;battle.age=0;battle.lastBeat=-1;battle.choice=0;battle.endingReady=false;state='battle-'+phase;paused=false;clearInput();battle.pad=campaignPadState();campaignUI();if(typeof stopBattleVoice==='function')stopBattleVoice();
 if(typeof stopBattleEffects==='function')stopBattleEffects();
 if(phase==='transition'){battleSound('transition');playBattleVoice('siguiente');}
 if(phase==='dialogue')playBattleVoice('duelo-'+battle.hero+'-'+battleLevel().enemy);
 if(phase==='continue'){battleSound('defeat');playBattleVoice('continuar');}
 if(phase==='revive'){battleSound('revive');playBattleVoice('regreso');}
 if(phase==='gameover'){battleSound('defeat');playBattleVoice('derrota');}
 if(phase==='ending'){battleSound('fanfare');battleSound('applause');playBattleVoice('campeon');}
 audioDirector.sync();
}
function launchBattleEncounter(retry=false){
 stopBattleEffects();
 const level=battleLevel();front.picks=[battle.hero,level.enemy];selected=battle.hero;front.side=0;
 if(!retry){const options=stageImages.map((_,i)=>i).filter(i=>i!==battle.lastStage);front.stage=options[Math.floor(Math.random()*options.length)];battle.lastStage=front.stage;}
 front.active=false;$('#menu').classList.add('hidden');$('.screen').classList.remove('menu-open','presentation-cinematic');$('#campaign-ui').hidden=true;
 mode='cpu';difficulty=level.difficulty;$('#mode').value='cpu';$('#difficulty').value=difficulty;bg=stageImages[front.stage];players=[fighter(battle.hero,420),fighter(level.enemy,860)];setLifeBars(players[0],1);setLifeBars(players[1],level.bars);applyMatchAppearance();
 round=1;clock=75+10*battle.index;paused=false;state='vs';phaseTime=2.6;vsSlam=false;flash=0;shake=0;matchTime=0;superFX=null;powerClash=null;clashResult=null;projectiles=[];ghosts=[];lastRoundWinner=-1;battle.phase='combat';battle.age=0;Object.assign(camera,{x:WORLD/2,y:304,zoom:1.04});clearInput();canvas.focus();audioDirector.sync();
}
function startBattle(){if(!STUDENT_IDS.includes(front.picks[0]))return;battle.active=true;battle.hero=front.picks[0];battle.route=campaignRoute(battle.hero);battle.index=0;battle.continues=0;battle.lastStage=-1;battle.needDialogue=true;front.mode='battle';front.active=false;$('#menu').classList.add('hidden');$('.screen').classList.remove('menu-open','presentation-cinematic');setBattlePhase('transition');}
function nextBattleResult(){
 if(lastRoundWinner===0){if(battle.index===battle.route.length-1){setBattlePhase('ending');return}battle.index++;battle.needDialogue=true;setBattlePhase('transition');}
 else if(lastRoundWinner===1)setBattlePhase('continue');else{battle.needDialogue=false;setBattlePhase('transition');}
}
function exitBattle(){stopBattleVoice();stopBattleEffects();battle.active=false;battle.phase='combat';$('#campaign-ui').hidden=true;state='menu';paused=false;front.active=true;front.mode='cpu';front.side=0;frontGo('mode');setMenu(true);clearInput();audioDirector.sync();}
function campaignConfirm(){
 if(battle.phase==='continue'){audioCue('button');battle.continues++;battle.needDialogue=false;setBattlePhase('revive');}
 else if(battle.phase==='transition'&&battle.age>.35)launchBattleEncounter(false);
 else if(battle.phase==='dialogue'&&battle.age>.25)finishBattleDialogue();
 else if(battle.phase==='ending'){if(battle.age<7){battle.age=7;stopBattleVoice();campaignUI();return}if(battle.choice===0)startBattle();else exitBattle();}
 else if(battle.phase==='gameover'){if(battle.choice===0)startBattle();else exitBattle();}
}
function finishBattleDialogue(){stopBattleVoice();battle.phase='combat';state='intro';phaseTime=INTRO_DURATION;introElapsed=0;battle.needDialogue=false;$('#campaign-ui').hidden=true;clearInput();audioCue('round1');}
const priorBattleRound=beginRound;
beginRound=function(){battle.preparing=battle.active&&battle.needDialogue;try{priorBattleRound();}finally{battle.preparing=false;}if(battle.active){clock=75+10*battle.index;if(battle.needDialogue)setBattlePhase('dialogue');}};
const priorBattleCue=audioCue;
audioCue=function(name,...args){if(battle.preparing&&['round1','round2','finalround'].includes(name))return;return priorBattleCue(name,...args);};
const priorBattleAI=aiInput;
aiInput=function(p,o,dt){const deciding=p.ai<=dt,result=priorBattleAI(p,o,dt);if(!battle.active)return result;const level=battleLevel();if(deciding){p.ai*=level.reaction;if(o.action==='attack'&&Math.abs(p.x-o.x)<190&&Math.random()<.2+battle.index*.065){result.left=result.right=false;result.block=true;result.crouch=o.move?.level==='low';for(const k of ['punch','kick','overhead','special'])result[k+'Press']=false;}if(p.energy>=100&&Math.abs(p.x-o.x)<420&&Math.random()<.09+battle.index*.025)result.superPress=true;}return result;};
const priorBattleStep=step;
step=function(dt){
 if(battle.active&&isBattleScene()){
  if(paused||document.hidden)return;battle.age+=dt;fxClock+=dt;tick+=dt;
  if(battle.phase==='transition'){const beat=Math.floor(battle.age/.42);if(beat!==battle.lastBeat){battle.lastBeat=beat;battleSound('step');}if(battle.age>=3.3)launchBattleEncounter(false);}
  else if(battle.phase==='dialogue'){const key='duelo-'+battle.hero+'-'+battleLevel().enemy,duration=Math.max(4.2,(audioDirector.samples['battle-'+key]?.duration||5.8)+.35);if(battle.age>=duration)finishBattleDialogue();}
  else if(battle.phase==='continue'){const n=Math.max(0,9-Math.floor(battle.age));if(n!==battle.lastBeat){battle.lastBeat=n;const el=$('#continue-seconds');if(el)el.textContent=n;battleSound('count');}if(battle.age>=10)setBattlePhase('gameover');}
  else if(battle.phase==='revive'&&battle.age>=1.15)launchBattleEncounter(true);
  else if(battle.phase==='ending'&&battle.age>=7&&!battle.endingReady){battle.endingReady=true;campaignUI();}
  return;
 }
 if(battle.active&&state==='round'&&phaseTime<=dt&&!paused){nextBattleResult();return;}priorBattleStep(dt);
};
const priorBattleMenu=menu;menu=function(){if(battle.active){exitBattle();return}priorBattleMenu();};
const priorBattleUI=frontUI;
frontUI=function(){if(front.mode==='battle')front.side=0;priorBattleUI();if(!ready)return;if(front.page==='mode'){
 $('#front-ui').innerHTML='<div class="menu-step"><div class="front-kicker">ELIGE TU DESAFÍO</div><h2>SELECCIONAR MODO</h2><div class="mode-options">'+['VS','BATALLA'].map((v,i)=>'<button class="mode-card '+(front.option===i?'focused':'')+'" data-front="option" data-option="'+i+'"><b>'+v+'</b><small>'+(i?'Un estudiante contra todo el campus.':'CPU, dos jugadores o entrenamiento.')+'</small></button>').join('')+'</div><div class="front-actions">'+frontButton('← ATRÁS','back')+frontButton('CONTINUAR →','confirm','class="gold"')+'</div><small>← → elegir · Enter / A confirmar</small></div>';}
 if(front.page!=='characters')return;const campaign=front.mode==='battle',name=front.mode==='local'?'P2':'CPU';
 const bars=side=>'<label class="life-choice">VIDA '+(side?'P2 / CPU':'P1')+' <select data-life="'+side+'" aria-label="Barras de vida '+(side?'rival':'jugador 1')+'">'+LIFE_NAMES.map((s,i)=>'<option value="'+(i+1)+'" '+(front.lifeBars[side]===i+1?'selected':'')+'>'+(i+1)+' · '+s+'</option>').join('')+'</select></label>';
 $('#front-ui').innerHTML='<div class="character-select battle-picker"><h2>'+(campaign?'BATALLA · ELIGE ESTUDIANTE':'SELECCIONAR LUCHADORES')+'</h2><div class="picker-tabs">'+frontButton('P1 · '+NAMES[front.picks[0]],'side','data-side="0" class="'+(front.side===0?'active-p1':'')+'"')+(campaign?'':frontButton(name+' · '+NAMES[front.picks[1]],'side','data-side="1" class="'+(front.side===1?'active-p2':'')+'"'))+'</div><div class="fighter-grid">'+ROSTER_ORDER.concat(Array(7).fill(null)).map(id=>id===null?'<div class="fighter-slot locked"><i class="silhouette"></i></div>':'<button '+(campaign&&!STUDENT_IDS.includes(id)?'disabled':'')+' class="fighter-slot card '+(campaign&&!STUDENT_IDS.includes(id)?'teacher-locked ':'')+(front.picks[front.side]===id?'focused':'')+'" data-front="fighter" data-id="'+id+'" aria-label="'+(campaign&&!STUDENT_IDS.includes(id)?'Docente bloqueado: ':'Elegir ')+NAMES[id]+'"><img src="'+FRONT_FACES[id]+'" alt="'+NAMES[id]+'">'+(campaign&&!STUDENT_IDS.includes(id)?'<span class="locked-label">DOCENTE 🔒</span>':'<span class="slot-tags">'+(front.picks[0]===id?'<b class="tag-p1">P1</b>':'')+(!campaign&&front.picks[1]===id?'<b class="tag-p2">'+name+'</b>':'')+'</span>')+'</button>').join('')+'</div>'+
 '<p class="select-hint">'+(campaign?'Rivales progresivos · una ronda por nivel · jefe final desconocido':'Elige a cada luchador. Tab / LB cambia de jugador; Q/E o X/Y ajusta su vida.')+'</p>'+
 (!campaign&&front.mode!=='training'?'<div class="life-settings">'+bars(0)+bars(1)+'</div>':'')+
 '<div class="selection-bar"><div><small>MODO</small><b>'+(campaign?'BATALLA':{cpu:'VS CPU',local:'2 JUGADORES',training:'ENTRENAMIENTO'}[front.mode])+'</b></div>'+(front.mode==='cpu'?'<div><small>DIFICULTAD</small><b>'+({easy:'FÁCIL',normal:'NORMAL',hard:'DIFÍCIL'}[front.difficulty])+'</b></div>':'')+'<div><small>'+(campaign?'VIDA DEL ESTUDIANTE':'ESCENARIO')+'</small><b>'+(campaign?'1 BARRA · ROJA':GAME_ASSETS.stages[front.stage].name)+'</b></div>'+frontButton(campaign?'¡COMENZAR!':'« ¡A PELEAR! »','fight','class="gold"')+'</div><div class="select-footer">'+frontButton('← '+(campaign?'MODOS':'ESCENARIO'),'back')+'<small>← → elegir · Enter / A comenzar</small></div></div>';
};
const priorBattleSelect=frontSelect;frontSelect=function(id){if(front.mode==='battle'&&!STUDENT_IDS.includes(id))return;priorBattleSelect(id);};
const priorBattleMove=frontMove;frontMove=function(dir){if(front.page==='characters'){const list=front.mode==='battle'?ROSTER_ORDER.filter(id=>STUDENT_IDS.includes(id)):ROSTER_ORDER,at=list.indexOf(front.picks[front.side]);frontSelect(list[(at+dir+list.length)%list.length]);return}priorBattleMove(dir);};
const priorBattleBack=frontBack;frontBack=function(){if(front.mode==='battle'&&front.page==='characters'){front.mode='cpu';frontGo('mode',1);audioCue('menu-back');return}priorBattleBack();};
const priorBattleConfirm=frontConfirm;frontConfirm=function(){if(front.page==='mode'&&front.option===1){front.mode='battle';front.side=0;if(!STUDENT_IDS.includes(front.picks[0]))front.picks[0]=0;frontGo('characters');return}if(front.page==='mode')front.mode='cpu';priorBattleConfirm();};
const priorBattleLaunch=frontLaunch;frontLaunch=function(){if(!ready)return;if(front.mode==='battle'){frontUnlock();if(!audioDirector.uiDepth)audioCue('button');startBattle();return}battle.active=false;priorBattleLaunch();players.forEach((p,i)=>setLifeBars(p,front.mode==='training'?1:front.lifeBars[i]));applyMatchAppearance();};
function changeLife(side,delta){if(front.mode==='battle'||front.mode==='training')return;front.lifeBars[side]=(front.lifeBars[side]-1+delta+5)%5+1;audioCue('menu-move');frontUI();}
$('#front-ui').addEventListener('change',e=>{if(e.target.matches('[data-life]')){front.lifeBars[+e.target.dataset.life]=Math.max(1,Math.min(5,+e.target.value));audioCue('menu-move');canvas.focus();}});
addEventListener('keydown',e=>{if(window.fisiControlsOpen)return;if(typeof exitPrompt!=='undefined'&&exitPrompt.active||e.repeat)return;if(isBattleScene()){if(['Space','Enter','Escape','Backspace','ArrowLeft','ArrowRight','KeyR'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();frontUnlock();if(['Escape','Backspace','KeyR'].includes(e.code))requestExit();else if(e.code.startsWith('Arrow')){battle.choice=1-battle.choice;campaignUI();audioCue('menu-move');}else campaignConfirm();}return}if(front.active&&front.page==='characters'&&state==='menu'&&['KeyQ','KeyE'].includes(e.code)){e.preventDefault();changeLife(front.side,e.code==='KeyQ'?-1:1);}},{capture:true});
function campaignPadState(){const p=pads()[0],b=n=>!!p?.buttons[n]?.pressed;return{ok:b(0)||b(9),back:b(1)||b(8),left:b(14)||(p?.axes[0]||0)<-.5,right:b(15)||(p?.axes[0]||0)>.5};}
const priorBattlePad=padMenu;let lifePad={};padMenu=function(){if(isBattleScene()){const now=campaignPadState(),hit=k=>now[k]&&!battle.pad[k];if(hit('back'))requestExit();else if(hit('ok')){frontUnlock();campaignConfirm();}else if(hit('left')||hit('right')){battle.choice=1-battle.choice;campaignUI();audioCue('menu-move');}battle.pad=now;return;}priorBattlePad();const p=pads()[0],now={less:!!p?.buttons[2]?.pressed,more:!!p?.buttons[3]?.pressed};if(front.active&&state==='menu'&&front.page==='characters'){if(now.less&&!lifePad.less)changeLife(front.side,-1);if(now.more&&!lifePad.more)changeLife(front.side,1);}lifePad=now;};
const campaignPanel=document.createElement('div');campaignPanel.id='campaign-ui';campaignPanel.hidden=true;$('.screen').append(campaignPanel);campaignPanel.addEventListener('click',e=>{const action=e.target.closest('[data-campaign]')?.dataset.campaign;if(!action)return;frontUnlock();if(action==='menu')exitBattle();else if(action==='replay'){audioCue('menu-move');startBattle();}else campaignConfirm();});
window.fisiBattleDebug=()=>({active:battle.active,phase:battle.phase,age:battle.age,hero:battle.hero,index:battle.index,route:[...battle.route],level:battle.active?battleLevel():null,continues:battle.continues,lifeBars:[...front.lifeBars],players:players.map(p=>({id:p.id,hp:p.hp,maxHp:p.maxHp,bars:p.lifeBars,alternate:p.alternate}))});
