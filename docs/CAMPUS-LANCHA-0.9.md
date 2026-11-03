# Escenarios, escudos y Lancha · 0.9

Revisión local, todavía no publicada en GitHub.

## Escenarios

Se añaden las adaptaciones de las tres fotografías proporcionadas: **puerta 2 UNSM**, **Comedor UNSM** y **estacionamiento comedor**. Los fondos se guardan en `assets/escenarios/puerta-2-unsm.png`, `comedor-unsm.png` y `estacionamiento-comedor.png`. Se integran en el catálogo, la introducción, la selección y el sorteo del modo Batalla.

Patio FISI se retira del juego y de los assets activos. Quedan nueve escenarios. Las referencias al escenario FISI de la portada, créditos y ceremonia final ahora se resuelven por su identificador; no dependen de una posición numérica del catálogo. Comedor UNSM conserva el público dibujado en sus mesas sin superponer otra fila de espectadores.

## Escudos

Las ultis aplican **10 % del daño de cada impacto** cuando el defensor bloquea correctamente. Se conserva el evento de bloqueo, la animación del escudo y su sonido; no se convierte en un golpe completo. Ejemplos: impacto de 6 → 0,6; rodada de Lancha de 7 → 0,7; tigrillo de Kike de 4 → 0,4. Los golpes normales conservan sus reglas anteriores. Perder vida por bloqueo impide un Perfect KO.

## Lancha

- **I / RB:** Lancha se hace una bola con sus diez sprites de rodada existentes. Durante 4,6 segundos activos recorre el escenario a 1320 unidades por segundo y rebota en los extremos. Al alcanzar al rival puede elevar visualmente la rodada para conectar también durante el salto. Hace como máximo seis impactos de siete puntos, con separación mínima entre impactos. La guardia reduce cada contacto a 0,7; los golpes, agarres y evasiones no cancelan la ulti. Se conserva el choque de poderes al activarlas simultáneamente.
- **U / RT:** ocho poses para sacar una bala de atletismo, prepararla junto al cuello, impulsarla y recuperar la guardia. La esfera de metal viaja con gravedad y tiene un recorrido máximo de 220 unidades desde su salida (240 al cargar U); desaparece al contactar o agotar su alcance. Hace 15 puntos de daño, o 20 cargada, y conserva la defensa alta del descendente. No persigue al rival por todo el escenario.

Los nuevos frames están separados en `assets/personajes/lancha/revision-0.9/shot0.png` a `shot7.png`. Conservan el polo morado, jeans, barba, escala y diseño original como referencia. La rodada reutiliza las imágenes originales del personaje, sin rediseñarlo. El archivo `lancha-updates.js` contiene el manifiesto de las ocho poses y los parámetros de ambos ataques.

## Kike

Se retira el audio hablado de activación de la ulti y su precarga. El texto breve y los efectos generales del combate se conservan. Ya no se espera la duración de una pista de voz antes de invocar los diez tigrillos.

## Arte y pruebas

Los tres escenarios y la secuencia de lanzamiento se crearon con la herramienta integrada `image_gen`, a partir de las fotografías y el sprite original. Los prompts están en `CAMPUS-LANCHA-PROMPTS-0.9.json`. La extracción por celdas elimina el fondo magenta y conserva alfa real; la esfera separada del frame de liberación se representa como proyectil jugable.

Se prueban catálogo, precarga, selector, público, acceso al escenario FISI por id, bloqueo de ultis de los nueve personajes, rodada en ambas direcciones, persecución, rebotes, límites de daño, inmunidad a golpes/agarres, alcance de bala, pausas, salida y resolución del choque de poderes.
