# Elmer — modelo único y movimientos

El modelo aprobado es la guardia de camisa floral oscura, pantalón azul marino y cuerpo delgado. La cabeza, cuello, hombros y largo de las extremidades se toman de esa referencia. No se usan las láminas anteriores de 32 personajes como referencia de identidad.

## Arte actual

Se generaron con ImageGen 18 tiras independientes por acción, cada una con una copia de la guardia como referencia de escala. Se retiró el magenta y se recortó cada figura completa por componentes conectados. Hay **57 dibujos PNG**, incluida la guardia aprobada de dos cuadros, compartidos por **104 fases de animación**. Las fases mantienen los tiempos originales y reutilizan cuadros de preparación, impacto y recuperación; no representan 104 dibujos distintos.

Los únicos recursos de Elmer están en `assets/personajes/elmer/diseno-canonico/` y `assets/personajes/elmer/retrato-real.png`. Las carpetas antiguas `caminata`, `combate` y `habilidades` se retiraron a la Papelera después de comprobar las animaciones nuevas. No hay referencias de carga a esos sprites anteriores.

Se utiliza una escala uniforme por tira calibrada con su primera guardia. La altura de pie se mantiene en torno a 218 unidades; agacharse o doblar las piernas reduce la altura visible sin aumentar la cabeza ni comprimir artificialmente el cuerpo. Los dibujos se prepararon a dos veces su escala de uso con muestreo de vecino más cercano y se comparten en memoria entre fases.

## Movimientos cubiertos

- Guardia y respiración: los dos cuadros aprobados.
- Caminar y retroceder: tres pasos nuevos en guardia, con reproducción inversa al retroceder.
- Agacharse, bloqueo de pie y bloqueo bajo.
- Ascenso, ápice, descenso y aterrizaje.
- Puño alto, patada de pie, puño bajo y patada baja: preparación, impacto y recuperación.
- Puño aéreo y patada voladora con pierna extendida.
- APK: sacar celular, activarlo y guardarlo.
- Blockchain L: preparar manos, empujar palmas y recuperar.
- Ulti: preparación, cruce de brazos, sostenimiento y remate.
- Recarga: dos cuadros propios de postura de energía, de acuerdo con el último prompt; conserva seis cubos orbitales.
- Agarre: alcance, toma, lanzamiento y recuperación; conserva los celulares durante el lanzamiento.
- Dash: lanzamiento, zancada rápida y frenado.
- Giro: preparación de teletransporte, desaparición y reaparición.
- Reacción al daño, caída/KO e introducción/victoria.

## Mecánicas conservadas

El código desde `beforeElmerAttack` en adelante mantiene el mismo SHA-256 que antes del rediseño: poderes, proyectiles, efectos, alcances, daño, coste de energía, seguimiento, escudo, agarre, teletransporte y choque de ultis no cambiaron. Solo cambian catálogo/carga de imágenes y selección visual de poses. La ulti sigue dando diez impactos (40 de daño total o 4 con escudo).

Pepe Lucho sigue último y oculto en la selección de Batalla. El retrato sigue siendo la fotografía floral previamente aprobada.

## Verificación y entrega

- `VERIFICACION-ELMER.json`: 137 comprobaciones de geometría, fases, habilidades, daño y selector.
- `VERIFICACION-ULTI-RENDER.json`: 28 comprobaciones de dibujo y activación real con I, sin errores del bucle.
- `VERIFICACION-MODELO-ELMER.json`: medidas de referencia y prueba del hash de poderes.
- `ELMER-PROMPTS.json`: prompts exactos y láminas generadas con ImageGen.

Comparación de veinte poses a escala de juego: `work/Elmer-comparacion-canonica.png`. Entrega: `outputs/Manchester-FISI-Fighter-v0.11.html`. Esta revisión se incluye en la publicación de main.
