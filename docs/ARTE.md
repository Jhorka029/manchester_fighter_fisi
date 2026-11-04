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

`assets/personajes/el-fiel/voltereta-preparacion.png` (preparación agachado) y `assets/personajes/el-fiel/voltereta.png` (salto encogido, invertido, aterrizaje y de pie), ambos sobre fondo magenta. El motor los recorta con `extractRow` y los reproduce en 0,65 s: preparación, salto encogido, invertido en lo alto del arco, encogido al bajar, aterrizaje y de pie. El arco vertical se dibuja elevando el sprite por código.

---

# Kent

Tercer personaje, a partir de 16 imágenes generadas con fondo magenta (más una con fondo beige, una verde y una blanca). Se procesaron fuera del juego con un script de Python: se quita el fondo, se recorta cada pose, se iguala el tamaño entre imágenes (cada una se generó a otra escala, así que se ajustó con la altura del lienzo y a ojo) y se empaquetan 24 poses en `assets/personajes/kent/atlas.png`, ya transparente y guardado al doble del tamaño de juego. Las posiciones están en la constante `KENT_ATLAS` de `game-v4.js`: `[x, y, ancho, alto, ancla horizontal]`.

Poses usadas: guardia (reposo y caminar), puño, patada media, patada baja, golpe bajo, descendente, especial (onda de fuego), super (aura roja, dos cuadros), defensa con brazos cruzados, golpeado, caído, agachado, salto subiendo y bajando, aterrizaje, presentación y victoria, y la voltereta (salto, giro y aterrizaje). `assets/personajes/kent/retrato.png` es el retrato del menú. Sin usar: tres posturas de reposo enojado, la imagen de balón y varios cuadros de guardia repetidos.

---

# Super de El Fiel

`assets/personajes/el-fiel/super.png` contiene cuatro cuadros recortados de una imagen con fondo magenta (dos de levantar el polo y dos de golpe con la estela morada). Se quitaron los rótulos "BACKSWING" y "THE SWING" y los restos de otros cuadros. Las posiciones están en `FIEL_SUPER_ATLAS` de `game-v4.js`. La fila de abajo se dibujó más grande y con los pies cortados por el borde de la imagen, así que se redujo un 13 % y los zapatos aparecen recortados. Durante la super, cada ráfaga muestra el golpe y después vuelve a levantar el polo, alternando las dos variantes.

Tamaños: los sprites de Lancha y El Fiel tienen margen vacío arriba, así que miden unos 217 px visibles aunque su lienzo sea de 258. Kent se escala con `KENT_SCALE` (0,85) para igualarlos.

---

# Pingordy

Cuarto personaje, a partir de 16 imágenes con fondo magenta (carpeta de referencia con el cuerpo completo y 15 hojas de poses). Se recortaron fuera del juego, se separaron los cuadros (la hoja de la ulti se cortó en cuatro por columnas fijas) y se igualó el tamaño entre hojas ajustando por la cabeza y a ojo. Quedan 23 cuadros en `assets/personajes/pingordy/atlas.png`, con las posiciones en `PING_ATLAS` de `game-v4.js`. `assets/personajes/pingordy/retrato.png` es el retrato del menú.

Asignación: reposo y caminar (idle, walk), puño (golpe alto), patada media y especial (medialuna y destello), golpe bajo y patada baja, agachado, defensa, golpeado, caído, salto y caída, presentación (carga de energía) y victoria, ulti (corrida y patada con explosión rosa) y rodada (tornado). Sin usar: dos cuadros de la ulti con notas musicales y estela, y el cuadro de la caída hacia atrás. La patada aérea (tercer cuadro de la ulti) se volvió a recortar con la pierna completa: su zapato llegaba hasta la zona del cuadro siguiente y se había cortado; para separarlo de la explosión roja se conservó solo la parte oscura (pantalón y zapato) y la estela rosa.

El puño agachado de Pingordy (S + puño) usa su propio cuadro, en cuclillas con el puño extendido (`lowPunch` del atlas). Faltan poses y usan la más cercana: el golpe descendente usa el puño, el agachado golpeado usa el golpeado, y el aterrizaje usa el agachado.

---

# Salto de Lancha

`assets/personajes/lancha/salto-doble.png` trae cinco cuadros recortados de una hoja de salto: agacharse, subida con el puño en alto, picada en el aire, aterrizaje de panza y caída. Se usan en el salto normal (subida y caída), el doble salto (picada y aterrizaje de panza) y el aterrizaje (agacharse). Los ataques en el aire y el resto de sus poses siguen usando el atlas original.

---

# Paso lunar de Pingordy

El dash de Pingordy usa cinco cuadros propios de paso lunar (`moon0` a `moon4`, de una hoja con las piernas cruzándose); si faltaran, cae a los tres pasos de caminar (`walkA`, `walkC`, `walkB`). Se desliza más lento que el dash normal, mirando al rival, con los pasos en orden normal al ir hacia atrás y al revés al ir hacia delante, una leve inclinación hacia atrás, un pequeño rebote y estela. Los valores propios están en `DASH_CHAR` de `game-v4.js`. Los dos primeros cuadros de la hoja se tocaban por los zapatos y se separaron con un corte vertical. Es la segunda versión de la hoja, que sustituye a la primera.

# Estándar de poses

El archivo `D:\imagenes videojuego\Movimimientos standar.txt` define el conjunto de poses que debe tener cada personaje: reposo (2), caminar (3), agacharse, salto, caída del salto, bloqueo, recarga de energía (2), golpe básico alto (3), dos ataques especiales (3 cada uno), ulti (4), daño recibido, derribo (2) y victoria (2).

---

# Recarga de Lancha

`assets/personajes/lancha/recarga.png` trae cuatro cuadros recortados de una hoja con fondo magenta: agarra la hamburguesa, muerde, mastica con la mano en la barriga y sube los brazos con destellos. Durante la recarga se muestra primero el primero y luego se repiten morder, masticar y subir los brazos. Posiciones en `LC_ATLAS` de `game-v4.js`.

Kent usa sus dos cuadros de puños con grito (los mismos del golpe descendente) y Pingordy sus dos cuadros de carga con llamas y aura (los mismos de la presentación). El Fiel usa dos cuadros propios (`assets/personajes/el-fiel/recarga.png`): en cuclillas con los puños y la lengua afuera, uno con los ojos cerrados y otro riendo; se alternan unas 6 veces por segundo. Sustituyen a una primera versión de tres cuadros cuyos zapatos se tocaban y quedaban recortados. Con la barra llena la animación continúa mientras se mantiene el botón. El aura y las partículas se dibujan por código con el color de cada personaje.

---

# Ingestrella

Quinto personaje, a partir de 15 imágenes de la carpeta `inge.estrella` (cuerpo completo, agachado, dos especiales, caída del salto, victoria, derribo, golpes alto y bajo, golpeado, reposo, recarga de energía, salto, ulti y caminar). Dos hojas (cuerpo completo y especial 2) venían con fondo verde y el resto con magenta. Se recortaron fuera del juego con un script de Python, se limpió el borde verde del recorte, se separaron los cuadros (la ulti, cuatro, por columnas fijas) y se igualó el tamaño entre hojas a ojo comparando cabezas. Quedan 23 cuadros en `assets/personajes/ingestrella/atlas.png`, con posiciones en `IE_ATLAS` de `game-v4.js`; `assets/personajes/ingestrella/retrato.png` es el retrato.

Asignación por el nombre de cada archivo: reposo y caminar, golpe alto (puño), golpe bajo (golpe bajo y patada baja), agachado, salto y caída, golpeado, derribo, victoria y presentación, especial 2 (lanza código con el teclado, es su proyectil), ulti (teclado, tornado de código, manos arriba con haz de código y laptop con explosión), recarga de energía (llamas y aura) y el haz de código del especial 1 como golpe descendente. La rodada usa el tornado de código.

Faltan en su carpeta una pose de bloqueo y una patada media: la defensa usa el reposo y la patada media el puño. El primer cuadro del especial 1 (orbe de código) y el último (de pie) quedaron sin usar.

---

# Agarre de Pingordy

Tres cuadros propios (`grabReach`, `grabHold`, `grabEnd` en `assets/personajes/pingordy/atlas.png`): alcanza con los brazos, agarra y jala con los brazos cruzados, y termina en guardia. Se usan en las tres fases de su suplex: durante la preparación y el contacto del agarre (alcanzar), mientras levanta y lanza al rival en arco (agarrar y jalar, con la inclinación hacia atrás que ya tenía la llave) y al recuperarse (guardia); si el agarre falla, vuelve a la guardia. La coreografía del rival y los tiempos no cambiaron. Kent e Ingestrella siguen usando poses provisionales (puño y golpe descendente) en su agarre.

---

# Agarre al aire y paso lunar con patada de Pingordy

**Agarre al aire** (`airReach`, `airClutch`, `airLift`, `airLaunch`, `airEnd`): si el rival está saltando a menos de unos 100 px y a menos de 200 px de altura, J + K lo agarra en vez de fallar. Pingordy alcanza, aprieta, levanta y salta con los brazos arriba mientras el rival sube hasta unos 300 px girando y cae delante de él, con 14 de daño y derribo. Dura unos 0,98 s y se puede escapar igual que el agarre normal. Solo lo tiene Pingordy, porque es el único con cuadros para ello (`SETS[3].airGrab`).

**Paso lunar con patada** (`ml0` a `ml6`, de una hoja con fondo verde y niebla): su especial (L) retrocede unos 95 px con el paso lunar durante 0,45 s (los seis primeros cuadros, con gestos de Michael Jackson) y termina con el cuadro de la patada alta, lanzando el mismo proyectil de siempre. Es el movimiento `moonKick`; agachado sigue usando la ráfaga baja de todos los personajes.

Los dos primeros cuadros de la hoja del agarre al aire se tocaban y se separaron con un corte escalonado; los cuadros de paso lunar vienen de otra hoja a menor escala y se igualaron por altura (217 px).

---

# Suplex tornado de Pingordy

En el agarre en el suelo, Pingordy ya no se inclina hacia atrás: tras alcanzar al rival lo sostiene delante mientras gira como un tornado (cuadro del tornado, aplanado y volteado rápido para dar la vuelta) y el rival gira con él; justo después lo lanza hacia arriba (hasta unos 300 px, con vuelta completa) y cae delante de él, con 14 de daño y derribo. Es la misma trayectoria del agarre al aire, que conserva sus cuadros propios (alcanzar, apretar, levantar, lanzar y recuperar). La secuencia dura unos 0,98 s y se puede escapar con J + K como siempre.

Hoja del paso lunar con patada: se recortó quitando el fondo verde y la niebla por color (el pantalón y los zapatos negros se distinguen del fondo verde); los dos últimos cuadros se tocaban y se separaron por el color de la manga. La hoja anterior con fondo negro se descartó porque el pantalón negro se confundía con el fondo.

---

# Kike Parker

Sexto personaje, a partir de 15 imágenes de la carpeta `kikeparker` (cuerpo completo sobre fondo verde y el resto sobre magenta). Se recortaron fuera del juego con un script de Python, se separaron los cuadros (la ulti, cuatro, por columnas fijas, y se limpiaron restos de los cuadros vecinos) y se igualó el tamaño a ojo con el resto (reposo de unos 219 px). Quedan 25 cuadros en `assets/personajes/kike-parker/atlas.png`, con posiciones en `KP_ATLAS` de `game-v4.js`; `assets/personajes/kike-parker/retrato.png` es el retrato (con un leve borde verde del recorte).

Asignación por el nombre de cada archivo: reposo, caminar (tres pasos), golpe alto (puño), golpe bajo (golpe bajo con la mano al suelo, es su patada baja y su golpe bajo), agachado, bloqueo (pose propia), salto y caída, golpeado, derribo, victoria y presentación, especial 1 (ráfaga con la mano extendida), especial 2 (se inclina y empuja, es el golpe descendente y su preparación), ulti (multigolpe con los puños fantasma y el empuje final) y recarga de energía (aura rosa y aura eléctrica).

Su patada media (K) usa cuatro cuadros propios (`kickUp`, `kickHit`, `kickKnee`, `kickEnd`: rodilla arriba, patada, rodilla de nuevo y guardia). Faltan en su carpeta: patada aérea, voltereta y agarre propios. Usa las poses de salto en el ataque aéreo y en la voltereta (con el arco por código), y las poses provisionales de los demás en la llave. Sus especiales 1 y 2 tenían tres cuadros cada uno; solo se usan los del medio y el descendente. El cuadro "recarga de energía" solo tiene dos cuadros y los alterna.

---

# Público

El público ya no son siluetas: `assets/publico/espectadores.png` es un atlas de 21 espectadores en pixel art (camisetas moradas y lilas, de distintos tamaños y poses, incluidos uno agachado y un grupo de dos). Salieron de una hoja de dos filas de personas sobre fondo blanco con sombras. Para recortarlos se borró el fondo por inundación desde los bordes (así desaparecen también las sombras y los huecos entre las piernas), se cortó a mano la pareja que se tocaba y se igualó la altura de las dos filas, que venían a distinta escala.

En el juego (`drawCrowd`, `CROWD_STAGES` y `SPECT_ATLAS` en `game-v4.js`) hay dos filas: la de atrás, más pequeña y oscurecida, y la de delante, con un leve tinte morado para que no compitan con los luchadores. La disposición es distinta en cada escenario porque la perspectiva y los objetos cambian: línea de suelo (`base`), tamaño (`k`), separación, huecos al azar (`gap`, para que no sea una pared) y zonas sin gente (`skip`). Patio: pared completa. Entrada: sobre el pavimento, más pequeña y con huecos. Cafetería: unas 20 personas, pequeñas y a la escala del mostrador, solo en el suelo frente a él (no delante del refrigerador, el congelador ni las estanterías). Plaza: a los lados, dejando libre el centro para que se lea "RIOJA" en la fuente. Cada espectador es uno de los 21, algunos volteados. Siguen el entusiasmo de la pelea (`hype`): se balancean siempre y saltan más cuanto más entusiasmo. La foto de grupo que acompañaba a la hoja no se usa. El tamaño general de los espectadores se controla con `CROWD_SCALE` (1,15: unos 120 px de alto los de la fila delantera del patio).

---

# Cárdenas

Séptimo personaje, a partir de 16 imágenes de la carpeta `cardenas` (cuerpo completo sobre fondo verde y el resto sobre magenta). Se recortaron con un script de Python que separa los cuadros por filas y columnas; el especial 2 (dos cuadros pegados) y la ulti (tres pegados y un globo de texto "¡ESTO NO ES UN EXAMEN!" suelto) se cortaron a mano por columnas y se descartó el globo. El tamaño se igualó a ojo con el resto. Quedan 23 cuadros en `assets/personajes/cardenas/atlas.png` (posiciones en `CD_ATLAS` de `game-v4.js`) y `retrato.png`.

Asignación por el nombre de cada archivo: reposo, caminar (cuatro pasos propios, `walkSeq`), golpe alto (puño), golpe agachado (su golpe bajo), golpe bajo (patada baja, arrodillado), agachado, bloqueo, salto y caída, golpeado, derribo, victoria y presentación (la calculadora), especial 1 (tijeras de podar, es su proyectil), especial 2 (exámenes y la torta, es el golpe descendente y su preparación), ulti con los cinco cuadros de la hoja nueva en orden (brazos cruzados, exámenes volando, el árbol, las tijeras y la pizza con la calculadora) y el globo "¡ESTO NO ES UN EXAMEN!" aparte (`bubble`) y recarga de energía (se duerme con "zz" y brilla con "zZZ").

Su patada media (K) usa el cuadro de la patada nueva (`mid`), su giro es una rodada con cuatro cuadros propios (agachado con las manos al suelo, de cabeza, hecho bola que gira por código, y de pie corriendo; `rollSeq`) y la ulti muestra el globo de texto. Faltan en su carpeta: patada aérea y agarre propios. Usa las poses de salto en el ataque aéreo y poses provisionales en la llave.

# Pepelucho

Octavo personaje, a partir de 20 imágenes de la carpeta `pepelucho` (todas sobre magenta; la hoja de la patada media mide 3584 px de ancho). Mismo proceso; el especial 2 (la escuadra) tenía dos cuadros pegados y se cortó por columnas; la ulti trae seis cuadros en dos filas. Quedan 29 cuadros en `assets/personajes/pepelucho/atlas.png` (posiciones en `PP_ATLAS`) y `retrato.png` (se le quitó el borde magenta).

Asignación: reposo, caminar (tres pasos), golpe alto (puño), golpe bajo puño (agachado), golpe bajo (patada baja), agachado, bloqueo, salto y caída, golpeado, derribo, victoria, especial 1 (en moto, es su proyectil), especial 2 (la escuadra gigante, es el descendente), patada media (rodilla, patada y guardia; su K), patada alta (su ataque aéreo), agarre (alcanzar, el giro con estela y el final), ulti con toda la secuencia: llega en moto, patea la moto (cuadro de la patada de la imagen nueva, `motoKick`), la moto sale volando girando por la pantalla (`motoFly`, dibujada por código), lanza los exámenes (`papers1`, `papers2`) y termina con la mano en el pecho (`ultiEnd`) y recarga de energía (llamas azules con fórmulas).

Su giro (S + doble toque, o L3 con el mando) es subirse a su moto: se agacha, pasa montado en la moto a través del rival, que no lo empuja, y se baja al otro lado (`rollSeq` en `SETS`).

---

# Ulti, patada y giro de Cárdenas (versión 2)

La ulti se recortó de una hoja nueva con cinco cuadros y un globo de texto. Los cuadros se solapan en la hoja original (un pie de uno cae bajo el otro, las estelas cruzan), así que un corte recto no bastaba: cada uno se recortó con reglas escalonadas que siguen la unión con el vecino, y las estelas blancas y violetas, las hojas de las tijeras y las líneas de velocidad se asignaron por color al cuadro al que pertenecen. Los trozos sueltos pequeños se descartan. Queda una línea mínima de un cuadro vecino en el borde del cuadro de las tijeras. El globo "¡ESTO NO ES UN EXAMEN!" no va pegado al personaje: se dibuja por código (`drawBubble`) al lado de la cabeza, del lado contrario al rival, durante el inicio de la ulti (incluida la cinemática de acercamiento), porque encima de la cabeza lo tapaba el marcador de vida y el reloj. Se desvanece al cabo de un segundo. Los cuadros verdes de la patada y el giro se despillaron: se quitó el halo verde del borde y el verde que se veía a través de los lentes.

Tamaño del giro de Cárdenas: los cuatro cuadros se escalaron comparando el tamaño de su cabeza con la del reposo (a 1,16 la cabeza medía un 27 % más y por eso se veía que se agrandaba al rodar; ahora 0,9). La bola de la rodada mide unos 164 px, menor que el personaje de pie, que es lo normal en una pose encogida.

---

# Joshi

Noveno personaje, a partir de las imágenes sueltas de `D:\imagenes videojuego\Joshi` (caminar, golpe básico, patada, golpe bajo, patada agachado, lanzamiento de onda y bajo, ascendente, agacharse, bloqueo, recibir daño, cuando lo tumban, cuando gana, agarrando, salto con patada, giro y salto) y `ulti_joshi.jpg` (4 cuadros de la ulti). La hoja antigua `joshi_frames.jpeg` ya no se usa. Todas van sobre magenta; se quitó el fondo por color y el reborde rosa, se separó cada cuadro por columnas y se descartaron los balones sueltos de las imágenes con movimiento borroso. La escala se igualó por el tamaño de la cabeza (reposo 217 px, como Lancha). Quedan 47 cuadros en `assets/personajes/joshi/atlas.png` (posiciones en `JO_ATLAS`) y `retrato.png`.

Asignación: reposo (la guardia con el balón), caminar (nueve cuadros con el balón rebotando, de `walk0` a `walk8`; `walkRate` fija la velocidad), golpe alto (puño), patada media (rodilla, patada y guardia; su K), agachado, golpe bajo puño, patada baja, especial (preparar y lanzar el balón; el balón de colores se dibuja por código), especial agachado (S + L, cuadros propios), descendente (balón sobre la cabeza, golpe con llamas y, al final, el cuadro de la caída en picada `ulti4`, `overheadEnd`), patada aérea, bloqueo, golpeado, caída en el aire y derribo, victoria (tres cuadros que se alternan), agarre (alcanzar, apretar, levantar y brazos arriba para el agarre al aire) y ulti (`ulti0` a `ulti5`: guardia, patada alta, puñetazo, salto con el balón arriba, caída en picada y el mate final contra el suelo con polvo; los dos últimos vienen de `joshi_frame_de_ulti_penultimo` y `joshi_utli_frame_final`, sobre verde). La recarga usa los 3 cuadros de `joshi_cargando_Aura.png` (`charge0` a `charge2`, escalados para que la cabeza mida igual que en reposo y no se encoja: girando el balón en el dedo, aura de llamas y aura plena con rayos; el primero aparece al empezar y luego alternan los dos últimos). El salto usa la rodilla arriba y el cuadro agachado al aterrizar (provisional: las imágenes de salto y giro salieron con cuadros fantasma translúcidos y se espera una versión limpia). El giro usa tres cuadros de `joshi_girando.jpg` (`rollSeq`), que se pueden sustituir.

## Kike Parker: especial 1 con tigrillo

El especial (L) ya no lanza un proyectil. Es un golpe de corto alcance (movimiento `tiger` en `MOVES`: alcance 160 px frente a 112 del puño y 145 de la patada media, 12 de daño, 18 de energía; también sale agachado). Usa `assets/personajes/kike-parker/especial.png` (posiciones en `KT_ATLAS`), hecho a partir de dos imágenes sobre magenta: tres cuadros de Kike (`kA` preparando, `kB` con la mano abierta y `kYawn` bostezando mirando el reloj) y el puñetazo con el tigre de fuego (`tiger`). La secuencia (`tigerSeq`) es `kA` > `tiger` (en medio, durante el golpe) > `kB` > reposo. El cuadro `kYawn` se sustituyó por `gYawn` y se quitó del atlas.

## Kike Parker: agarre con tigrillo

El agarre (J + K) usa cinco cuadros de `especial.png` (de `58.jpg` y `60.jpg`, sobre verde): `gReach` (alcanza con los dos puños), `gHold` (se agacha para apretar), `gThrow` (lanza al rival hacia arriba con los brazos arriba), `gTiger` (gancho con el tigre de fuego mientras el rival sube por el aire) y `gYawn` (bosteza mirando el reloj mientras el rival cae). Como el golpe del tigre debe darse con el rival en el aire, la llave de Kike usa el lanzamiento hacia arriba (`upThrow` en `SETS[5]`, con los cuadros de `airGrab`) y no el lanzamiento de lado; el rival sube a 300 px, cae y recibe 14 de daño. En el fallo de agarre solo se ven `gReach` y `gHold`.

# Ingestrella: imágenes nuevas

Se volvió a extraer toda la carpeta `D:\imagenes videojuego\inge.estrella` (las 15 imágenes anteriores salieron idénticas) y se añadieron tres imágenes nuevas: `estrella_patada_media` (rodilla, patada y guardia; es su K, `midKick`), `esstrella_GOLPE_BAJO_PUÑO` (puño agachado, `lowPunch`) y `estrella_agarre` (alcanza, aprieta la carpeta FISI, la lanza y queda con papeles en el suelo; `grab`, con tiempos por edad). Las hojas del golpe bajo y del agarre tenían los cuadros pegados y se cortaron con cortes escalonados. Atlas: `assets/personajes/ingestrella/atlas.png` (posiciones en `IE_ATLAS`, 31 cuadros).

# Guichard

Décimo personaje, a partir de 21 imágenes de `D:\imagenes videojuego
ichardimbecildemierda` (todas sobre magenta; las cinco de la ulti son imágenes sueltas de 1024 x 1024). Mismo proceso: se quita el fondo por color, se agrupan los componentes por columnas (k-means) y los cuadros pegados (la risa con su explosión y la victoria en moto) se cortaron a mano con cortes escalonados. La escala se igualó por el tamaño de la cabeza (reposo 217 px, como Lancha; la ulti se escaló a 0,23 y los cuadros en moto a 0,49). Quedan 35 cuadros en `assets/personajes/guichard/atlas.png` (posiciones en `GU_ATLAS`) y `retrato.png`, que se hizo a partir del reposo porque no hay foto real (el resto de luchadores usa `retrato-real`).

Asignación: reposo, caminar (tres pasos), puño (golpe alto), agachado y bloqueo agachado (cuadro propio), bloqueo, salto y caída, patada aérea, golpeado, caída en el aire y derribo, recarga durmiendo de pie con los brazos cruzados (cuatro cuadros: ojos cerrados, cabeza ladeada, zzz y ZZZ; `chg0` a `chg3`), especial 1 (L: carga una pila de papeles, los lanza y los suelta arrugados; los papeles volando se dibujan por código como proyectil a 155 px de altura), especial 2 (U: se agarra el pecho, carcajada con explosión de "¡JAJAJAJA!" y se seca las lágrimas; usa `overheadEnd` como final), ulti (`u1` a `u5`: mira el celular, llegan sus amigos, atacan en grupo, celebran y su risa final con onda de energía) y victoria en moto (`bike0` a `bike2`: festeja, se cae y queda bajo la moto).

Añadidos después (tres imágenes nuevas, `richard_golpe_bajo`, `richard_patada_baja` y `richard_giro_gatear`): golpe bajo con puño (`lowPunch`, agachado), patada baja (`sweep`, con la estela de la patada) y el giro, que es gatear con cinco cuadros (`gat0` a `gat4`; `rollSeq`: agacharse > gatear > de pie). La escala se igualó otra vez por el tamaño de la cabeza (gatear 0,34, patada baja 0,23).

Patada media (K): cuadro propio de `richard_patada_normal` (`kick`, cabeza a la misma escala que el reposo; la secuencia es reposo > patada > reposo). Sin cuadros propios (provisionales): agarre (usa puño y bloqueo). Es estudiante: se puede elegir de héroe en el modo Batalla. Falta la foto real para el avatar (ahora usa un retrato hecho del reposo).

Guichard, ajuste del giro: el gateo ya no hace el pequeño salto de arco que tenía la voltereta (`arc` 0 en su entrada de `ROLL`); ahora se desliza a ras de suelo con los cinco cuadros. Se comprobó que la elevación máxima es 0.

# Adriano

Undécimo personaje, a partir de 21 imágenes de `D:\imagenes videojuego\gaydriano` (los archivos se llaman `adriano_*`; en el juego se llama ADRIANO, que se puede cambiar en `NAMES`). Todas sobre magenta. Mismo proceso; las hojas con los cuadros pegados (caminar, agarre y recarga) se cortaron con cortes por columnas y se limpiaron los restos del cuadro vecino. Como el generador dibuja cada hoja a un tamaño distinto, la escala se igualó a ojo y por la altura del cuerpo (reposo 217 px; especial 1 a 0,47, ulti a 0,45-0,50). Quedan 49 cuadros en `assets/personajes/adriano/atlas.png` (posiciones en `AD_ATLAS`) y `retrato.png`, que se hizo del reposo porque no hay foto real.

Asignación: reposo, caminar (4 pasos), puño, patada media (rodilla, patada, guardia; su K), golpe bajo agachado (`lowPunch`), patada baja, agachado, bloqueo, salto y caída, puño y patada aérea, golpeado, caída en el aire y derribo, recarga (4 cuadros con aura de fuego y el letrero), especial 1 (L: la integral; prepara, lanza y baja los brazos), especial 2 (U: un dron lo carga, vuela y baja con una rodillada; usa `overheadPrep` > `overheadFly` > `overheadHit` > `overheadEnd`), agarre (4 cuadros con ecuaciones; la llave se llama ¡LÍMITE AL INFINITO!), ulti (4 cuadros: aura de ecuaciones, embestida, salto con drones y golpe al suelo) y victoria (4 cuadros, el último con el letrero APROBADO). El proyectil del especial usa los 5 cuadros de `animacion_de_proyectiles` (una bola que crece hasta un cometa de fórmulas, `proy0` a `proy3`, y la explosión `proyHit` que todavía no se usa) y sale a 150 px de altura, a la altura de su mano.

Sin giro propio: usa un salto (agacharse, salto, caída). Es estudiante: se puede elegir de héroe en Batalla.

Adriano, ajustes: (1) se reescalaron por la cabeza los cuadros que se veían más chicos (recarga a 0,34-0,36, especial a 0,41, descendente a 0,40-0,43) y los que se veían más grandes (bloqueo, patada aérea, agachado); (2) puño agachado y ráfaga agachada con cuadros propios (`gaydriano_golpe_agachado` y `adriano_rafada_agachado`, 2 x 2 cuadros cada una): `lowPunch` y `specialPrepLow` > `specialLow` > `specialEndLow`; la ráfaga agachada sale a 116 px de altura; (3) el descendente (U) ahora dura 0,66 s de preparación: en ese tiempo un dron dibujado por código (`drawOrbitDrone`) gira alrededor de él en una elipse mientras él está en guardia y, al final, se coloca a su espalda para la rodillada (cuadro `overheadHit`).

# Rucoba

Duodécimo personaje, a partir de 18 imágenes de `D:\imagenes videojuegoucoba` (el docente de bases de datos, con un taco de billar). Casi todas sobre magenta; la hoja de la ulti viene sobre rosa claro y la de caminar sobre magenta oscuro con números de cuadro (se descartaron). El fondo se quitó por color respecto a las esquinas de cada imagen (en la ulti con un umbral bajo para no borrar el polo blanco) y se separaron los cuadros por columnas y filas. Quedan 48 cuadros en `assets/personajes/rucoba/atlas.png` (posiciones en `RU_ATLAS`) y `retrato.png`, que se hizo del reposo porque no hay foto real. La escala se igualó por la cabeza con el reposo (217 px); el caminar y la ulti vienen mucho más pequeños en su hoja (0,59 y 0,62-0,70).

Asignación: reposo, caminar (8 cuadros, `walkRate` 12), puño, patada media (rodilla, patada, guardia; su K), golpe bajo y patada baja, agachado, bloqueo, salto y patada aérea, golpeado, caída y derribo, especial (L: apunta con el taco, dispara y baja el taco; la bola 8 con ceros y unos se dibuja por código y sale a 150 px de altura), descendente (U: clava el taco con una onda de código), agarre (4 cuadros: alcanza, ataca con el taco, explosión DROP/DELETE y final), ulti "DROP DATABASE" (8 cuadros: taco con código, bolas 8, triángulos de ERROR y explosión final; `superStep` 0,19 s para que entren los 8 en el super) y recarga (5 cuadros con la ciudad y bases de datos). La victoria usa los dos cuadros de limpiar el taco.

Sin giro propio (usa un salto) ni cuadro de caída en el aire distinto del salto. Es docente: no se puede elegir de héroe en Batalla y entra en la campaña como rival.
