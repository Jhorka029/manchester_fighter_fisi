# Diagnóstico General del Proyecto y Solución al Bug de Escalado de Personajes

**Proyecto:** Manchester FISI Fighter (v0.11)  
**Fecha de análisis:** Noviembre 2026

---

## Parte 1: Diagnóstico Profundo del Bug Visual ("Personajes más grandes o más pequeños en ciertos movimientos")

### ¿Por qué ocurre este problema?
El juego dibuja a cada luchador anclando sus pies al suelo (`FLOOR - p.y`) y escalando el sprite hacia arriba con una altura `h` y un ancho proporcional `w = (im.width / im.height) * h` calculados por la función `fighterGeometry(id, q)`.

Al analizar toda la cadena de renderizado (`game-v4.js` → `combat-refinements.js` → `lancha-updates.js` → `fiel-updates.js` → `sprite-scaling.js` → `grab-updates.js` → `battle-scenes.js`), se identificaron **5 causas raíz simultáneas** que provocan que los personajes cambien bruscamente de tamaño ("efecto acordeón") al ejecutar ciertos movimientos:

---

### Causa Raíz 1: Desfase entre `characterHeight(0/1) = 258` y `VISIBLE_FIGHTER_HEIGHT = 218` (Afecta gravemente a Lancha y El Fiel)

En `combat-refinements.js` (línea 3):
```javascript
function characterHeight(id){return SETS[id]?SETS[id].frames.idle.height/2*SETS[id].scale:258}
```
Para los personajes de atlas (`id = 2..8`), `characterHeight(id)` devuelve **~217.5 a 222 px**.  
Sin embargo, para **Lancha (`id = 0`)** y **El Fiel (`id = 1`)**, `SETS[id]` es `null`, por lo que `characterHeight` devuelve **`258`** (que era la altura del lienzo antiguo incluyendo ~40 px de margen transparente superior).

Posteriormente, en la versión 0.10 se añadió `sprite-scaling.js` (líneas 2 y 18–22):
```javascript
const VISIBLE_FIGHTER_HEIGHT=218;
// ...
let g=trimGeometry(original);
if(state==='intro')return geometryAtHeight(g,VISIBLE_FIGHTER_HEIGHT);
const idle=SETS[id]?resolvePose(id,'idle'):null;
if(q.base===0||q.base===1||q.base===2||q.base===4||q.kent===idle&&idle!==null)g=geometryAtHeight(g,VISIBLE_FIGHTER_HEIGHT);
return g;
```
**¿Qué provoca esto?**
- En reposo (`base: 0`), caminar (`base: 1`) y puño (`base: 2`), `sprite-scaling.js` recorta el margen transparente y fuerza a Lancha y El Fiel a medir **`218 px`** de alto.
- Pero cuando Lancha o El Fiel pasan a **cualquier otra familia de sprites** que ya viene recortada al borde del personaje (`lj`, `lc`, `show`, `fiel`, `fsup`), `trimGeometry` no reduce nada y `sprite-scaling.js` **no** los reescala a `218`, dejándolos con el `target = 258` de `combat-refinements.js` (**+18.3% más grandes, 40 píxeles extra de altura**):

| Personaje y Movimiento | Propiedad en `pose(p)` | Altura dibujada actual | Altura correcta esperada | Variación visual |
| :--- | :--- | :---: | :---: | :---: |
| **Lancha** en reposo / caminar / puño | `base: 0, 1, 2` | `218.0 px` | `218.0 px` | Base (0%) |
| **Lancha** recargando energía (`O`) | `lc: 'flex' / 'bite' / 'chew'` | **`258.0 px`** | `218.0 px` | **+18.3% (Se agranda de golpe)** |
| **Lancha** subiendo en salto (`W`) | `lj: 'up'` | **`258.0 px`** | `218.0 px` | **+18.3% al despegar** |
| **Lancha** cayendo del salto (`vy <= 0`) | `grab11: '0-landing'` | **`201.7 px`** | `218.0 px` | **Se encoge -22% en pleno aire al pasar de subir a bajar** |
| **Lancha** patada media (`K`) | `extra: 3` (`patada-media.png`) | **`203.5 px`** | `218.0 px` | **-6.7% (Más pequeño de pie)** |
| **Lancha / El Fiel** ganando ronda | `show: 3` (`presentacion-2.png`) | **`258.0 px`** | `218.0 px` | **+18.3% al ganar la ronda** |
| **El Fiel** saltando (`W`) | `show: 0 / 1` | **`198.3 / 247.3 px`** | `167.5 / 209.0 px` | **+18.3% más grande en el aire** |
| **El Fiel** final de voltereta (`S+D+D`) | `fiel: 4` | **`258.0 px`** | `218.0 px` | **+18.3% y se encoge al volver a guardia** |
| **Lancha / El Fiel** recibiendo daño (`hurt`) | `base: 5` (`reaccion.png`) | **`196.8 / 203.2 px`** | `~210 px` | `base: 5` fue omitido del `if` en `sprite-scaling.js` |

---

### Causa Raíz 2: Achatamiento del cuerpo cuando un sprite tiene brazos, armas o efectos elevados y se fuerza a `218 px`

Cuando un personaje levanta un brazo, un polo o un arma por encima de su cabeza, la **altura total del PNG** aumenta, aunque su cabeza y su torso midan lo mismo. Si el código fuerza la altura total de ese frame a `218 px` (`VISIBLE_FIGHTER_HEIGHT`) o a `target` (`characterHeight(id)`), **el cuerpo entero del personaje se encoge proporcionalmente**:

1. **El Fiel (`id = 1`) en Ráfaga Baja (`S + L`) o Especial antiguo (`base: 4` vs `follow: 3`):**
   - En `especial.png` (`base: 4`), El Fiel levanta su polo morado muy por encima de la cabeza (`467 px` visibles de alto en el PNG original, frente a `405 px` de su cuerpo en guardia).
   - Como `sprite-scaling.js` incluye `q.base === 4` en `geometryAtHeight(g, 218)`, comprime los `467 px` (cuerpo + polo levantado) dentro de `218 px`, **encogiendo el cuerpo de El Fiel un -13.3%** (su cuerpo pasa a medir solo `189 px`).
   - Peor aún: en `game-v4.js` (línea 326), el ataque alterna 9 veces por segundo entre `{base: 4}` (forzado a **`218 px`**) y `{follow: 3}` (`continuacion-especial.png`, que **no** pasa por `geometryAtHeight` y se dibuja a **`277.3 px`**). Esto produce un **parpadeo de tamaño del +27%** durante el ataque.
2. **Joshi (`id = 8`) en Intro y Victoria (`winA`, `winB`, `winC`):**
   - En `combat-refinements.js` (línea 6):
     ```javascript
     if(/^(intro[AB]|win[ABC]?)$/.test(q.kent)) h = target;
     ```
   - En `JO_ATLAS`, `idle` mide `435 px` (`217.5 px` en juego), pero `winA` (`481 px`) y `winC` (`479 px`, usado también como `introA`) son más altos porque **Joshi levanta el brazo celebrando**.
   - Al forzar `h = target` (`217.5 px`), el cuerpo de Joshi se encoge un **-10%** en `winA` y `winC`, pero en `winB` (`433 px`) vuelve a su tamaño real. Como `winSeq` alterna `['winA', 'winB', 'winC', 'winB']`, **Joshi se encoge y se agranda rítmicamente durante su celebración**.
3. **Pingordy (`id = 3`) durante la Intro (`state === 'intro'`):**
   - En `pingordy-animation.js` (línea 21), durante la cuenta regresiva (`state === 'intro'`) Pingordy ejecuta `flourish0..3` (postura de carga con las rodillas flexionadas, cuya altura natural en combate al pulsar `O` es `191–194 px`).
   - Pero `sprite-scaling.js` (línea 19) tiene `if (state === 'intro') return geometryAtHeight(g, VISIBLE_FIGHTER_HEIGHT);`, lo que **estira a Pingordy agachado hasta `218 px` (+14% más grande y cabezón)** durante la cuenta regresiva, y en cuanto el reloj llega a `¡A PELEAR!` o carga en combate, se encoge de golpe.

---

### Causa Raíz 3: Escalas inconsistentes en frames específicos dentro de los Atlas (`id = 2..8`)

Para los personajes con atlas (`SETS[id]`), `combat-refinements.js` calcula `h = s.height / 2 * SETS[id].scale`. Como `s.height` es simplemente el alto del rectángulo recortado en el atlas, cualquier frame que haya sido empaquetado a otra escala corporal cambia directamente el tamaño del personaje en pantalla:

1. **Joshi (`id = 8`) al recibir daño (`hurt`):**
   - En `JO_ATLAS`, `idle` tiene `h = 435` (`217.5 px` en juego), pero `hurt` (`[2041, 0, 333, 496, 0.531]`) tiene `h = 496` (**`248.0 px` en juego, +14% más grande**). Cada vez que golpean a Joshi, **se agranda notablemente** durante el hitstun y se encoge al recuperarse.
2. **Pingordy (`id = 3`) en golpes básicos (`combat4`, `combat5`) y recarga (`flourish0..3`):**
   - En `pingordy-animation.js`, `stance0` (`idle`) y `walk0..7` tienen `height ≈ 432–435` (`~217 px` en pantalla).
   - En cambio, `combat4` (`punch`, golpe alto de pie con `J`) tiene `height = 393.5` (`196.7 px`, **-9.6% más pequeño**) y `combat5` (`mid`, patada media con `K`) tiene `height = 396.4` (`198.2 px`, **-8.9% más pequeño**). Al dar un puñetazo o patada de pie, Pingordy se ve casi 20 px más bajo.
   - En `flying2` (impacto de patada aérea), `height` baja hasta `266.1` (`133 px`), haciendo que el cuerpo en el aire se vea comprimido respecto a `jumpUp`/`jumpDown` (`371–377` -> `186–189 px`).
3. **Pepelucho (`id = 7`) en agarres (`grabReach`, `grabHold`, `grabEnd`) y especial (`special`):**
   - En `PP_ATLAS`, `idle` mide `444` (`222 px`), pero `grabReach` (`401`), `grabHold` (`395`) y `grabEnd` (`403`) miden `~198–201 px` (**-10% más bajo** estando de pie).

---

### Causa Raíz 4: `battle-scenes.js` encoge un 15.5% a Lancha y El Fiel en todas las escenas del Modo Batalla

En `battle-scenes.js` (línea 7):
```javascript
const g=fighterGeometry(id,q),scale=height/characterHeight(id),w=g.w*scale,h=g.h*scale
```
- Después de `sprite-scaling.js`, `fighterGeometry(id, q).h` en `idle` ya vale **`218`** para los 9 personajes.
- Sin embargo, `battle-scenes.js` divide `height` entre `characterHeight(id)`, que vale `258` para Lancha (`0`) y El Fiel (`1`), pero `~218` para el resto (`2..8`).
- Resultado: `h = 218 * (height / 258) = 0.845 * height`. En los diálogos, transiciones y escena de campeón del modo Batalla, **Lancha y El Fiel se dibujan un 15.5% más pequeños** que todos sus rivales.

---

### Causa Raíz 5: `drawVS()` ignora `fighterGeometry` y dibuja los sprites crudos sin recortar

En `game-v4.js` (línea 391):
```javascript
const s=(SETS[p.id]&&SETS[p.id].frames[resolvePose(p.id,'introA')])||showSprites[p.id*4+2],h=versusHeight(p.id),w=s.image.width/s.image.height*h;
```
En la pantalla `VS`, no se pasa por `visibleSprite()` ni por `fighterGeometry()`, por lo que cualquier diferencia de margen transparente en la imagen `introA` altera la proporción real del personaje en el careo previo al combate.

---

## Parte 2: Solución Detallada Paso a Paso para el Bug de Escalado

Para que todos los personajes mantengan **exactamente la misma escala corporal (`218 px` de referencia de pie)** en todos sus movimientos sin encogerse al levantar los brazos ni agrandarse al saltar, recargar o recibir golpes:

### Paso 1: Unificar `characterHeight(id)` y corregir los divisores en `combat-refinements.js`
En [`combat-refinements.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/combat-refinements.js#L3-L16), la altura corporal de referencia (`characterHeight`) debe ser consistente con `218 px` visibles para todos los luchadores, y **no** se debe aplastar `introA/introB/win` cuando la pose supera la altura de `idle` por levantar los brazos:

```javascript
// En combat-refinements.js (reemplazar líneas 3-16):
const BASE_BODY_HEIGHT = 218;
function characterHeight(id) {
  return SETS[id] ? SETS[id].frames.idle.height / 2 * SETS[id].scale : BASE_BODY_HEIGHT;
}
function fighterGeometry(id, q) {
  const target = characterHeight(id);
  let s, im, h, anchor = .5;
  if (q.kent !== undefined) {
    s = SETS[id].frames[q.kent];
    im = s.image;
    const poseScale = (SETS[id].poseScale && SETS[id].poseScale[q.kent]) || 1;
    h = (s.height / 2) * SETS[id].scale * poseScale;
    anchor = s.anchor;
  }
  else if (q.fsup !== undefined) { s = fielSuper[q.fsup]; im = s.image; h = s.height * target / fielSuper.backA.height; anchor = s.anchor; }
  else if (q.lj !== undefined)   { s = ljFrames[q.lj]; im = s.image; h = s.height * target / ljFrames.up.height; anchor = s.anchor; }
  else if (q.lc !== undefined)   { s = lcFrames[q.lc]; im = s.image; h = id === 0 ? s.height * target / lcFrames.flex.height : s.height * target / 440; anchor = s.anchor; }
  else if (q.roll !== undefined) { s = rollSprites[q.roll]; im = s.image; h = s.height * target / 350; }
  else if (q.fiel !== undefined) { s = fielRoll[q.fiel]; im = s.image; h = s.height * target / fielRoll.at(-1).height; }
  else if (q.show !== undefined) { s = showSprites[id * 4 + q.show]; im = s.image; h = s.height * target / showSprites[id * 4 + 2].height; }
  else if (q.extra !== undefined || q.follow !== undefined) {
    s = q.extra !== undefined ? extraSprites[id * 6 + q.extra] : followSprites[id * 4 + q.follow];
    im = s.image;
    // Escala de lámina moves/follow calibrada a cuerpo de 218 px (395 px visibles en base equivalen a ~372 px en moves)
    const sheetRef = (id === 0 && q.extra === 3) ? 347 : 395;
    h = s.height * target / sheetRef;
    if (q.extra === 1) anchor = .4;
    if ([2, 3, 4].includes(q.extra)) anchor = .37;
  }
  else {
    // Sprites base[0..5] (468 px de alto en Lancha con 395 px visibles; 480 px en El Fiel con 405 px visibles)
    im = sprites[id * 6 + (q.base ?? 0)];
    const baseVisibleRef = id === 0 ? 395 : 405;
    h = im.height * target / baseVisibleRef;
    anchor = q.base === 2 ? .39 : .5;
  }
  return { im, h, w: im.width / im.height * h, anchor: anchor ?? .5 };
}
```

### Paso 2: Corregir `sprite-scaling.js` para que recorte márgenes transparentes SIN deformar la escala de la lámina
El propósito de `sprite-scaling.js` debe ser eliminar márgenes transparentes (`trimGeometry`) manteniendo la relación `px_juego / px_fuente` constante, **sin** forzar poses con brazos levantados (`q.base === 4`) ni poses agachadas de intro (`state === 'intro'` en Pingordy) a medir `218 px`:

```javascript
// En sprite-scaling.js (reemplazar líneas 14-23):
fighterGeometry = function(id, q) {
  const original = beforeVisibleGeometry(id, q);
  if (q.fiel10 || q.grab11) return original;
  if (q.lanchaShot) {
    return geometryAtHeight(
      original,
      VISIBLE_FIGHTER_HEIGHT * LANCHA_SHOT_ASSETS[q.lanchaShot].height / LANCHA_SHOT_ASSETS.shot0.height
    );
  }
  // Recorta el margen transparente conservando exactamente la escala corporal calculada en original
  let g = trimGeometry(original);
  const idle = SETS[id] ? resolvePose(id, 'idle') : null;
  // Solo normalizar a 218 px las poses de guardia/caminar/puño base o idle
  if (q.base === 0 || q.base === 1 || q.base === 2 || (q.kent === idle && idle !== null)) {
    g = geometryAtHeight(g, VISIBLE_FIGHTER_HEIGHT);
  }
  return g;
};
```
*(Con el Paso 1 + Paso 2, `base[4]` de El Fiel mantiene su cuerpo a `218 px` y el polo levantado sobresale naturalmente hasta `~251 px`, igualándose con `follow: 3`; Lancha ya no crece a `258 px` al saltar o recargar, y Pingordy ya no se estira en la intro).*

### Paso 3: Ajustar los frames descalibrados de Joshi, Pingordy y Pepelucho (`poseScale`)
Para los frames puntuales donde el recorte del atlas quedó con una escala corporal distinta al `idle`, puedes agregar un mapa `poseScale` en `SETS` o ajustar su `height`:
1. **Joshi (`id = 8`):** En `JO_ATLAS`, cambiar la altura de `hurt` de `496` a `435` (o definir `SETS[8].poseScale = { hurt: 0.877 }`), para que no se agrande un +14% al ser golpeado.
2. **Pingordy (`id = 3`):** En `PINGORDY_FRAMES` (`pingordy-animation.js`), multiplicar por `1.08` la propiedad `height` de `combat4` (`393.5` → `425`), `combat5` (`396.4` → `428`) y `flourish0..3` (`385` → `416`), de modo que su cabeza y torso al golpear o recargar coincidan con `stance0` (`435.2`).
3. **Pepelucho (`id = 7`):** Definir `SETS[7].poseScale = { grabReach: 1.08, grabHold: 1.08, grabEnd: 1.08 }` para que no se encoja al agarrar.
4. **Lancha (`id = 0`) en caída de salto (`grab-updates.js`):** En `GRAB_ASSETS['0-landing']`, cambiar `"height": 235` a `"height": 250` para que coincida con la escala de subida (`ljFrames.up`) y no dé un tirón visual en el aire.

---

## Parte 3: Otros Problemas Encontrados en el Análisis del Proyecto

Además del bug de escalado visual, el análisis integral del código reveló los siguientes problemas técnicos, de arquitectura y de lógica:

### 1. Arquitectura de "Monkey-Patching" en cascada (Riesgo alto de mantenimiento)
- **Problema:** Los 20 scripts en `index.html` comparten el ámbito global (`window`) y redefinen las mismas funciones (`pose`, `fighterGeometry`, `drawFighter`, `step`, `attack`, `advanceAttack`, `spawn`, `beginRound`, `menu`, `frontUI`, `padMenu`, `render`) entre **6 y 9 veces seguidas** guardando referencias como `oldStep`, `priorLanchaStep`, `teacherOldStep`, `beforeFielV10Pose`, etc.
- **Consecuencias actuales en el código:**
  - En [`combat-refinements.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/combat-refinements.js#L31), `resolvePowerClash()` invoca `preClashAttack(p, 'super')`, que apunta a la función `attack` **anterior** a `fighter-updates.js`, `lancha-updates.js` y `fiel-updates.js`. Por eso se tuvo que duplicar la inicialización de las ultis de Kike, Lancha y El Fiel dentro de tres wrappers distintos de `resolvePowerClash`.
  - `grab-updates.js` se carga **después** de `sprite-scaling.js` en `index.html`, saltándose el filtro y caché de `sprite-scaling.js`.
- **Solución recomendada:** Centralizar un registro de personajes (`CHARACTER_HANDLERS[id] = { onAttack, onStep, getPose, getGeometry, onDraw }`) en lugar de envolver funciones globales en cada archivo nuevo.

### 2. Bug de reemplazo con `$` en el empaquetador `build.cjs`
- **Problema:** En [`build.cjs`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/build.cjs#L14-L15):
  ```javascript
  for(const s of scripts)html=html.replace(s.tag,'<script>'+s.code.replaceAll('</script','<\\/script')+'</script>');
  for(const s of styles)html=html.replace(s.tag,'<style>'+s.code+'</style>');
  ```
  En JavaScript, `String.prototype.replace(patron, cadena)` interpreta secuencias con `$` (`$&`, `$'`, `` $` ``, `$$`) en el segundo parámetro. Como el código fuente usa `$` intensivamente (`const $=s=>...`, `$('#id')`), cualquier combinación como `$&` o `$'` dentro de un script corromperá el HTML autónomo generado.
- **Solución:** Usar una función como segundo argumento en `replace`:
  ```javascript
  for(const s of scripts) html = html.replace(s.tag, () => '<script>' + s.code.replaceAll('</script', '<\\/script') + '</script>');
  for(const s of styles)  html = html.replace(s.tag, () => '<style>' + s.code + '</style>');
  ```

### 3. Diálogo vacío de Lancha vs El Fiel en Modo Batalla (`battle-scenes.js` y `DIALOGOS-BATALLA.json`)
- **Problema:** En [`battle-scenes.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/battle-scenes.js#L2) y [`docs/DIALOGOS-BATALLA.json`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/docs/DIALOGOS-BATALLA.json#L2-L5), la entrada `"0-1"` tiene el texto de Lancha vacío:
  ```json
  "0-1": { "hero": "", "rival": "Lancha, la fidelidad se demuestra peleando." }
  ```
  Al ser `""` falsy, en `battle-scenes.js` (línea 32) cae en el texto genérico `'Mi facultad cuenta conmigo.'` en lugar de una frase propia de Lancha, y desentona con el audio `duelo-0-1.mp3`.

### 4. Textos y versiones desactualizadas que se pisan en tiempo de ejecución (`presentation.js`)
- **Problema:**
  - En [`index.html`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/index.html#L3), el encabezado dice `TORNEO DEL CAMPUS · EDICIÓN ARCADE 0.11`, pero [`presentation.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/presentation.js#L89) lo sobrescribe al cargar con:
    ```javascript
    $('.brand small').textContent='TORNEO DEL CAMPUS · EDICIÓN ARCADE 0.7';
    ```
  - En [`presentation.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/presentation.js#L79), la cinemática de introducción muestra el texto `'SIETE ESCENARIOS · UN MISMO ORGULLO'`, cuando el catálogo (`GAME_ASSETS.stages`) ya cuenta con **10 escenarios** (`DIEZ ESCENARIOS · UN MISMO ORGULLO`).
  - La tabla de ayuda de [`index.html`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/index.html#L8) sigue describiendo ataques antiguos (por ejemplo, dice que el super de Kike es "Asamblea de Puños, una lluvia de golpes" en lugar de la manada de 10 tigrillos, o no menciona el lanzamiento de bala de Lancha con `U` ni el cuchillo de El Fiel con `U`).

### 5. Carga de recursos obsoletos y bloqueo de hilo principal (Performance / Memoria)
- **Problema A (Assets muertos en `load()`):** En [`game-v4.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/game-v4.js#L99-L103), `load()` sigue descargando y cortando en múltiples `<canvas>` el atlas antiguo `'assets/personajes/pingordy/atlas.png'` (aunque `pingordy-animation.js` lo reemplaza por completo con los 101 PNG de `unificado/`) y `'assets/personajes/el-fiel/super.png'` (reemplazado por `fiel-updates.js`).
- **Problema B (Decodificación masiva de audio al inicio):** [`battle-audio.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/battle-audio.js#L4) lanza `52` peticiones `fetch` + `decodeAudioData` de las voces de campaña en el instante en que carga la página, compitiendo por ancho de banda y CPU con la carga de sprites e interfaz, incluso si el jugador solo va a jugar modo VS o Entrenamiento. Conviene cargar los audios de `duelo-X-Y.mp3` bajo demanda al iniciar el modo Batalla o al entrar en la fase `transition`.
- **Problema C (Micro-tirones por `getImageData` en pleno combate):** Tanto `visibleSprite(im)` en [`sprite-scaling.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/sprite-scaling.js#L5) como `alternateClothesImage(im, id)` en [`versus-options.js`](file:///d:/Desktop/ManchesterPeleas/manchester_fighter_fisi/versus-options.js#L13) leen y procesan todos los píxeles en CPU la primera vez que un frame se dibuja durante la pelea. Precalentar esta caché al final de `load()` o en `beginRound()` eliminará cualquier tirón en el primer golpe o super.

### 6. Desincronización entre la posición visual de ciertas ataques y su Hitbox/Hurtbox
- **Ulti de Lancha (`lancha-updates.js` líneas 86 y 136):** Cuando el rival salta, Lancha eleva su dibujo con `ctx.translate(0, -lift)` usando `r.lift`, pero su coordenada física `p.y` permanece en `0`. Por tanto, si el rival ataca o lanza un proyectil, la `hurtbox(p)` de Lancha sigue en el suelo aunque visualmente la bola esté en el aire.
- **Golpe cargado de Lancha (`lancha-updates.js` línea 74 vs `game-v4.js` línea 224):** Al mantener `U` para cargar el ataque descendente, `game-v4.js` asigna `p.move = MOVES.charged` (que por defecto no tiene `shotPut: true` ni `projectile: true`), dependiendo de que `advanceAttack` en el fotograma siguiente lo parchee con `useShotPutMove(p)`. Inicializar `MOVES.charged` o interceptar la transición a `charged` evita estados intermedios inconsistentes.



---

## Parte 4: Estado de Implementación y Verificación (Completado en v0.11)

Todas las soluciones descritas en este diagnóstico fueron aplicadas, verificadas y consolidadas en el código fuente del proyecto:

### 1. Reorganización Estándar de la Estructura de Archivos
- Se crearon las carpetas `js/` y `css/`.
- Los 20 scripts JavaScript y 8 archivos CSS sueltos en la raíz fueron migrados a sus carpetas respectivas.
- Se actualizaron todas las rutas relativas en `index.html` (`<script src="js/...">` y `<link rel="stylesheet" href="css/...">`).
- Se actualizaron los textos de ayuda en `index.html` para reflejar con precisión los movimientos vigentes de la versión 0.11 (tigrillos de Kike, lanzamiento de bala y rodada de Lancha, cuchillo de El Fiel).

### 2. Corrección del Bug de Sustitución con `$` en `build.cjs`
- Se reemplazó la invocación directa `html.replace(tag, '<script>...')` por funciones callback:
  ```javascript
  for (const s of scripts) html = html.replace(s.tag, () => '<script>' + s.code.replaceAll('</script', '<\\/script') + '</script>');
  for (const s of styles)  html = html.replace(s.tag, () => '<style>' + s.code + '</style>');
  ```
- Esto evita que secuencias con `$` (`$&`, `$'`, etc.) presentes en el código JavaScript rompan el empaquetado del archivo HTML resultante.

### 3. Normalización Geométrica y Corrección del Escalado Visual
- **`js/combat-refinements.js`:**
  - `characterHeight(id)` ahora devuelve de forma canónica `BASE_BODY_HEIGHT = 218` para Lancha (`id = 0`) y El Fiel (`id = 1`), eliminando el salto de escala de 258 px (+18.3%).
  - Se eliminó el aplastamiento vertical forzado de poses de victoria e intro (`win` / `intro`) que comprimía a los personajes cuando levantaban los brazos.
  - Se corrigió el cálculo de altura para `q.lj` (salto de Lancha), `q.lc` (recarga), `q.roll` (rodada) y `q.extra`/`q.follow` para mantener una escala corporal fija de 218 px.
- **`js/sprite-scaling.js`:**
  - Se excluyeron `q.grab11` y `q.fiel10` del recorte para evitar distorsiones en animaciones nuevas.
  - Se eliminó la forzada de `state === 'intro'` a 218 px, permitiendo que Pingordy mantenga su postura agachada natural sin estirarse ni deformarse en la intro.
  - Se retiró `q.base === 4` del ajuste forzado a 218 px, evitando que El Fiel se encoja a 189 px al levantar el polo.
- **`js/grab-updates.js`:**
  - Se calibró la pose de caída (`0-landing`) a referencia 235 px, garantizando que Lancha mida exactamente 218 px al caer y no sufra la reducción brusca a 201 px al descender.
- **`js/game-v4.js`:**
  - Se añadió `poseScale: { hurt: 435 / 496 }` para Joshi (`SETS[8]`), eliminando el crecimiento del +14% al recibir golpes.
  - Se añadió `poseScale: { grabReach: 444/401, grabHold: 444/395, grabEnd: 444/403 }` para Pepelucho (`SETS[7]`), evitando que se encoja durante los agarres.
- **`js/pingordy-animation.js`:**
  - Se calibraron las alturas de `combat4` (425 px), `combat5` (428 px) y `flourish0..3` (416 px) para mantener la cabeza y el torso consistentes con su `idle` (435.2 px / 217.6 px en juego).

### 4. Diálogos y Cinemáticas del Modo Batalla
- **`js/battle-scenes.js` y `docs/DIALOGOS-BATALLA.json`:**
  - Se completó la línea vacía `"0-1"` (Lancha vs El Fiel) con `"hero": "A ver si esa lealtad aguanta mi barrigazo."`, sincronizando el texto con la locución de voz y evitando el mensaje genérico.
  - Al unificar `characterHeight(id) = 218` para todos, Lancha y El Fiel ya no se dibujan un 15.5% más pequeños en las escenas de diálogo de campaña.

### 5. Consistencia de Versión y Escenarios en Interfaz
- **`js/presentation.js`:**
  - Se actualizó el título en cartelera a `"DIEZ ESCENARIOS · UN MISMO ORGULLO"`.
  - Se actualizó el badge y depuración a `v0.11` (reemplazando `v0.7` y `v0.5`).

### 6. Pruebas Automatizadas y Empaquetado
- **Suite de pruebas de escalado (`node scripts/test-scaling.cjs`):**
  - Verificó que todos los 9 personajes mantengan una altura canónica de ~218 px (`±2 px`, salvo Pepelucho con 222 px por diseño).
  - Verificó que Joshi mantenga 217.50 px en `hurt` (idéntico a `idle`).
  - Verificó que Pepelucho mantenga 222.00 px en agarres.
- **Compilación del HTML autónomo (`node build.cjs`):**
  - Generó exitosamente `outputs/Manchester-FISI-Fighter-v0.11.html` (114.3 MB, 365 recursos multimedia integrados en Base64).
