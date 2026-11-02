# Manchester FISI Fighter 0.7

## VS y vida por capas

En VS CPU y 2 jugadores se configura la vida de cada lado al seleccionar luchadores, de 1 a 5 barras de 100 puntos. Ambas opciones empiezan en 1. Colores: 1 rojo, 2 amarillo, 3 verde claro, 4 celeste y 5 azul. Al agotarse una capa aparece la siguiente; se muestran también las reservas y los puntos restantes. Las rondas restauran la cantidad configurada. Entrenamiento conserva una barra.

Ratón: desplegables VIDA P1 y VIDA P2/CPU. Teclado: Tab cambia de lado; Q/E reduce/aumenta la vida del lado elegido. Mando estándar: LB/RB cambia de lado y X/Y ajusta vida. VS conserva las partidas al mejor de tres. El tiempo agotado compara el porcentaje restante de vida, evitando favorecer automáticamente al lado con más barras. Perfect KO exige no haber perdido ningún punto de la vida máxima configurada.

Orden de selección, tarjetas de intro y ruta: El Fiel, Lancha, Kent, Pingordy, Joshi, Ingestrella, Kike Parker, Cárdenas y Pepe Lucho. Los identificadores internos se conservan para no mezclar sprites ni habilidades.

Cuando ambos lados eligen al mismo personaje, P2 utiliza una variante violeta/lila de la ropa. Se conserva piel, transparencia y silueta. Se aplica también en selección, VS y las poses de combate. La paleta se calcula una vez por imagen y se guarda en caché.

## Batalla

Solo permite escoger a Lancha, El Fiel, Kent, Pingordy o Joshi; los cuatro docentes están bloqueados tanto con ratón como con teclado/mando. Se elige únicamente al estudiante. Cada campaña tiene ocho encuentros de una ronda; sigue el orden anterior, omite al estudiante elegido y termina siempre con Pepe Lucho.

| Nivel | Barras del rival | IA base | Tiempo |
|---|---:|---|---:|
| 1 | 1 | Fácil | 75 s |
| 2 | 1 | Fácil | 85 s |
| 3 | 2 | Normal | 95 s |
| 4 | 2 | Normal | 105 s |
| 5 | 3 | Normal | 115 s |
| 6 | 3 | Difícil | 125 s |
| 7 | 4 | Difícil | 135 s |
| 8: Pepe Lucho | 5 | Difícil | 145 s |

La rapidez de decisión de la IA aumenta en cada nivel, incluso entre niveles que comparten barras. También suben las probabilidades de defensa y ulti. El estudiante siempre tiene una barra, restaurada al comenzar cada encuentro. Los escenarios se eligen al azar evitando repetir inmediatamente el anterior.

Entre encuentros, el estudiante camina sobre fondo oscuro con «El siguiente rival te espera». Después del emparejamiento hay un intercambio breve específico de cada cruce, con narración española; Espacio/Enter/A permite saltarlo. Hay 40 cruces distintos, documentados en `DIALOGOS-BATALLA.json`.

Al perder, el estudiante aparece derrotado a la izquierda y «¿Continuar?» a la derecha, con cuenta de 9 a 0. Espacio/Enter/A/Start o el botón visible reproduce el mismo `assets/audio/boton.mp3` existente, anima la recuperación y reintenta exactamente el mismo nivel y escenario, restaurando ambas vidas. La cuenta deja visible cada número un segundo; al agotarse aparece Fin de la batalla, con opciones de reinicio y menú. Las continuaciones son ilimitadas durante la sesión; no hay guardado persistente de campaña. Esc/B/Back vuelve al menú.

Al vencer al jefe hay una ceremonia: facultad, elenco, público aplaudiendo, confeti, llegada animada del trofeo JAVA y felicitación. El escenario y acompañantes se oscurecen gradualmente, quedando el ganador y el trofeo. Se puede volver a jugar o salir al menú principal. La ilustración del trofeo y la animación se dibujan en el propio canvas del juego.

## Audio

Se conservan las músicas `personajes-listo.mp3` para selección y `combate-listo.mp3` para la Batalla, sus encuentros y transiciones, con los fundidos existentes. Se añaden 52 archivos autónomos: 45 narraciones en español (Microsoft Sabina, síntesis local) y siete efectos originales (pasos, transición, cuenta, derrota, recuperación, fanfarria y aplausos sintéticos). No requieren conexión ni voces instaladas en el equipo donde se juega. Las voces se precargan, reducen la música al hablar y se desvanecen al saltar un diálogo. Fanfarria y aplausos se mezclan por debajo de la voz. Se respetan silencio, mezcla de volúmenes, pausa y pestaña oculta.

## Verificación

Se comprueban: valores predeterminados, máximos individuales y restauración de vida; orden de nueve personajes; variantes de ropa para los nueve; bloqueos de docentes; ocho niveles y cinco rutas válidas; jefe 500 HP contra 100 HP; continuación por teclado y mando simulado, conservación del escenario y coste de vida; cuenta agotada; Perfect KO con 1–5 barras; audio decodificado y señal de salida; botones y diseño en pantalla estrecha. Se ejecutan también las 431 comprobaciones de reglas/refinamientos y las 76 de combate anteriores.

Fuentes principales nuevas: `versus-options.js`, `battle-mode.js`, `battle-scenes.js`, `battle-audio.js` y `battle-mode.css`. Build autónomo: `node build.cjs [ruta-del-html]`.
