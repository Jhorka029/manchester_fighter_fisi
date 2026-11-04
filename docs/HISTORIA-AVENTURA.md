# Historia (En desarrollo)

Prototipo jugable local de scroll lateral con cinco estudiantes, diez ciclos y un examen docente de pelea 1v1 al final de cada recorrido. Se elige en **Seleccionar modo → Historia (En desarrollo)**. Todos los ciclos tienen acceso libre para probar el prototipo; los aprobados quedan marcados en el navegador.

La referencia de aventuras de GBA se traduce en exploración, saltos, enemigos menores, mejoras, puntos de control y encuentros finales. Se reutilizan los personajes del juego y se dibujan escenarios, enemigos y efectos propios con Canvas. Los cursos y docentes son una propuesta narrativa a partir de los ejemplos del encargo, no una transcripción de una malla curricular oficial; el archivo `image_5f5ee5.jpg` mencionado dentro del texto no estaba adjunto.

## Código entregado

| Archivo | Responsabilidad |
|---|---|
| [adventure-core.js](../adventure-core.js) | Clases `FISIAdventure.Player`, `Enemy`, `World`, `TileMap`, `ObjectPool`; AABB, resolución física y coleccionables. |
| [adventure-levels.js](../adventure-levels.js) | Diez capítulos, docentes, diálogos, matrices, plataformas, trampas, spawns y recompensas. |
| [adventure-renderer.js](../adventure-renderer.js) | Parallax de tres mundos, sprites existentes, mobs pixelados, HUD, efectos y escenas. |
| [adventure-mode.js](../adventure-mode.js) | Entrada desde el menú, teclado, mandos, controles táctiles, pausa, guardado y enlace con el combate actual. |
| [adventure.css](../adventure.css) | Selector de estudiante/ciclo y paneles adaptados a escritorio y móvil. |

Son scripts clásicos, sin dependencias externas nuevas. El generador `build.cjs` los integra en la entrega autónoma existente de `outputs`.

## Player: físicas y estados

Coordenadas en píxeles lógicos: X crece hacia la derecha, Y hacia abajo. El motor existente proporciona el paso fijo de simulación; el movimiento usa integración semiimplícita:

```js
vy = Math.min(850, vy + 1650 * dt);
x += vx * dt;
y += vy * dt;
```

`1650 px/s²` es la gravedad. El primer impulso vale `-600 px/s` y el segundo `-550 px/s`. La altura aproximada del primer salto es `v² / (2g) ≈ 109 px`; el segundo permite alcanzar rutas superiores. Soltar el botón cuando aún se asciende multiplica `vy` por `0.53`, permitiendo saltos cortos.

- Estados: `IDLE`, `RUNNING`, `JUMPING`, `FALLING`, `ATTACKING`, `HURT`, más `DASHING`.
- Velocidad de carrera: 235 px/s. La velocidad horizontal se aproxima al objetivo con aceleración de 1500 px/s² y frenado de 2000 px/s².
- Coyote time: 0.10 s; buffer de salto: 0.12 s.
- En pared: impulso horizontal de 350 px/s hacia fuera, impulso vertical de -590 px/s y bloqueo de control de 0.20 s. La caída junto a una pared se limita a 180 px/s para facilitar el siguiente salto.
- Dash: 680 px/s durante 0.16 s, coste de 20 de energía y enfriamiento de 0.70 s. Admite dirección contraria y doble toque horizontal.
- Cuerpo: 26×60. Agacharse reduce la altura a 36 manteniendo la posición de los pies. No se puede incorporarse dentro de un techo.
- La caja de ataque solo aparece en la fase activa. Su alcance y altura cambian con el golpe de combo y la patada aérea. El dibujo conserva las proporciones del personaje.

Ejemplo de uso de las clases reales:

```js
const level = makeStoryLevel(1);
const world = new FISIAdventure.World(level, 1, (event, data) => {
  // Reproducir efectos o abrir el examen docente al recibir "gate".
});
world.update({right: true, jumpPress: true}, 1 / 60);
```

## Colisiones AABB

La función entregada es:

```js
function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}
```

`moveBody` resuelve primero X y luego Y, desplaza el cuerpo hasta el borde del bloque y anula la velocidad del eje de contacto. `TileMap.rects` consulta únicamente las filas y columnas próximas al cuerpo. Las plataformas de una sola dirección se aceptan al caer y solo si los pies estaban por encima de su cara superior en el paso anterior. Las plataformas intermitentes se dibujan y colisionan con el mismo reloj.

`World.update` comprueba las cajas del jugador contra ítems, ataques, enemigos, pinchos y láseres. Un conjunto de IDs por golpe impide que un enemigo reciba daño repetido en todos los fotogramas de una animación.

## Combate y enemigos

J encadena tres fases: puño, segundo puño y patada final, con 9/12/20 de daño. Una pulsación dentro de un ataque en curso se guarda para el siguiente golpe. La patada en salto causa 16 y suspende brevemente la caída. L dispara `{ }` y `< >` por 18 de energía. I consume 50 y produce un pulso que limpia enemigos próximos. H reduce daño a costa de energía.

| Enemigo | Comportamiento |
|---|---|
| Bug de Sintaxis | Patrulla, vigila bordes, persigue dentro de rango y anticipa una mordida. Los golpes interrumpen su ataque. |
| Virus Troyano | Vuelo senoidal, alas animadas y disparos descendentes de código malicioso. |
| Práctica Calificada Sorpresa | Enemigo lento con más vida y aviso previo al ataque. Su super armor conserva el ataque al recibir golpes básicos. |

## Power-ups

`applyCollectible(player, item, world)` marca `item.taken` antes de aplicar el efecto, de modo que no se cobra varias veces.

| Ítem | Efecto |
|---|---|
| Java / C++ (`Jv`) | +20 HP hasta un máximo de 100. |
| Python (`Py`) | Energía completa. |
| SQL / PostgreSQL | `player.isInvulnerable` devuelve `true` durante 5 s. |
| JS / React | Multiplicador de puntuación ×2 durante 12 s. No duplica daño. |
| Crédito ◆ | Uno de los tres sellos necesarios para abrir el examen. |
| Bit dorado | Puntos de exploración. |

## Diez ciclos

| Ciclo | Capítulo y cursos propuestos | Docente final |
|---|---|---|
| 1 | El primer algoritmo · Álgebra y Algoritmos | Ingestrella |
| 2 | La fuerza del código · Física General y Programación I | Cárdenas |
| 3 | Fuera del bucle · Estructuras y Matemática Discreta | Kike Parker |
| 4 | Corazón de silicio · Programación II y Arquitectura | Ingestrella |
| 5 | La consulta perdida · Base de Datos y Requisitos | Cárdenas |
| 6 | Paquetes en fuga · Redes y Sistemas Operativos | Kike Parker |
| 7 | Acceso autorizado · Ingeniería de Software y Seguridad | Ingestrella |
| 8 | Aprender a aprender · Inteligencia Artificial y Proyectos TI | Cárdenas |
| 9 | Cuenta regresiva · Arquitectura de Software y Analítica | Kike Parker |
| 10 | La última sustentación · Tesis y Gestión de TI | Pepelucho |

Cada nivel tiene plataformas, rutas altas opcionales, dos puntos de control, tres créditos y un portal. La geometría varía con el ciclo: atajos altos, torres, ecuaciones adicionales y puentes sobre nuevos huecos. La cantidad y la resistencia de los enemigos aumentan. Los docentes pasan de una a tres barras y de dificultad fácil a difícil.

### Mundo 1: ciclos 1–3

Pizarras gigantes y cuadrículas, verde menta sobre azul pizarra, fórmulas de fondo. Ecuaciones caen al entrar en sus zonas. `while(true)` es suelo pegajoso: reduce la velocidad y termina dañando si el jugador se queda demasiado tiempo. Predominan bugs; aparecen troyanos y primeras prácticas sorpresa. Las rutas superiores introducen salto doble y wall jump.

### Mundo 2: ciclos 4–7

Racks, LED, cableado y azul cian. Plataformas de conexión desaparecen y regresan con un periodo de 2.8 s; los nodos electrificados alternan intervalos seguros y peligrosos. Más troyanos obligan a combinar salto y proyectiles. Rutas altas recompensan con SQL y JS.

### Mundo 3: ciclos 8–10

Auditorio abstracto y conexiones neuronales, violeta con dorado. Firewalls verticales requieren esperar el pulso o aprovechar una mejora. Dentro de las zonas de entrega, quedarse nueve segundos provoca daño y reinicia parcialmente la cuenta. Hay rutas sobre vacíos, más tanques y la sustentación final con Pepelucho.

### Matrices de ejemplo

Los mapas reales se generan como `Array<Array<string>>` y se convierten en filas de texto. Ejemplos abreviados, editables con `new FISIAdventure.TileMap(filas)`:

```js
// # sólido; - plataforma de una dirección; ~ bucle pegajoso; ^ pinchos.
const fundamentos = [
  '....................',
  '.......----.........',
  '...----.........--..',
  '...........#........',
  '...........#........',
  '#####~~~~#####...###'
];
// = plataforma que cambia entre sólida y fantasma; ! nodo o firewall.
const sistemas = [
  '....................',
  '........====........',
  '...----.........--..',
  '............!.......',
  '............!.......',
  '##########...#######'
];
const especializacion = [
  '....................',
  '........-----.......',
  '...===.......!......',
  '.............!......',
  '.............!......',
  '#######...##########'
];
```

Los spawns, coleccionables, controles, trampas de techo, zonas temporizadas y portal están en listas independientes con coordenadas; así un ítem no reemplaza un bloque del suelo en la matriz. `makeStoryLevel(ciclo)` entrega ambos tipos de datos.

## Examen, guardado y memoria

Al reunir tres créditos, E/↑ abre el diálogo. Se recuperan 20 HP antes del examen y se conservan energía y escudo vigente. Se utiliza el combate actual, con una ronda por examen. Ganar permite seguir al siguiente ciclo; perder ofrece repetir el examen o volver a explorar. El décimo termina con graduación y trofeo.

El navegador guarda ciclos aprobados y mejor puntuación mediante `localStorage` (`fisi-story-v1`). Un fallo de almacenamiento no impide jugar. El recorrido en curso no se guarda entre sesiones.

Object pooling: un mundo reserva 24 enemigos, 72 proyectiles y 160 partículas. `acquire` reutiliza una instancia inactiva y `release` la devuelve al pool. Los enemigos conservan sus métodos de clase. La cámara activa solo los spawns cercanos; al dormirlos se guardan vida, posición y fase de vuelo, y los muertos no reaparecen. No se crean nuevos pools por enemigo ni por fotograma.

El render recorre únicamente las columnas visibles del tilemap. Los personajes reutilizan los sprites y las cachés ya cargadas por el juego; fondos, enemigos y emblemas de ítems son dibujos Canvas y no añaden nuevas texturas al paquete. Al cambiar de ciclo se conserva un solo mundo activo y las instancias anteriores quedan disponibles para recolección de memoria.

## Controles

- A/D o flechas: moverse. W/Espacio: salto, otro toque para doble salto; tocar salto junto a la pared para impulsarse.
- S/↓: agacharse. J: combo. K: patada/aéreo. L: lanzar código. I: pulso. H: defender.
- Shift o doble toque horizontal: dash. E/↑ cerca del portal: examen. Esc/R: pausa y salida con confirmación.
- Mando: A salto; X combo; B patada; Y código; LB escudo; RB pulso; RT dash; cruceta ↑ portal; Start pausa. B sigue siendo patada en el combate docente; Back/Share abre pausa.
- Pantalla táctil: botones de movimiento, salto, golpe, código, dash y examen durante la aventura.

## Verificación

Los resultados se guardan en `VERIFICACION-HISTORIA-CORE.json` y `VERIFICACION-HISTORIA-UI.json`: colisiones, gravedad, salto doble y pared, dash, coleccionables, tanque, vuelo, pools, recorrido de los diez mapas, selección, teclado real, portal, docente, avance, graduación y regreso a VS.
