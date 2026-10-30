# Manchester FISI Fighter

Videojuego de peleas 2D con estética de arcade de 16 bits. Versión **0.5**, con Lancha, El Fiel, Kent, Pingordy, Ingestrella y Kike Parker, poderes propios y personajes inspirados en fotografías de referencia.

**[Versión pública](https://jhorka029.github.io/manchester_fighter_fisi/)**

## Presentación y menús 0.5

La intro empieza automáticamente al abrir el juego y muestra los cuatro escenarios y los personajes. **Saltar intro** permanece visible para ir directamente al título con el escudo FISI en pixel art. La música intenta arrancar al cargar; si el navegador restringe el audio automático, se activa con la primera pulsación o clic sin detener la animación.

El recorrido es: título → seleccionar modo **VS** → **VS CPU**, **2 jugadores** o **entrenamiento** → dificultad solo en VS CPU → escenario → personajes. La cuadrícula central permite elegir P1 y su rival; usa **Tab**, los botones P1/CPU o LB/RB del mando para cambiar de selector. Los espacios oscuros están reservados y no son personajes adicionales.

Escenarios: Patio FISI, Entrada UNSM, La cafetería y Plaza de Rioja. Los tres últimos usan las imágenes proporcionadas para esta versión. Las reglas de combate se conservan.

Los recursos están separados en `assets/escenarios/`, `assets/interfaz/` y `assets/personajes/{lancha,el-fiel}/movimientos/`. Cada pose es un PNG individual transparente; `asset-catalog.js` registra sus rutas y alturas originales. Consulta [docs/ASSETS.md](docs/ASSETS.md).

## Cómo jugar

Elige un personaje, selecciona VS CPU, dos jugadores o entrenamiento y pulsa **¡A PELEAR!**. En entrenamiento la energía se mantiene llena para probar los supers.

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
| Rodada / voltereta | ↓ + doble toque ← / → | Igual |
| Doble salto | A / ↑ dos veces | ✕ / ↑ dos veces |
| Agarre | X + B a la vez | □ + ○ a la vez |
| Especial | Y | △ |
| Super | RB | R1 |
| Defensa | LB | L1 |
| Recargar energía (mantener) | LT | L2 |
| Descendente | RT | R2 |
| Pausa / reanudar | Start | OPTIONS |
| Menú (desde la pausa) | Back | SHARE |

Ataques bajos: mantén abajo + puño o patada. En el menú: ← → tu personaje, LT/RT (L2/R2) o Back/SHARE el rival, ↑ ↓ modo, LB/RB (L1/R1) dificultad, A/✕ o Start/OPTIONS para pelear. Con teclado, ← → eliges tú y Q E el rival; con ratón, clic en las tarjetas.

## Incluye

- Seis personajes: Lancha, El Fiel, Kent (patadas de fuego), Pingordy (medialuna y tornado), Ingestrella (código y laptop) y Kike Parker (traje azul, puños y llave presidencial). El menú tiene una fila para elegir tu personaje y otra para el rival, también en 2 jugadores.
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
