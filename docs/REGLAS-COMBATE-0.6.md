# Correcciones de combate y confirmación

Reglas de la revisión 0.6.

El audio «seleccionar botón» se reproduce únicamente al confirmar el título para empezar y al confirmar los luchadores con Enter/¡A PELEAR!. Recorrer opciones, pulsar retratos para explorar, cambiar de modo/escenario y retroceder no lo disparan. La acción anidada de confirmar y comenzar la pelea produce una sola muestra.

La navegación tiene sus propios efectos originales: uno corto y ascendente para cambiar de cuadro, y otro descendente al retroceder de sección. Son independientes de la muestra de confirmación.

Cada ronda reinicia la orientación desde las posiciones de salida y la conserva correcta durante la cuenta regresiva, aunque los jugadores hayan cruzado lados en la ronda anterior. También se limpian estados de salto/entrada que pertenecían a esa ronda.

fighterGeometry centraliza las unidades de dibujo por personaje. La altura de reposo programada es la referencia para las poses de presentación y victoria; se eliminaron multiplicadores extra y estiramientos de respiración/salto/aterrizaje. Selección, VS, intro y combate utilizan la misma referencia corporal. Agacharse, saltar o girar cambia la postura y el encuadre de la imagen, no fuerza todas las siluetas a un mismo alto. La cámara conserva sus acercamientos.

## Ultis y choque

- Una ulti activa no se interrumpe con ataques, proyectiles normales ni agarres.
- La defensa correctamente orientada bloquea los impactos de ulti sin daño de vida. La invulnerabilidad de una rodada/dash no anula un impacto de ulti que alcanza la silueta; una ráfaga de ulti no se destruye con un barrigazo.
- La distancia y las zonas de impacto del juego se conservan: no se teletransportan personajes ni se convierte la ulti en un golpe automático a toda la pantalla.
- Si ambos activan una ulti estando habilitados dentro de 250 ms, comienza el choque. Ambos gastan 100 de energía al entrar.
- P1: I. P2 local: 0 del teclado numérico. En mando: RB/R1 de cada jugador; el botón SUPER táctil de P1 también sirve. En VS CPU, la frecuencia de la CPU depende de la dificultad.
- Cada pulsación nueva suma; mantener la tecla o su repetición automática no suma. La barra representa la diferencia de pulsaciones, sin ventaja por el orden de los jugadores.
- Una ventaja de 18 pulsaciones llena la barra y resuelve el duelo. Desde los seis segundos la barra se acelera progresivamente para resolver duelos reñidos; el ganador siempre alcanza el extremo completo y se muestra ese resultado antes de liberar la ulti. Un empate sin resolver a los diez segundos disipa ambas ultis y permite seguir jugando.
- Sólo el ganador libera su ulti, sin cobrar energía otra vez. El perdedor queda con cero al resolver el choque; después vuelve a ganar energía por las reglas normales de combate. Entrenamiento conserva la reposición infinita propia de ese modo.
- Reloj, movimientos, golpes y proyectiles se detienen durante el choque. Pausa también detiene su tiempo y sus pulsaciones; volver al menú o comenzar otra ronda limpia el duelo.

Pruebas: orientación y escala de presentación en los 81 enfrentamientos, guardia/invulnerabilidad/agarre, bloqueo de ulti tardía, choque simultáneo y con respuesta cercana, victoria de ambos lados, consumo de energía, empate, pausa/reloj, muestras de menú y teclado real con repetición. Se conservan las comprobaciones de voces y las 76 del combate previo. No se probó un mando físico.
