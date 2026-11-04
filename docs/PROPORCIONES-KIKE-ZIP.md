# Proporciones corporales y Kike Parker

Revisión local sobre la versión 0.11 + Dadick. No publicada todavía.

## Escala corporal

La guardia, el salto, los ataques aéreos, los giros y la recarga comparten una unidad corporal obtenida de la pose de pie. Se eliminó la mezcla entre la altura normalizada de guardia y la escala anterior de otras animaciones. El recorte transparente del sprite de reposo se tiene en cuenta también para los atlases.

El cuerpo conserva su proporción al cambiar de estado; una pose encogida tiene una silueta más baja, y los brazos o efectos elevados pueden ocupar más espacio. No se fuerza a que todos los rectángulos midan lo mismo ni se estiran por separado ancho y alto. Hay calibraciones para las hojas de recarga de El Fiel y los dibujos de salto, patada, giro y recarga de Ingestrella que tenían otra resolución corporal.

## Diseño original de Kike

La primera adaptación extraía 37 cuadros PNG de `kikeparker.zip`. Algunos tenían otra complexión. La [revisión de identidad](IDENTIDAD-KIKE.md) los sustituye por 20 dibujos basados en la guardia original y deja 38 entradas en el manifiesto, que registra la procedencia de cada una. Se conserva intacta la guardia de referencia.

- Se sustituyen los dibujos anteriores de caminar, patada aérea, recarga e invocación por los originales del usuario.
- El agarre usa ocho poses, dura 1.24 segundos y mantiene el lanzamiento vertical, el escape y sus 14 puntos de daño.
- El descendente tiene ocho fases de animación, con anticipación, invocación, golpe y recuperación, conservando alcance y daño.
- La ulti conserva diez tigrillos que persiguen al rival y sus reglas de escudo y choque de poderes.
- Tigrillos de la ulti: ancho visual de 65 a 84 unidades. Tigrillo del descendente: de 96 a 116. El cambio visual no aumenta daño ni alcance.
- Se añaden aura dorada, destellos, espirales, anillos y arañazos sincronizados. Se respeta la opción de efectos reducidos.

Recursos: `assets/personajes/kike-parker/original-zip`. La entrega continúa siendo el único HTML de `outputs`; el código editable permanece en `work/github-deploy`.
