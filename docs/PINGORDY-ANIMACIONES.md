# Pingordy: diseño unificado

La serie activa tiene 101 sprites transparentes independientes en `assets/personajes/pingordy/unificado/`. Se utiliza una sola identidad adaptada al atlas original: rostro adulto angular, cabello corto peinado, vincha rosa, camisa rojo-magenta, corbata azul rayada, pantalón y zapatos negros. Todas las acciones usan esta serie.

- Postura lateral: un frame con el mismo balanceo vertical suave del resto del elenco, tanto en selección como en combate. Se utiliza también en presentación, cartel e intro. Se restauró el balanceo por petición posterior del usuario.
- Caminata: ocho frames con mano en bolsillo. Contacto de talón, apoyo, cruce de pies y rodilla elevada. El ciclo avanza solo durante el desplazamiento; al soltar la tecla vuelve a la postura fija.
- Retroceso: cuatro nuevos frames llevan la mano desde el pecho hasta la cabeza; después se recorren ocho frames de paso lunar con la mano apoyada en la vincha y el otro brazo relajado. La transición normal dura 0,22 segundos y el ciclo se reproduce a ocho frames por segundo. Doble toque atrás comprime la transición a 0,10 segundos y el ciclo hasta completar 0,46 segundos. Doble toque adelante conserva la pose inclinada con estelas rosas. Funciona al invertir los lados de la pelea.
- Ulti I: doce poses de baile y seis ráfagas desde la vincha, ahora con destellos, notas musicales y cintas orbitales. Conserva coste, duración, defensa y choque de poderes.
- Descendente U: ocho poses, desatar, preparar, latigazo y anudado. El impacto coincide con la ventana activa.
- Combate común: dieciséis poses para guardia, golpes, patadas, salto, daño, caída, recarga y victoria.
- Acrobacias: doce poses para agarres terrestres/aéreos, lanzamiento y patada especial.
- Especial L: los mismos cuatro frames de llevar la mano a la cabeza y ocho de deslizamiento se distribuyen durante los 0,85 segundos de preparación; después se conserva la patada ascendente, arco y proyectil. Mantiene coste y daño.
- Patada aérea: cuatro frames de patada voladora: preparación, extensión, impacto con pierna delantera completamente recta y recogida. El frame extendido coincide con toda la ventana activa del golpe; conserva notas, estelas, destellos, daño y alcance. Ya no utiliza la pose de rodillazo.
- Recarga O: cuatro frames en postura de poder con rodillas flexionadas y puños a la cintura; aura, chispas y rayos. La cuenta regresiva empieza en postura normal, pasa a estas cuatro poses y termina en guardia antes del combate.
- Victoria: brazos cruzados, una rodilla levantada y espiral rosa.
- Abajo + dirección: activa un desplazamiento de torbellino con cuatro poses de giro, siete bandas orbitales y chispas; no exige doble toque. Mantiene duración, coste de oportunidad y ventanas de invulnerabilidad del giro anterior.
- Emparejamiento VS: Pingordy se dibuja a 380 unidades de alto, igual que El Fiel, sin modificar su tamaño de combate.
- Agarre: aura detrás del dúo, siete cintas de torbellino, destellos y notas musicales; órbitas adicionales siguen al rival durante la elevación y el lanzamiento. El efecto entra en 0,09 segundos y se desvanece en los últimos 0,16. En el giro del agarre tornado se usan cuatro poses verticales; el resto del agarre conserva sus poses de alcance, sujeción y lanzamiento. Un escape corta los efectos inmediatamente. No se cambian daño, duración ni ventana de escape.

El archivo `unificado/retrato.png` conserva el recorte de la postura canónica como recurso histórico. El icono visible ahora usa `retrato-real.jpg`, la fotografía original suministrada por el usuario. Menú, VS e intro comparten esa fotografía y los mismos sprites. Ningún estado visible vuelve a las animaciones descartadas. No se modifican las animaciones del resto del elenco.

Los recortes conservan alfa real y eliminan componentes sueltos de celdas vecinas. Usan escala por lámina, sin estirar una pose agachada hasta altura de pie; el render usa `imageSmoothingEnabled=false`. `frames.json` conserva límites, anclajes y escala. El atlas histórico se conserva como referencia y ya no se carga para mostrar al personaje.

Generación: herramienta integrada `image_gen`; conjunto de prompts y referencias en `PINGORDY-PROMPTS.json`. Las láminas de caminata descartadas no se utilizan.

Verificación actual: balanceo visible en selección y pelea; cuatro poses de recarga observadas al mantener O; ocho frames de retroceso normal y rápido; pose de avance rápido y patada aérea verificadas mediante teclado real; abajo + dirección activa las cuatro poses de torbellino. Se comprueban duración/retroceso de L, preparación del combate, victoria, tamaño VS y dibujo de efectos. Pasan las 431 comprobaciones de reglas/refinamientos y las 76 de combate, sin errores JavaScript. La comprobación histórica de altura de introducción se adapta para aceptar la flexión natural de rodillas de Pingordy, manteniendo la escala por píxel.

Última verificación: los doce frames de transición/paso lunar se observan con teclado tanto mirando a la derecha como a la izquierda y durante L. El doble toque recorre los ocho frames de deslizamiento acelerado. J+K conecta un agarre con cuatro poses de giro y mantiene los 14 puntos de daño. Se dibujan aura, notas, destellos y cintas en cinco momentos del lanzamiento; los efectos se reducen con FX suaves y desaparecen al escapar del agarre. No hay errores JavaScript.
