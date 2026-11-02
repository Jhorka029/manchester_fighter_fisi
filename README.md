# Manchester FISI Fighter

Videojuego de peleas 2D con estética de arcade de 16 bits. Versión **0.7**, con Lancha, El Fiel, Kent, Pingordy, Joshi, Ingestrella, Kike Parker, Cárdenas y Pepelucho, poderes propios y personajes inspirados en fotografías de referencia.

Tamaños uniformes en VS, selección e intro, y siete retratos fotográficos originales nuevos. [Detalles de retratos y presentación](docs/RETRATOS-0.7.md).

La revisión 0.7 añade vida individual de una a cinco barras en VS, ropa alternativa en duelos espejo y el modo **Batalla**: cinco estudiantes elegibles, ocho rivales con dificultad progresiva, escenarios al azar, continuaciones y final con trofeo JAVA. Incluye 40 cruces con voz y 52 audios nuevos. [Reglas, controles y progresión](docs/MODOS-0.7.md).

Esta revisión añade siete escenarios, créditos, auspicio de Core FK y música del usuario para menús y combate. La intro cambia de escenario cada segundo con acercamiento y fundido. El menú «Mezcla de audio» permite ajustar música y efectos por separado. Se requiere una primera tecla o clic si el navegador bloquea el audio automático. Ver [detalles de la revisión](docs/PRESENTACION-0.6.md).

**[Jugar versión 0.7](https://jhorka029.github.io/manchester_fighter_fisi/)**

## Presentación y menús 0.6

La intro empieza automáticamente al abrir el juego y muestra los créditos, Core FK, los siete escenarios y los nueve personajes. **Saltar intro** permanece visible para ir directamente al título con el escudo FISI en pixel art. La música intenta arrancar al cargar; si el navegador restringe el audio automático, se activa con la primera pulsación o clic sin detener la animación.

El recorrido VS es: título → seleccionar modo **VS** → **VS CPU**, **2 jugadores** o **entrenamiento** → dificultad solo en VS CPU → escenario → personajes. La cuadrícula central permite elegir P1 y su rival; usa **Tab**, los botones P1/CPU o LB/RB del mando para cambiar de selector. Q/E o X/Y ajusta sus barras de vida. En **Batalla** se elige únicamente al estudiante; escenario, rival y dificultad siguen la progresión del torneo. Los espacios oscuros están reservados y no son personajes adicionales.

Escenarios: Patio FISI, Entrada UNSM, La cafetería, Plaza de Rioja, Loza UNSM, Kokobombo - Fiesta Cachimbo y FISI. Los fondos nuevos usan las referencias proporcionadas, con Kokobombo y FISI adaptados a pixel art.

Los recursos están separados en `assets/escenarios/`, `assets/interfaz/`, `assets/audio/` y carpetas por personaje en `assets/personajes/`. Lancha y El Fiel conservan poses PNG individuales; los demás usan sus propios atlas. Consulta [docs/ASSETS.md](docs/ASSETS.md).

## Cómo jugar

Elige un personaje, selecciona VS CPU, dos jugadores o entrenamiento y pulsa **¡A PELEAR!**. En entrenamiento la energía se mantiene llena para probar los supers.

La muestra de confirmación se usa al iniciar desde el título, confirmar los luchadores y aceptar una continuación en Batalla. Al recorrer cuadros suena un efecto original breve y agudo; al retroceder, otro descendente. Cada ronda reinicia la orientación hacia el rival y conserva su escala corporal. Una ulti no se interrumpe con golpes o agarres: se bloquea con defensa. Si ambos activan una ulti juntos, aparece un choque de pulsaciones: P1 pulsa I, P2 pulsa 0 del teclado numérico (RB/R1 con mando). Sólo el ganador libera la ulti; ambos gastan energía. [Reglas y detalles](docs/REGLAS-COMBATE-0.6.md).

| Acción | Jugador 1 |
| --- | --- |
| Mover | A / D |
| Saltar | W |
| Agacharse | S |
| Defender de pie / agachado | H / S + H |
| Puño alto / patada media | J / K |
| Puño bajo / patada baja | S + J / S + K |
| Descendente | U |
| Ataque aéreo | W y luego J / K |
| Esquive (dash) | A A / D D (doble toque) |
| Rodada (Lancha) / voltereta (El Fiel) | S + A A / D D (doble toque hacia el rival) |
| Doble salto | W W (segundo toque en el aire) |
| Agarre (no se bloquea) | J + K a la vez, de cerca |
| Golpe cargado (rompe la guardia) | Mantén U |
| Contraataque desde el bloqueo (25 energía) | J o K mientras bloqueas un golpe |
| Levantarse tras un derribo | ← / → rodar · J / K golpe · nada: en el sitio |
| Ráfaga baja (El Fiel) | S + L |
| Dash aéreo (El Fiel) | Doble toque ← / → en el aire |
| Especial / super | L / I |
| Recargar energía (mantener) | O |
| Pausa / menú | Esc / R |

Jugador 2: flechas y teclado numérico (1 alto, 2 medio, 1 + 2 agarre, 3 especial, 0 super, 4 defensa, 5 descendente, 6 recargar). La guía bajo la arena explica las defensas y los controles de mando.

### Mando (Xbox / PlayStation)

Funciona con cualquier mando de mapeo estándar del navegador (Xbox, DualShock 4, DualSense). El primer mando conectado es el Jugador 1 y el segundo, el Jugador 2. Si no responde, pulsa un botón con la página enfocada; el indicador de la cabecera confirma que lo detectó.

| Acción | Xbox | PlayStation |
| --- | --- | --- |
| Mover / agacharse / saltar | Stick o cruceta (← → ↓ ↑) | Igual |
| Saltar | A (o ↑) | ✕ (o ↑) |
| Puño alto | X | □ |
| Patada media | B | ○ |
| Esquive (dash) | Doble toque ← / → | Igual |
| Rodada / voltereta | ↓ + doble toque ← / →, o L3 | Igual, o L3 (pulsar el stick izquierdo) |
| Doble salto | A / ↑ dos veces | ✕ / ↑ dos veces |
| Agarre | X + B a la vez, o R3 | □ + ○ a la vez, R3 o clic del panel táctil |
| Especial | Y | △ |
| Super | RB | R1 |
| Defensa | LB | L1 |
| Recargar energía (mantener) | LT | L2 |
| Descendente | RT | R2 |
| Pausa / reanudar | Start | OPTIONS |
| Selección de personaje (como R) | Back | SHARE |

Ataques bajos: mantén abajo + puño o patada. En el menú: ← → tu personaje, LT/RT (L2/R2) o Back/SHARE el rival, ↑ ↓ modo, LB/RB (L1/R1) dificultad, A/✕ o Start/OPTIONS para pelear. Con teclado, ← → eliges tú y Q E el rival; con ratón, clic en las tarjetas.

## Incluye

- Público de espectadores en pixel art que salta con la intensidad de la pelea.
- Nueve personajes (Joshi, jugador de básquet: lanza balones, su ulti es el "Combo de cancha" con un mate final; Cárdenas duerme para recargar y su ulti es "Esto no es un examen"; Pepelucho lanza una moto y una escuadra gigante). Los primeros seis: Lancha, El Fiel, Kent (patadas de fuego), Pingordy (medialuna y tornado), Ingestrella (código y laptop) y Kike Parker (traje azul, puños y llave presidencial). El menú tiene una fila para elegir tu personaje y otra para el rival, también en 2 jugadores.
- Combate por rondas, tres dificultades de CPU y modo local de dos jugadores.
- Ataques altos, medios, bajos, descendentes y aéreos.
- Salto y patada aérea con poses distintas; patada baja sin derribo.
- Los poderes a distancia se esquivan saltando en el momento justo; la guardia se mantiene mientras sostienes defensa.
- Recarga de energía para todos los personajes: mantén el botón quieto en el suelo; se corta con un golpe o al moverte; con la barra llena la animación sigue mientras mantengas el botón.
- Esquive con dash (doble toque): invulnerable 0,16 s y 0,6 s de espera. El de Pingordy es un paso lunar (moonwalk), más lento: 0,36 s y 0,2 s de invulnerabilidad.
- Presentaciones de personajes y supers con cámara, aura, oscuridad y rayos.
- Cámara que sigue la pelea y botón para suavizar los efectos.
- Entrenamiento configurable y visualización de zonas de impacto.
- Pantalla VS animada antes del combate y pantalla de victoria con frase, confeti y estadísticas.
- KO cinemático: cámara lenta, zoom, destello y el perdedor sale despedido rebotando. Aviso de PERFECT y ¡TIEMPO!
- El descendente, el barrigazo y el último golpe del super derriban.
- Chispas según el golpe (puño, patada, bloqueo, especial), partículas con gravedad, polvo al caminar, esquivar y caer, y deformación al saltar y aterrizar.
- Contador de combos lateral, barras de vida que tiemblan y parpadean con poca vida, aviso de ¡PRIMER GOLPE! y cortinillas entre rondas.
- Público que salta con la emoción del combate y focos de color durante los supers.
- Agarres de cerca que atraviesan el bloqueo, con llave propia: Lancha rebota al rival con la barriga y lo revienta delante (¡BARRIGA BOMBA!); El Fiel hace un suplex en puente y lo clava detrás con un rayo (¡SUPLEX FIEL!). Se escapan pulsando J + K justo al ser agarrado; fallar el agarre deja expuesto.
- ¡COUNTER! al golpear a un rival que está atacando: más daño y aturdimiento.
- Barra de mareo bajo la vida: muchos golpes seguidos sin defenderte te dejan mareado 2 s.
- Rebote en la pared: un golpe fuerte cerca del borde hace rebotar al rival y permite seguir golpeándolo en el aire.
- El barrigazo de Lancha tiene armadura: aguanta un golpe sin interrumpirse.
- El barrigazo y el super de Lancha anulan la ráfaga de El Fiel.
- Música chiptune generada en tiempo real (botón ♪ Música) y golpes con ruido filtrado.

## Ejecutar y editar localmente

Es un sitio estático, sin dependencias de compilación. Sirve la carpeta con un servidor local, por ejemplo:

```sh
python -m http.server 8000
```

Abre `http://localhost:8000/`. Usa un servidor local para permitir el procesamiento de sprites en Canvas.

`game-v4.js` conserva el motor de combate. `frontend.js` y `frontend.css` implementan la presentación y selección, `responsive.css` adapta la página a móvil y tablet, y `asset-catalog.js` registra los recursos. El nombre histórico del motor no altera la versión 0.5.

Para generar un único HTML que funcione sin servidor ni conexión:

```sh
node build.cjs
```

El resultado se guarda en `dist/Manchester-FISI-Fighter-v0.5.html`. No requiere paquetes de Node adicionales.

## Publicación

GitHub Pages sirve la raíz de la rama `main`. `.nojekyll` indica que los archivos deben publicarse directamente. Los cambios enviados a `main` actualizan el sitio.

La verificación de la versión está en [docs/VERIFICACION.txt](docs/VERIFICACION.txt) y las notas de creación de recursos en [docs/ARTE.md](docs/ARTE.md).

Demo para navegador de ordenador, con mando probado en DualShock 4; la adaptación a Android y R36S queda pendiente.
