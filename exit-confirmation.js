'use strict';
const exitPrompt={active:false,choice:0,wasPaused:false,focus:null,pad:{},release:false};
const exitDialog=document.createElement('div');
exitDialog.id='exit-confirmation';exitDialog.hidden=true;
exitDialog.innerHTML='<section role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description"><small>COMBATE EN CURSO</small><h2 id="exit-title">¿SALIR DEL COMBATE?</h2><p id="exit-description"></p><div><button data-exit="stay">SEGUIR JUGANDO</button><button data-exit="leave">SÍ, SALIR</button></div><small>← → elegir · Enter / A confirmar · ESC / B cancelar</small></section>';
$('.screen').append(exitDialog);
function exitPadState(){const list=pads(),b=n=>list.some(p=>p.buttons[n]?.pressed),axis=list.some(p=>Math.abs(p.axes[0]||0)>.5);return{ok:b(0)||b(9),back:b(1)||b(8),left:b(14)||list.some(p=>(p.axes[0]||0)<-.5),right:b(15)||list.some(p=>(p.axes[0]||0)>.5),axis};}
function paintExitChoice(){exitDialog.querySelectorAll('[data-exit]').forEach((b,i)=>b.classList.toggle('chosen',i===exitPrompt.choice));exitDialog.querySelectorAll('[data-exit]')[exitPrompt.choice].focus({preventScroll:true});}
function requestExit(){
 if(exitPrompt.active||state==='menu')return;
 Object.assign(exitPrompt,{active:true,choice:0,wasPaused:paused,focus:document.activeElement,pad:exitPadState()});paused=true;clearInput();
 $('#exit-description').textContent=battle.active?'Volverás al menú principal y perderás el progreso de esta partida de Batalla.':'Volverás a la selección de luchadores y terminará este enfrentamiento.';
 exitDialog.hidden=false;paintExitChoice();audioDirector.sync();
}
function closeExit(leave=false){
 if(!exitPrompt.active)return;const wasPaused=exitPrompt.wasPaused;exitPrompt.active=false;exitPrompt.release=true;exitDialog.hidden=true;clearInput();
 if(leave){paused=false;menu();}else{paused=wasPaused;(exitPrompt.focus?.isConnected?exitPrompt.focus:canvas).focus({preventScroll:true});}
 audioDirector.sync();
}
exitDialog.addEventListener('click',e=>{const action=e.target.closest('[data-exit]')?.dataset.exit;if(action)closeExit(action==='leave');});
addEventListener('keydown',e=>{if(!exitPrompt.active)return;e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;
 if(['Escape','Backspace','KeyR'].includes(e.code))closeExit(false);
 else if(['ArrowLeft','ArrowRight','KeyA','KeyD','Tab'].includes(e.code)){exitPrompt.choice=1-exitPrompt.choice;paintExitChoice();}
 else if(['Enter','Space'].includes(e.code))closeExit(exitPrompt.choice===1);
},{capture:true});
const beforeExitPad=padMenu;
padMenu=function(){
 const now=exitPadState();if(exitPrompt.active){const hit=k=>now[k]&&!exitPrompt.pad[k];if(hit('back'))closeExit(false);else if(hit('left')||hit('right')){exitPrompt.choice=1-exitPrompt.choice;paintExitChoice();}else if(hit('ok'))closeExit(exitPrompt.choice===1);exitPrompt.pad=now;return;}
 if(exitPrompt.release){if(Object.values(now).some(Boolean))return;exitPrompt.release=false;Object.assign(sys,{ok:false,start:false,back:false});lastPad[0]={};lastPad[1]={};}
 beforeExitPad();
};
const beforeExitPause=togglePause;togglePause=function(){if(!exitPrompt.active)beforeExitPause();};
