# Arte de Manchester FISI Fighter 0.4

Documentación de todos los recursos utilizados por la versión actual.

Arte generado con la herramienta integrada de imágenes y las cuatro fotografías del usuario como referencia de identidad.

Archivos: `assets/fighters.png` (atlas), `assets/arena.png` (escenario).

Prompt del atlas:

Use case: stylized-concept. Production game sprite atlas, landscape 1536x1024. STRICT 6 columns x 2 rows of equal rectangular cells, 12 separate full-body fighters. Uniform PURE MAGENTA #ff00ff background for chroma key, no shadows on background, no labels, no grid lines. Each sprite feet aligned 90% down its cell, same scale, entire body visible, no clipping, generous margins. Detailed 1990s 16-bit arcade fighting pixel art with chunky crisp pixels, dramatic shading, black outlines. All characters face RIGHT in three-quarter fighting stance. TOP ROW ONLY Lancha from reference images 1 and 2, preserve recognizable broad round face, swept black hair, thick short black beard, warm medium skin. Stocky slightly chubby physique with round belly, purple short sleeve polo, blue jeans, black shoes. Six cells left to right: idle guard, walking guard, straight punch, extended high kick, laughing belly thrust with big round belly sticking forward, hurt recoiling. BOTTOM ROW ONLY El Fiel reference images 3 and 4, preserve distinct lean angular clean-shaven face, side swept short black hair, medium skin. Athletic clearly muscular physique, purple polo, black shorts, dark sneakers. Six cells: idle guard, walking guard, straight punch, extended high kick, shirtless muscular torso holding removed purple polo overhead whipping it like towel (energy generated in game, do NOT draw energy), hurt recoiling wearing purple polo. Make heads large enough for recognizable likeness. All 12 are coherent animation frames for same two people, same clothing colors and proportions. No text, no logos, no other characters.

Prompt del escenario:

Use case stylized-concept. Game background only, no characters no interface. Wide 1536x864 detailed pixel art 16-bit 1990s arcade fighting game arena. Peruvian university campus courtyard at golden sunset becoming purple dusk, cream and terracotta faculty building with arched windows and purple university banners, distant palms and mountains, warm glowing windows, benches, potted plants, subtle neon violet cyan accent lights. Central building sign 'FISI'. Ground flat horizontal perspective stone paving fills bottom 25%, unobstructed horizontal fighting plane. Rich hand placed pixel clusters, atmospheric parallax-like layered architecture, beautiful nuanced warm and cool palette, crisp outlines. Cinematic original game art, not existing game screenshot. No people, no fighters, no HUD, no watermarks.

---

# Nuevas animaciones de Manchester FISI Fighter

Creado con la herramienta integrada de imágenes a partir de los sprites y fotografías de referencia existentes. Los originales se conservan. Se integraron `assets/moves-v3.png` y `assets/follow-v3.png` en el juego y en su HTML autónomo. El motor extrae cada silueta conectada; no usa recortes que incluyan miembros de otra pose.

## Prompt de movimientos

Use case: stylized-concept. Additional production animation sprite atlas for this EXACT fighting game. Match identity, outfit and pixel art of reference 1 precisely; reference 2 is Lancha face, reference 3 El Fiel face. 1536x1024 landscape, STRICT 6 columns x 2 equal rows, each cell 256x512, PURE SOLID MAGENTA #ff00ff background, no labels no grid no shadows no effects. Exactly 12 separate full-body character sprites, all facing RIGHT. Very important: every sprite entirely contained inside its cell with at least 22px empty margin on all four sides. NO overlap into neighbouring cells. Top row Lancha stocky slightly chubby broad bearded face, purple polo blue jeans black shoes. Bottom row El Fiel athletic muscular clean shaven angular face, purple polo black shorts navy shoes. SIX poses in each row, left to right: (1) deep crouching defensive stance, knees bent and hips low, fists guarding face; (2) crouching low straight punch towards opponent abdomen, hips low; (3) low sweeping kick, one knee deeply bent supporting body, other leg extended horizontally just above floor; (4) standing medium-height front kick towards opponent abdomen, not high head kick; (5) airborne diagonal forward jump kick, supporting leg bent up, kicking leg extended; (6) standing overhead downward hammer fist, arm raised over head ready to swing down. Keep each entire person within their cell, consistent head/body size across poses, bent poses naturally shorter, generous blank magenta above crouching characters; feet of grounded poses on same baseline near y=470 in each row. Crisp detailed 16-bit 1990s arcade pixel art shading black outlines consistent with reference 1. Preserve recognizable likeness, dark swept hair and beard Lancha, El Fiel no beard. No text no logos no other characters. Never draw adjacent body parts in other cells.

## Prompt de continuación y reacción

Use case stylized-concept. Additional action animation atlas for EXACT same two pixel art game characters in references. Landscape 1536x1024, 4 columns x 2 rows, 8 isolated full body sprites each wholly inside own equal cell with 35px margin. Solid pure MAGENTA #ff00ff background no shadows no grid no text. 16-bit detailed arcade pixel art matching reference identity outfits outlines and shading. Every character facing RIGHT. TOP row Lancha broad bearded face, stocky chubby, swept black hair purple polo blue jeans black shoes. BOTTOM row El Fiel angular clean shaven face, swept black hair athletic muscular, purple polo black shorts navy shoes. Each row FOUR frames: 1 OVERHEAD ATTACK IMPACT, fighter leans forward, one arm swings sharply DOWNWARD with fist at forward waist/hip height, other arm guarding chest, wide bent-knee stance. 2 CROUCHING HURT, crouched recoiling from hit, one hand covering face and other torso, no dismemberment. 3 LANDING crouch, both knees bent and feet firmly on ground, ready to stand, hands guarding. 4 SPECIAL ANIMATION FOLLOW THROUGH: for top Lancha leaning belly forward in big laughing belly thrust, hands lifted elbows back and eyes laughing; for bottom El Fiel shirtless muscular torso and abs holding removed purple polo twirling forward around extended raised right forearm while left hand guards, shorts and shoes unchanged. No energy effects, no detached hands or limbs. All eight sprites with consistent head size, full feet visible, generous space between poses, feet baseline same for all frames. Distinct separate silhouettes with no overlap.

El atlas generado conserva el brazo elevado para el golpe descendente; el motor lo usa como preparación y alterna la pose del otro atlas para la acción. No representa todavía una secuencia dibujada cuadro por cuadro completa.

---

# Poses de salto y presentación

Generadas con la herramienta integrada de imágenes a partir del atlas original y las dos fotografías de rostros. El archivo final `assets/show-v4.png` está integrado en el juego y en el HTML autónomo. Contiene ocho siluetas nuevas: subida, caída y dos poses de presentación por personaje. La patada aérea sigue usando su propia pose del atlas anterior.

Prompt utilizado:

Use case: stylized-concept. Production fighting-game animation atlas MATCHING reference 1 characters exactly, recognizable faces supported by photos 2 (Lancha) and 3 (El Fiel). 1536x1024 landscape, exactly 4 columns x 2 rows, 8 distinct separated full-body pixel art sprites on solid PURE MAGENTA #ff00ff background. No labels no effects no shadows no grids. All facing RIGHT in three-quarter view, complete feet visible, consistent character sizes, generous empty margins separating every silhouette, never touch neighbouring sprites. Detailed 16-bit 1990s arcade shading thick outlines. TOP ROW Lancha, stocky chubby with round belly, black swept hair full short beard purple polo blue jeans black shoes. BOTTOM ROW El Fiel, athletic muscular clean-shaven angular face black short swept hair purple fitted polo black shorts navy shoes. Same FOUR frames each row: col1 neutral JUMP RISING pose, both knees tucked up and elbows guarding chest, NO ATTACK, no extended kicking leg, hands closed near face; col2 neutral JUMP FALLING pose, feet both directed down under hips with slightly bent knees and arms guarding, NO KICK, very distinct from extended air-kick sprites; col3 personalized ground pre-fight introduction frame A: Lancha grinning with both palms patting his big belly; El Fiel adjusting the collar of his purple polo with both hands and a confident smile; col4 personalized ground introduction frame B: Lancha laughing head tilted slightly back, one hand on belly and one hand beckoning opponent; El Fiel flexing one bicep while holding polo collar with other hand, confident smile, KEEP SHIRT ON. Grounded introduction feet same baseline near bottom of each row. No bare torso in this atlas. Each whole sprite fits inside own cell with clear magenta space around it. No long extended limbs, no text logos or other people.

Los rayos, auras, cámara, estelas, sombras y ondas de impacto se dibujan por código en tiempo real.


---

# Rodada de Lancha

`assets/roll-lancha.webp` (1376x768, fondo magenta) contiene diez cuadros de Lancha, dos filas de cinco, mirando a la derecha: agachado, encogido, bola, cinco cuadros rodando y dos de levantarse. El motor los recorta con la misma rutina que los demás atlas (`extractPoses(im,5)`) y reproduce encoger, rodar en bucle y levantarse durante los 0,55 s de la rodada. 
# Voltereta de El Fiel

`assets/flip-fiel-prep.png` (preparación agachado) y `assets/flip-fiel.png` (salto encogido, invertido, aterrizaje y de pie), ambos sobre fondo magenta. El motor los recorta con `extractRow` y los reproduce en 0,65 s: preparación, salto encogido, invertido en lo alto del arco, encogido al bajar, aterrizaje y de pie. El arco vertical se dibuja elevando el sprite por código.

---

# Kent

Tercer personaje, a partir de 16 imágenes generadas con fondo magenta (más una con fondo beige, una verde y una blanca). Se procesaron fuera del juego con un script de Python: se quita el fondo, se recorta cada pose, se iguala el tamaño entre imágenes (cada una se generó a otra escala, así que se ajustó con la altura del lienzo y a ojo) y se empaquetan 24 poses en `assets/kent.png`, ya transparente y guardado al doble del tamaño de juego. Las posiciones están en la constante `KENT_ATLAS` de `game-v4.js`: `[x, y, ancho, alto, ancla horizontal]`.

Poses usadas: guardia (reposo y caminar), puño, patada media, patada baja, golpe bajo, descendente, especial (onda de fuego), super (aura roja, dos cuadros), defensa con brazos cruzados, golpeado, caído, agachado, salto subiendo y bajando, aterrizaje, presentación y victoria, y la voltereta (salto, giro y aterrizaje). `assets/kent-face.png` es el retrato del menú. Sin usar: tres posturas de reposo enojado, la imagen de balón y varios cuadros de guardia repetidos.

---

# Super de El Fiel

`assets/fiel-super.png` contiene cuatro cuadros recortados de una imagen con fondo magenta (dos de levantar el polo y dos de golpe con la estela morada). Se quitaron los rótulos "BACKSWING" y "THE SWING" y los restos de otros cuadros. Las posiciones están en `FIEL_SUPER_ATLAS` de `game-v4.js`. La fila de abajo se dibujó más grande y con los pies cortados por el borde de la imagen, así que se redujo un 13 % y los zapatos aparecen recortados. Durante la super, cada ráfaga muestra el golpe y después vuelve a levantar el polo, alternando las dos variantes.

Tamaños: los sprites de Lancha y El Fiel tienen margen vacío arriba, así que miden unos 217 px visibles aunque su lienzo sea de 258. Kent se escala con `KENT_SCALE` (0,85) para igualarlos.

---

# Pingordy

Cuarto personaje, a partir de 16 imágenes con fondo magenta (carpeta de referencia con el cuerpo completo y 15 hojas de poses). Se recortaron fuera del juego, se separaron los cuadros (la hoja de la ulti se cortó en cuatro por columnas fijas) y se igualó el tamaño entre hojas ajustando por la cabeza y a ojo. Quedan 23 cuadros en `assets/pingordy.png`, con las posiciones en `PING_ATLAS` de `game-v4.js`. `assets/pingordy-face.png` es el retrato del menú.

Asignación: reposo y caminar (idle, walk), puño (golpe alto), patada media y especial (medialuna y destello), golpe bajo y patada baja, agachado, defensa, golpeado, caído, salto y caída, presentación (carga de energía) y victoria, ulti (corrida y patada con explosión rosa) y rodada (tornado). Sin usar: dos cuadros de la ulti con notas musicales y estela, y el cuadro de la caída hacia atrás. La patada aérea (tercer cuadro de la ulti) se volvió a recortar con la pierna completa: su zapato llegaba hasta la zona del cuadro siguiente y se había cortado; para separarlo de la explosión roja se conservó solo la parte oscura (pantalón y zapato) y la estela rosa.

El puño agachado de Pingordy (S + puño) usa su propio cuadro, en cuclillas con el puño extendido (`lowPunch` del atlas). Faltan poses y usan la más cercana: el golpe descendente usa el puño, el agachado golpeado usa el golpeado, y el aterrizaje usa el agachado.

---

# Salto de Lancha

`assets/lancha-jump.png` trae cinco cuadros recortados de una hoja de salto: agacharse, subida con el puño en alto, picada en el aire, aterrizaje de panza y caída. Se usan en el salto normal (subida y caída), el doble salto (picada y aterrizaje de panza) y el aterrizaje (agacharse). Los ataques en el aire y el resto de sus poses siguen usando el atlas original.

---

# Paso lunar de Pingordy

El dash de Pingordy usa cinco cuadros propios de paso lunar (`moon0` a `moon4`, de una hoja con las piernas cruzándose); si faltaran, cae a los tres pasos de caminar (`walkA`, `walkC`, `walkB`). Se desliza más lento que el dash normal, mirando al rival, con los pasos en orden normal al ir hacia atrás y al revés al ir hacia delante, una leve inclinación hacia atrás, un pequeño rebote y estela. Los valores propios están en `DASH_CHAR` de `game-v4.js`. Los dos primeros cuadros de la hoja se tocaban por los zapatos y se separaron con un corte vertical.

# Estándar de poses

El archivo `D:\imagenes videojuego\Movimimientos standar.txt` define el conjunto de poses que debe tener cada personaje: reposo (2), caminar (3), agacharse, salto, caída del salto, bloqueo, recarga de energía (2), golpe básico alto (3), dos ataques especiales (3 cada uno), ulti (4), daño recibido, derribo (2) y victoria (2).

---

# Recarga de Lancha

`assets/lancha-charge.png` trae cuatro cuadros recortados de una hoja con fondo magenta: agarra la hamburguesa, muerde, mastica con la mano en la barriga y sube los brazos con destellos. Durante la recarga se muestra primero el primero y luego se repiten morder, masticar y subir los brazos. Posiciones en `LC_ATLAS` de `game-v4.js`.

Kent usa sus dos cuadros de puños con grito (los mismos del golpe descendente) y Pingordy sus dos cuadros de carga con llamas y aura (los mismos de la presentación). El Fiel usa dos cuadros propios (`assets/fiel-charge.png`): en cuclillas con los puños y la lengua afuera, uno con los ojos cerrados y otro riendo; se alternan unas 6 veces por segundo. Sustituyen a una primera versión de tres cuadros cuyos zapatos se tocaban y quedaban recortados. Con la barra llena la animación continúa mientras se mantiene el botón. El aura y las partículas se dibujan por código con el color de cada personaje.

---

# Ingestrella

Quinto personaje, a partir de 15 imágenes de la carpeta `inge.estrella` (cuerpo completo, agachado, dos especiales, caída del salto, victoria, derribo, golpes alto y bajo, golpeado, reposo, recarga de energía, salto, ulti y caminar). Dos hojas (cuerpo completo y especial 2) venían con fondo verde y el resto con magenta. Se recortaron fuera del juego con un script de Python, se limpió el borde verde del recorte, se separaron los cuadros (la ulti, cuatro, por columnas fijas) y se igualó el tamaño entre hojas a ojo comparando cabezas. Quedan 23 cuadros en `assets/ingestrella.png`, con posiciones en `IE_ATLAS` de `game-v4.js`; `assets/ingestrella-face.png` es el retrato.

Asignación por el nombre de cada archivo: reposo y caminar, golpe alto (puño), golpe bajo (golpe bajo y patada baja), agachado, salto y caída, golpeado, derribo, victoria y presentación, especial 2 (lanza código con el teclado, es su proyectil), ulti (teclado, tornado de código, manos arriba con haz de código y laptop con explosión), recarga de energía (llamas y aura) y el haz de código del especial 1 como golpe descendente. La rodada usa el tornado de código.

Faltan en su carpeta una pose de bloqueo y una patada media: la defensa usa el reposo y la patada media el puño. El primer cuadro del especial 1 (orbe de código) y el último (de pie) quedaron sin usar.
