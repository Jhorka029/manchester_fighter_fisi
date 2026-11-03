# Selección al azar, tamaños y El Fiel · 0.10

Revisión local, todavía no publicada en GitHub.

## Elegir al azar

La cuadrícula de luchadores incluye una casilla **AL AZAR**, seleccionable con ratón, flechas o mando. Se conserva una elección válida internamente y el sorteo se resuelve al comenzar, sin pasar identificadores inválidos al motor.

- En VS, cada lado puede escoger al azar entre los nueve personajes, de forma independiente. Los duelos del mismo personaje conservan la ropa alternativa del segundo jugador. La selección de escenarios también incluye AL AZAR.
- En Batalla, el sorteo del protagonista solo incluye El Fiel, Lancha, Kent, Pingordy y Joshi. Los cuatro docentes continúan bloqueados. Se conserva la ruta establecida y Pepe Lucho como jefe final.
- Batalla permite escoger un escenario fijo o **AL AZAR POR COMBATE**, que sigue siendo la opción predeterminada. Q/E o X/Y del primer mando cambian esta opción; también se puede usar el selector. Reintentar un nivel conserva su escenario. En VS, Q/E y X/Y continúan ajustando la vida.

## Escenarios

Se corrigen los nombres a **Puerta 2 UNSM** y **Estacionamiento comedor**. Se añade **Sótano FISI**, combinando las dos fotografías proporcionadas en una escena de 16 bits con pasillo, puertas, equipos de aire acondicionado y escalera. Archivo: `assets/escenarios/sotano-fisi.png`. El catálogo tiene diez escenarios reales, además de la opción de sorteo. Aparece en la introducción, selección y Batalla.

## Tamaños y transparencia

La selección mide la silueta visible del sprite, excluyendo los márgenes transparentes, y presenta a los nueve luchadores a 310 unidades de alto. Lancha y El Fiel ya no quedan reducidos por el espacio vacío de sus imágenes.

La cuenta regresiva usa una altura visible de 218 unidades para ambos luchadores. La guardia de combate comparte esa referencia para evitar un cambio de tamaño al terminar el conteo. Se mantienen las poses personalizadas y el balanceo suave. El ajuste afecta al dibujo, no a los hitboxes ni a las estadísticas de combate. Los fotogramas agachados o encogidos durante la acción conservan sus proporciones naturales.

Los ocho frames de lanzamiento de Lancha se vuelven a extraer desde su lámina original con una clave magenta estricta. Los tonos morados del polo ya no se confunden con el fondo: no se rediseñan las poses ni se sustituye su ropa. Recursos corregidos: `assets/personajes/lancha/revision-0.9/shot0.png` a `shot7.png`.

## El Fiel

Se mantienen **U / RT** para el descendente, **L / Y** para el especial y **I / RB** para la ulti.

- U: ocho poses para sacar un cuchillo pequeño, preparar y realizar un corte descendente, recogerlo y volver a la guardia. Conserva daño, alcance, bloqueo alto y la posibilidad de cargar U. No se añade sangre.
- L de pie: ocho poses de preparación, impulso de las palmas y recuperación, conservando la ráfaga y su coste. La variante baja mantiene su comportamiento.
- I: doce poses para levantar y quitarse el polo, agitarlo durante las seis ráfagas y volver a ponérselo. Se usa la cara, pelo, pantalón y calzado del diseño original como referencia. Se conserva el choque de poderes y el daño reducido al bloquear.

Los 28 frames nuevos se guardan por separado en `assets/personajes/el-fiel/revision-0.10/`: `knife0.png` a `knife7.png`, `wave0.png` a `wave7.png`, y `ulti0.png` a `ulti11.png`.

## Creación y validación

Se utilizó la herramienta integrada `image_gen` para el escenario y las dos láminas de El Fiel. Prompts: `AZAR-FIEL-PROMPTS-0.10.json`. El recorte técnico por celdas conserva la ropa morada y elimina el fondo magenta.

Las pruebas verifican sorteo de ambos lados, restricciones de estudiantes, escenario fijo y aleatorio, ropa alternativa, alturas visibles de los nueve personajes, opacidad del polo de Lancha, secuencias de 8/8/12 poses, daño, defensa, choque y recuperación. Se comprueban además selección con ratón, teclado y mando, y la regresión de reglas y combate.
