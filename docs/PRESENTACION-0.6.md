# Presentación local 0.6

Cambios exclusivamente locales; no publicados en GitHub.

- Siete escenarios: los cuatro existentes, Loza UNSM, Kokobombo - Fiesta Cachimbo y FISI.
- Loza usa la primera imagen proporcionada, sin alteraciones.
- Kokobombo y FISI: imágenes generadas con la herramienta integrada imagegen, utilizando las fotografías aportadas como referencia. Guardadas en assets/escenarios/kokobombo.png y fisi.png.
- Favicon: el mismo assets/interfaz/escudo-fisi.png de la intro, también incluido en el HTML autónomo.
- Intro automática de 22.55 segundos, con los siete escenarios, nueve tarjetas de personajes y cierre grupal. Saltar mediante botón, Espacio, Enter, Escape o mando.
- Tarjetas: entrada lateral, retrato al fondo, nombre, rol y poder, líneas de velocidad y barrido diagonal. Los FX suaves reducen el movimiento.
- Portada: los nueve sprites originales compuestos sobre la FISI, en dos filas. No se regeneraron los personajes.
- Nuevos archivos presentation.js y presentation.css: presentación separada del motor de combate.

Referencias: https://www.youtube.com/watch?v=yyTPiR53aII y https://blog.erikstore.com/personajes-street-fighter/ . La página de Erikstore se consultó; el video no pudo reproducirse en esta sesión. La transición es una interpretación arcade, no una reproducción exacta del video.

Prompts de generación (herramienta integrada, sin API externa):

Kokobombo: convertir la segunda fotografía en fondo lateral de pelea 16 bits; conservar marcos de neón rojo/naranja, luces violetas, cabina DJ y gorila; público detrás de barandas; suelo libre en el 28% inferior; píxeles definidos y paleta limitada; sin personajes en primer plano, interfaz ni texto.

FISI: convertir la tercera fotografía en fondo lateral de pelea 16 bits; conservar edificio blanco, torre central, barandas plateadas, techo rojo, cafetería, farola verde y cielo azul; ampliar patio pavimentado en el 25% inferior; píxeles definidos y paleta limitada; sin personajes en primer plano, interfaz ni texto.
