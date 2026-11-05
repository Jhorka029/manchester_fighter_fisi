# Controles táctiles, teclado y mandos

En la cabecera del juego: **Táctil: ON/OFF** y **⚙ Controles**.

## Pantalla táctil

Se activa inicialmente en dispositivos de puntero táctil, y se puede activar o desactivar en cualquier equipo. La elección queda guardada. Dirección/salto están a la izquierda, ataques/escudo/poderes a la derecha. Admite varios dedos, agarre con un botón y liberación segura al cancelar un toque, cambiar de pantalla o perder el foco. Incluye tamaño Cómodo/Grande y opacidad. El táctil maneja al jugador 1. En Historia cambia a las acciones de aventura (dash, código e interactuar). En pantalla completa se incluye el panel táctil.

## Teclado

Elegir P1 o P2, pulsar una acción y presionar la tecla deseada. Esc cancela la captura. Se detectan conflictos entre acciones y jugadores. Configura movimiento, golpes, escudo, poderes, recarga, agarre, voltereta, pausa y salida. Dash e interactuar son acciones adicionales de Historia. En VS el dash sigue disponible con doble toque. Los menús conservan flechas/Enter/Esc. La ayuda bajo la arena refleja las teclas elegidas de P1.

## Mandos

Conectar el mando y pulsar un botón para que el navegador lo exponga. Elegir P1/P2, asignar un dispositivo o usar selección automática (primer/segundo mando), después pulsar la acción que se desea cambiar y el botón físico. Un monitor muestra los botones detectados. Se pueden elegir ejes horizontal/vertical, desactivarlos y ajustar la zona muerta. La asignación explícita evita que una desconexión intercambie jugadores. Cuando se reasigna un botón utilizado por otra acción del mismo contexto se intercambian sus asignaciones; las acciones exclusivas de Historia pueden compartir botones con acciones exclusivas de VS.

El combate y la aventura se detienen mientras el panel está abierto. Las preferencias se guardan en `localStorage` (`fisi-controls-v1`) por navegador/origen; la versión local y GitHub Pages tienen guardados independientes. Los controles de navegación de menús siguen siendo los estándar del mando.

Implementación: `controls.js`, `controls.css`; integración con entrada de combate y `StoryInput`. No requiere archivos multimedia nuevos.

Verificación: `VERIFICACION-CONTROLES.json`: reasignaciones P1/P2, conflicto, mandos simulados invertidos, captura de botón, ejes, desconexión, persistencia, Historia y multitáctil real emulado mediante CDP en navegador móvil, orientación horizontal/vertical. También se revisaron capturas de pantalla. La prueba de mandos usa dispositivos simulados; no se ha realizado una prueba física con hardware en este equipo.

Incluido en la publicación de main para probar los controles desde GitHub Pages.
