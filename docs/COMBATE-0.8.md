# Correcciones de combate 0.8

Revisión local, todavía no publicada.

## Confirmación de salida

R o Back/SHARE del mando abre una confirmación tanto en VS como en Batalla, incluidas las transiciones y la cuenta para continuar. La partida se pausa y se selecciona «Seguir jugando» por defecto. Flechas o cruceta cambian la opción, Enter/Espacio/A confirma, Escape/R/B cancela. Mantener un botón no confirma accidentalmente. Cancelar restaura la pausa anterior, la vida y el nivel; salir termina la partida.

## Estrella, Kike Parker y Cárdenas

- Estrella usa las tres poses de patada media del ZIP proporcionado, extraídas sin el fondo magenta. Tiene cuatro poses nuevas para la patada voladora.
- Kike tiene seis poses de avance y seis de retroceso; las secuencias se reproducen únicamente al desplazarse. La patada voladora tiene cuatro poses y muestra la pierna extendida durante el impacto.
- El descendente de Kike invoca un tigrillo de corto a medio alcance, con preparación, salto, mordisco/arañazo y recuperación. Su alcance es 190 unidades; no persigue al rival por todo el escenario. Conserva la posibilidad de cargar U.
- Cárdenas tiene cuatro poses de patada voladora y cuatro nuevas de golpe descendente con su bolso. Reemplazan la imagen con el recorte defectuoso.

La ropa, colores y diseño original sirven de referencia para las nuevas láminas. Se conserva la escala corporal de combate; las posturas encogidas no se estiran a la altura de pie. Las poses originales de guardia, los retratos y las imágenes de presentación permanecen como estaban.

## Ulti de Kike

Al activar I, Kike dice «Ya me aburrieron tigrillos». La voz es sintetizada localmente, sin imitar la voz de la persona. Al terminar la frase invoca diez tigrillos pequeños, con ocho poses de carrera, cuatro de salto/mordida y cuatro de arañazo. Salen escalonados y persiguen la posición real del rival, también en el aire y hacia ambos lados del escenario.

Cada tigrillo realiza un único contacto de cuatro puntos de daño: 40 en total sin defensa. La guardia bloquea el ataque según las reglas existentes. Los golpes normales no anulan una ulti. Se conserva el choque de poderes: si Kike gana, invoca la manada; si pierde, no la invoca. La habilidad termina después de los diez contactos y la recuperación, y los animales se limpian al acabar la ronda o salir.

## Recursos y verificación

`fighter-updates.js` contiene el manifiesto de 55 frames separados y sus escalas/anclajes. 52 se derivan de láminas creadas con la herramienta integrada `image_gen`; tres proceden de la patada media adjunta. Están organizados en `assets/personajes/<personaje>/revision-0.8/` y `assets/personajes/kike-parker/tigrillos/`. La frase está en `assets/audio/kike-tigrillos.mp3`. El conjunto de prompts está en `DOCENTES-PROMPTS-0.8.json`.

Las pruebas cubren poses, alcance, defensa, persecución, diez impactos, recuperación, choques de ultis y confirmación de salida con teclado y mando. También se ejecuta la regresión de reglas y combate.
