'use strict';
const STORY_CHAPTERS=[
 {name:'El primer algoritmo',course:'Álgebra y Algoritmos',boss:4,quote:'Antes de compilar tu futuro, demuestra que entiendes el problema.'},
 {name:'La fuerza del código',course:'Física General y Programación I',boss:6,quote:'No basta con memorizar: encuentra el equilibrio y resuelve.'},
 {name:'Fuera del bucle',course:'Estructuras y Matemática Discreta',boss:5,quote:'Ordena tus ideas. Este ciclo se aprueba con estrategia.'},
 {name:'Corazón de silicio',course:'Programación II y Arquitectura',boss:4,quote:'Tu sistema ya funciona. Ahora demuestra que también resiste.'},
 {name:'La consulta perdida',course:'Base de Datos y Requisitos',boss:6,quote:'Cada decisión tiene consecuencias. Cuida la integridad de tu solución.'},
 {name:'Paquetes en fuga',course:'Redes y Sistemas Operativos',boss:5,quote:'Conecta tus conocimientos y no pierdas ningún paquete.'},
 {name:'Acceso autorizado',course:'Ingeniería de Software y Seguridad',boss:4,quote:'La última barrera no se rompe con fuerza, sino con buen diseño.'},
 {name:'Aprender a aprender',course:'Inteligencia Artificial y Proyectos TI',boss:6,quote:'Una buena predicción empieza por aprender de tus errores.'},
 {name:'Cuenta regresiva',course:'Arquitectura de Software y Analítica',boss:5,quote:'El plazo termina pronto. Convierte tu plan en resultados.'},
 {name:'La última sustentación',course:'Tesis y Gestión de TI',boss:7,quote:'Diez ciclos te trajeron hasta aquí. Ahora defiende tu futuro.'}
];
function makeStoryLevel(cycle){
 const chapter=STORY_CHAPTERS[cycle-1],theme=cycle<=3?0:cycle<=7?1:2,cols=94+cycle*2,grid=Array.from({length:20},()=>Array(cols).fill('.')),items=[],enemies=[],equations=[],checkpoints=[36*32,68*32];
 for(let r=17;r<20;r++)grid[r].fill('#');
 const put=(r,c,text)=>{for(let i=0;i<text.length&&c+i<cols;i++)grid[r][c+i]=text[i];};
 // Las rutas obligatorias siempre se pueden cruzar con el salto normal o doble.
 for(const c of[28,59])for(let r=17;r<20;r++)for(let x=c;x<c+3;x++)grid[r][x]='.';
 put(14,9,'-----');put(12,16,'----');put(14,23,'----');put(14,32,theme===1?'====':'----');put(12,39,'-----');put(14,48,'----');put(14,63,theme===1?'=====':'-----');put(12,73,'------');put(14,83,'-----');
 // Torres laterales: una ruta superior opcional para practicar el wall jump.
 for(let r=12;r<17;r++)grid[r][21]='#';
 if(theme===0){put(17,12,'~~~~');for(const c of[43,70])equations.push({x:c*32,y:180});put(16,52,'^^');}
 if(theme===1){for(const c of[44,79]){grid[16][c]='!';grid[15][c]='!';}put(16,53,'^^');}
 if(theme===2){for(const c of[43,80])for(let r=13;r<17;r++)grid[r][c]='!';put(14,63,'=====');}
 // Variaciones por ciclo: atajos, torres, trampas y puentes adicionales.
 if(cycle%2===0){put(11,55,'----');put(13,84,theme===1?'====':'----');}
 if(cycle%3===0){for(let r=14;r<17;r++)grid[r][50]='#';put(12,51,'---');}
 if(cycle===2)equations.push({x:82*32,y:150});
 if(cycle===3)put(17,47,'~~~');
 if(cycle>=7){for(let r=17;r<20;r++)for(let c=88;c<90;c++)grid[r][c]='.';put(14,90,'====');}
 for(const c of[18,46,76])items.push({kind:'credit',x:c*32+16,y:17*32-28});
 for(let c=6;c<cols-7;c+=3)if(![28,29,30,59,60,61].includes(c))items.push({kind:'bit',x:c*32+16,y:17*32-30});
 for(const [kind,c,r]of[['hp',15,13],['energy',34,13],['shield',41,11],['multiplier',74,11],['hp',67,16],['energy',86,13]])items.push({kind,x:c*32+16,y:r*32-16});
 for(let i=0;i<8+Math.floor(cycle/2);i++){let c=11+i*7;if(c>=cols-8)break;if(c===28||c===59)c+=4;const kind=i%4===2?'fly':i%4===3?'tank':'bug';enemies.push({kind,x:c*32,y:kind==='fly'?300+(i%2)*35:17*32-(kind==='tank'?53:25)});}
 // Marcadores de la matriz, útiles también al editar mapas a mano.
 const rows=grid.map(row=>row.join(''));return{cycle,...chapter,theme,rows,items,enemies,equations,checkpoints,gate:{x:(cols-5)*32,y:17*32-96},deadline:theme===2?[54*32,72*32]:null};
}
