# Manchester FISI Fighter

Videojuego de peleas 2D con estética de arcade de 16 bits. Versión **0.4**, con Lancha, El Fiel, Kent y Pingordy, poderes propios y personajes inspirados en fotografías de referencia.

**[Jugar en el navegador](https://jhorka029.github.io/manchester_fighter_fisi/)**

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
| Especial / super | L / I |
| Recargar energía (mantener) | O |
| Pausa / menú | Esc / R |

Jugador 2: flechas y teclado numérico (1 alto, 2 medio, 3 especial, 0 super, 4 defensa, 5 descendente, 6 recargar). La guía bajo la arena explica las defensas y los controles de mando.

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
| Especial | Y | △ |
| Super | RB | R1 |
| Defensa | LB | L1 |
| Recargar energía (mantener) | LT | L2 |
| Descendente | RT | R2 |
| Pausa / reanudar | Start | OPTIONS |
| Menú (desde la pausa) | Back | SHARE |

Ataques bajos: mantén abajo + puño o patada. En el menú: ← → tu personaje, LT/RT (L2/R2) o Back/SHARE el rival, ↑ ↓ modo, LB/RB (L1/R1) dificultad, A/✕ o Start/OPTIONS para pelear. Con teclado, ← → eliges tú y Q E el rival; con ratón, clic en las tarjetas.

## Incluye

- Cuatro personajes: Lancha, El Fiel, Kent (patadas de fuego) y Pingordy (medialuna y tornado). El menú tiene una fila para elegir tu personaje y otra para el rival, también en 2 jugadores.
- Combate por rondas, tres dificultades de CPU y modo local de dos jugadores.
- Ataques altos, medios, bajos, descendentes y aéreos.
- Salto y patada aérea con poses distintas; patada baja sin derribo.
- Los poderes a distancia se esquivan saltando en el momento justo; la guardia se mantiene mientras sostienes defensa.
- Recarga de energía para todos los personajes: mantén el botón quieto en el suelo; se corta con un golpe o al moverte; con la barra llena la animación sigue mientras mantengas el botón.
- Esquive con dash (doble toque): invulnerable 0,16 s y 0,6 s de espera. El de Pingordy es un paso lunar (moonwalk), más lento: 0,36 s y 0,2 s de invulnerabilidad.
- Presentaciones de personajes y supers con cámara, aura, oscuridad y rayos.
- Cámara que sigue la pelea y botón para suavizar los efectos.
- Entrenamiento configurable y visualización de zonas de impacto.

## Ejecutar y editar localmente

Es un sitio estático, sin dependencias de compilación. Sirve la carpeta con un servidor local, por ejemplo:

```sh
python -m http.server 8000
```

Abre `http://localhost:8000/`. Usa un servidor local para permitir el procesamiento de sprites en Canvas.

El juego está en `index.html` y `game-v4.js`; los estilos, en `style.css` y `combat-v3.css`. `assets/` contiene únicamente los recursos que usa la versión actual. Algunos recursos conservan nombres de su versión de creación y siguen siendo parte de la 0.4.

## Publicación

GitHub Pages sirve la raíz de la rama `main`. `.nojekyll` indica que los archivos deben publicarse directamente. Los cambios enviados a `main` actualizan el sitio.

La verificación de la versión está en [docs/VERIFICACION.txt](docs/VERIFICACION.txt) y las notas de creación de recursos en [docs/ARTE.md](docs/ARTE.md).

Demo para navegador de ordenador, con mando probado en DualShock 4; la adaptación a Android y R36S queda pendiente.
