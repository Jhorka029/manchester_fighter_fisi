# Recursos de la versión 0.5

```text
assets/
  escenarios/
    patio-fisi.png
    entrada-unsm.png
    cafeteria.png
    plaza-rioja.png
  interfaz/
    escudo-fisi.png
  publico/
    espectadores.png               # 21 espectadores en un atlas (posiciones en game-v4.js)
  personajes/
    lancha/
      retrato.png
      movimientos/                 # 30 PNG transparentes
      recarga.png                  # hamburguesa: 4 cuadros de recarga de energía
      salto-doble.png              # salto, picada y aterrizaje de panza
    el-fiel/
      retrato.png
      movimientos/                 # 23 PNG transparentes
      recarga.png                  # 2 cuadros de recarga
      super.png                    # 4 cuadros de la super
      voltereta-preparacion.png    # cuadro previo de la voltereta
      voltereta.png                # 4 cuadros de la voltereta
    kent/
      atlas.png                    # 25 poses en un solo atlas
      retrato.png
    pingordy/
      atlas.png
      retrato.png
    ingestrella/
      atlas.png
      retrato.png
    kike-parker/
      atlas.png
      retrato.png
    cardenas/
      atlas.png
      retrato.png
    pepelucho/
      atlas.png
      retrato.png
```

Kent, Pingordy, Ingestrella, Kike Parker, Cárdenas y Pepelucho usan un atlas por personaje (`atlas.png`, con las posiciones en `game-v4.js`), no un PNG por pose. Las imágenes de cada personaje están en su carpeta.

Las poses compartidas en los atlas anteriores se exportaron por separado usando los recortes y dimensiones del motor. Cada personaje tiene guardia, caminar, puños, patadas, agachado, reacciones, aterrizaje, salto, presentación y especial. Lancha añade diez cuadros de rodada; El Fiel, tres cuadros de aspa de molino.

`asset-catalog.js` mantiene los grupos `base`, `moves`, `follow`, `show` y `roll`. El orden y las alturas originales son importantes: el motor y sus animaciones siguen usándolos. Para reemplazar una pose, edita su PNG y conserva sus dimensiones o actualiza la altura en el catálogo.

Los originales de los atlas y sus recortes permanecen recuperables en el historial de Git. Ya no se cargan atlas con ambos personajes juntos ni se recortan durante la partida.

Los escenarios nuevos se incorporaron tal como fueron proporcionados. La cancha nocturna adjunta no forma parte de los tres escenarios solicitados para esta entrega.

El escudo fue adaptado con la herramienta integrada de imágenes: se conservan el engranaje, el mapa verde, el globo, el triángulo amarillo, la mano y la computadora, con texto reducido a UNSM/FISI para su lectura en pixel art.

Prompt del escudo:

Use case: style-transfer. Asset type: transparent 16-bit arcade game faculty crest. Transform the attached FISI UNSM faculty crest into crisp authentic 16-bit pixel art, a compact readable emblem for the game Manchester FISI Fighter. Preserve the distinctive round purple disk, dark steel gear rim, green regional map, blue-and-gold globe at top, yellow triangle connecting the pointing hand left and desktop computer plus keyboard right. Retain the overall layout and recognizable identity. Make it a polished SNES/1990s arcade crest with clean stepped pixel edges, limited palette, chunky black outlines and 3-tone shading. No gradients or painterly antialiasing. Use purple, emerald green, gold and cyan, subtle golden rim highlights. Lettering can be simplified to 'FISI' across a small lower ribbon and 'UNSM' on center, exact short text only; do NOT reproduce the long circular faculty text because it is unreadable at small sizes. Single centered symmetrical emblem, entire gear visible, isolated on actual transparent background, no white square, no backdrop, no extra objects or slogan. Pixel art readable at 192x192 logical pixels; output may be enlarged by nearest neighbour. Preserve hand, globe, map, triangle and computer as icon clusters.
