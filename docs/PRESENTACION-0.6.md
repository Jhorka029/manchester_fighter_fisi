# Presentación 0.6

Revisión 0.6 del proyecto.

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

Las pistas originales se conservaron en assets/audio/intro.mp3 y combate.mp3. Los nuevos originales están en assets/audio/fuentes/. Se usan copias recortadas para no decodificar canciones completas al abrir: menu-listo.mp3 (intro original, 30–78 s), combate-listo.mp3 (juego original, 124–172 s), personajes-listo.mp3 (seleccionar luchador, 16–68 s). La tercera pista solo se usa en la pantalla de selección de personajes. Se normaliza la energía y se prepara un solapamiento de 350 ms para suavizar los bucles; no se pretende un empalme musical exacto por compás.

audio-director.js precarga la música y las muestras incluso con el contexto suspendido. Primero decodifica una cabecera corta (menu-arranque.mp3, seis segundos del mismo tramo de entrada) y enlaza con la pista completa en la misma posición, con un fundido de 150 ms. Así no espera a decodificar todas las canciones para iniciar. Intenta arrancar automáticamente, sin fundido lento en el primer arranque; cuando el navegador bloquea el audio se desbloquea con la primera interacción. Los cambios posteriores de música tienen un fundido de 850 ms y salida progresiva de la pista anterior, conservando el nivel al interrumpir un fundido con otra selección rápida. Mezclador independiente: música 24%, efectos 100% por defecto. Se reforzaron impactos/recarga y se reduce la música al 18% de su volumen durante locuciones, especiales y ultis. Compresor en la salida para controlar los picos.

Locuciones recortadas del audio suministrado: Round One (0.20–1.45 s), Round Two (3.58–4.87 s), Final Round (13.60–14.94 s), Fight (2.00–2.81 s), K.O. (17.30–19.08 s) y Perfect K.O. (19.42–21.70 s). Identificadas con reconocimiento local y recortadas con margen para conservar las palabras completas. El audio dice «Final Round»; se reproduce esa locución original desde la tercera ronda. Round suena al comenzar la cuenta y Fight al terminarla. Perfect K.O. solo suena si hay derrota por vida y el ganador conserva 100 de vida; K.O. para el resto de derrotas por vida. No se canta K.O. en un resultado por tiempo. La fanfarria de victoria se retrasa para no tapar la locución.

Especiales: cuatro muestras sin silencios largos, extraídas de 1.16–1.94 s, 4.70–5.43 s, 8.08–8.99 s y 11.90–13.03 s. Se reparten por índice de personaje módulo cuatro y se disparan al confirmar un especial (incluido el tigrillo de Kike) o una ulti. Los instantes aproximados indicados por el usuario se ajustaron a los inicios de señal del archivo real.

Botones: una sola muestra del audio seleccionar botón (0.09–1.80 s), limitada a confirmar el título y confirmar los luchadores para pelear. No se reproduce al explorar, retroceder o cambiar de sección. Funciona con clic, teclado o mando y una confirmación anidada no duplica el sonido. Se suprimen los antiguos pitidos de menú. Los controles de volumen siguen siendo ajustables con teclado sin activar la navegación del juego. Las reglas del choque de ultis y de escala corporal están en REGLAS-COMBATE-0.6.md.

Navegación: se añadieron dos efectos originales sintetizados en Web Audio. «menu-move» es un pulso ascendente de 1050 a 1500 Hz con un armónico breve; «menu-back» son dos notas descendentes de 660 a 440 Hz y de 330 a 220 Hz. Suenan al cambiar de cuadro o retroceder, respectivamente, con teclado, clic o mando. Volver a pulsar el mismo cuadro no repite el efecto, y las llamadas anidadas no lo duplican. Respetan silencio y volumen de efectos; no utilizan la muestra de confirmación.

El navegador puede bloquear el audio al abrir: se desbloquea con la primera tecla o clic. No hay pantalla obligatoria para activar la música. La animación comienza automáticamente. Música y efectos respetan silencio, pausa y pestaña oculta. El audio y el logo se incrustan en el HTML autónomo; no requiere Internet.

Verificación: precarga de tres pistas y once muestras, secuencia real de voces de las tres rondas, K.O./Perfect K.O. mutuamente excluyentes, especial de los nueve personajes, sonido único por botón, música restringida a selección, medición de señal de voz, silencio, pausa/reanudación, intento automático cuando el navegador lo permite y activación rápida por gesto cuando lo bloquea, además de las 76 comprobaciones del motor. No se probó un mando físico.
