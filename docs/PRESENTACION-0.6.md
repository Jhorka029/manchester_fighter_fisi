# Presentación local 0.6

Cambios exclusivamente locales; no publicados en GitHub.

- Siete escenarios: los cuatro existentes, Loza UNSM, Kokobombo - Fiesta Cachimbo y FISI.
- Loza usa la primera imagen proporcionada, sin alteraciones.
- Kokobombo y FISI: imágenes generadas con la herramienta integrada imagegen, utilizando las fotografías aportadas como referencia. Guardadas en assets/escenarios/kokobombo.png y fisi.png.
- Favicon: el mismo assets/interfaz/escudo-fisi.png de la intro, también incluido en el HTML autónomo.
- Intro automática de 30.75 segundos: créditos (8 s), auspiciador (3 s), siete escenarios (1 s cada uno), nueve tarjetas de personajes y cierre grupal. Saltar mediante botón, Espacio, Enter, Escape o mando.
- Tarjetas: entrada lateral, retrato al fondo, nombre, rol y poder, líneas de velocidad y barrido diagonal. Los FX suaves reducen el movimiento.
- Portada: los nueve sprites originales compuestos sobre la FISI, en dos filas. No se regeneraron los personajes.
- Nuevos archivos presentation.js y presentation.css: presentación separada del motor de combate.

Referencias: https://www.youtube.com/watch?v=yyTPiR53aII y https://blog.erikstore.com/personajes-street-fighter/ . La página de Erikstore se consultó; el video no pudo reproducirse en esta sesión. La transición es una interpretación arcade, no una reproducción exacta del video.

Prompts de generación (herramienta integrada, sin API externa):

Kokobombo: convertir la segunda fotografía en fondo lateral de pelea 16 bits; conservar marcos de neón rojo/naranja, luces violetas, cabina DJ y gorila; público detrás de barandas; suelo libre en el 28% inferior; píxeles definidos y paleta limitada; sin personajes en primer plano, interfaz ni texto.

FISI: convertir la tercera fotografía en fondo lateral de pelea 16 bits; conservar edificio blanco, torre central, barandas plateadas, techo rojo, cafetería, farola verde y cielo azul; ampliar patio pavimentado en el 25% inferior; píxeles definidos y paleta limitada; sin personajes en primer plano, interfaz ni texto.

## Créditos y audio

Creador del Proyecto: Jordy Jhorkaet Curay Acosta.

Desarrolladores: Gabriel Alessandro Flores Ramírez, Darick Gerald Herrera Castillo, Ronald Lancha Chuquilin y Jordy Jhorkaet Curay Acosta.

Auspiciadores: Core FK. Logo generado con imagegen integrado y guardado en assets/interfaz/core-fk-pixel.png. Prompt: transformar el logo adjunto en pixel art de 16 bits; conservar emblema C/circuitos naranja y carbón y texto exacto CORE FK; píxeles definidos y fondo transparente, sin rediseñar ni agregar texto.

Las pistas del usuario se conservaron completas en assets/audio/intro.mp3 y combate.mp3. Se analizaron duración y energía RMS mediante decodificación Web Audio: ambas duran aproximadamente 178 segundos. Menús: tramo 8–78 s de intro.mp3, evitando los primeros compases débiles y el descenso posterior. Combate: tramo 124–172 s de juego.mp3, una de las ventanas de mayor energía, evitando el silencio de salida. Se normaliza la energía y se prepara un solapamiento de 350 ms para suavizar los bucles; no se pretende un empalme musical exacto por compás.

audio-director.js reemplaza la música sintetizada anterior con las dos pistas y mantiene efectos sintetizados reforzados y variados. Mezclador independiente: música 34%, efectos 85% por defecto. Fundido entre pistas y reducción automática de música en ultis, cuenta regresiva y victorias. Compresor en la salida para controlar los picos.

Eventos: selección de modo/escenario/personaje con teclado o clic, regreso, preparación de especial, recarga periódica, golpe/bloqueo, tres avisos de cuenta regresiva y señal de inicio, ulti por personaje, K.O., victoria de ronda y celebración final. Son señales y melodías arcade; no se añadieron voces grabadas.

El navegador puede bloquear el audio al abrir: se desbloquea con la primera tecla o clic. No hay pantalla obligatoria para activar la música. La animación comienza automáticamente. Música y efectos respetan silencio, pausa y pestaña oculta. El audio y el logo se incrustan en el HTML autónomo; no requiere Internet.

Verificación: decodificación y reproducción de ambas pistas, medición de señal real en salida (música/efecto), silencio, cambio de pista, pausa/reanudación, eventos de combate y selección, además de las 76 comprobaciones del motor.
