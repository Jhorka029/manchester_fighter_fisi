# Manchester FISI Fighter

Juego de lucha 2D con estética arcade de 16 bits. Versión **0.11**.

Prototipo local: **Historia (En desarrollo)**, con cinco estudiantes, diez ciclos de aventura lateral, plataformas, enemigos, mejoras y un combate docente al final de cada nivel. [Código, físicas, niveles y controles](docs/HISTORIA-AVENTURA.md). Pendiente de publicar.

Revisión local pendiente de publicar: [proporciones corporales y Kike adaptado al ZIP original](docs/PROPORCIONES-KIKE-ZIP.md). Corrige cambios de escala entre movimientos y mejora agarre, descendente y ulti, con tigrillos más grandes.

Incluye la [integración de Dadick](docs/INTEGRACION-DADICK-0.11.md): nuevas animaciones de Ingestrella, proyectil de código a la altura de la mano y uso de especiales cuerpo a cuerpo por la CPU según la distancia.

**[Jugar en GitHub Pages](https://jhorka029.github.io/manchester_fighter_fisi/)**

## Abrir y editar

- En la organización local de `bue`, jugar sin servidor: abrir `outputs/Manchester-FISI-Fighter-v0.11.html`.
- Código editable: `work/github-deploy`, con `index.html`, módulos JavaScript, CSS y `assets`. Esta carpeta corresponde a la raíz del repositorio de GitHub; no se necesitan carpetas adicionales en el servidor.
- Generar el HTML autónomo: ejecutar `node build.cjs` desde la carpeta del código. Detecta la organización local y escribe en `bue/outputs`, sin duplicar la entrega en `dist`. En un clon independiente escribe en `outputs` dentro de ese clon. También acepta una ruta de salida explícita.
- El repositorio y su historial Git se conservan. Las versiones y entregas antiguas fueron enviadas a la Papelera.

GitHub Pages publica `index.html` y sus recursos relativos desde `main` (raíz). El HTML autónomo y los ZIP no se suben al repositorio.

## Contenido actual

Doce luchadores: Lancha, El Fiel, Kent, Pingordy, Joshi, Guichard, Adriano, Ingestrella, Kike Parker, Cárdenas, Pepelucho y Rucoba. Diez escenarios, incluida la selección al azar y Sótano FISI. Modos VS CPU, dos jugadores, entrenamiento y Batalla. Vida individual de una a cinco barras en VS, vestuario alternativo en duelos espejo, choque de ultis y daño reducido contra escudo.

La revisión 0.11 corrige el recorte al caer y aterrizar de Lancha, incorpora ocho poses de agarre para Lancha y ocho para El Fiel, añade destellos y anillos de impacto, y hace accesible la opción de escenario al azar con ratón tanto en escritorio como en móvil. Ver docs/AGARRES-0.11.md.

Los cambios locales acumulados incluyen la confirmación antes de abandonar un combate, los diez tigrillos de Kike, la rodada de Lancha, el cuchillo y la animación de quitarse el polo de El Fiel, retratos reales y tamaños visibles uniformes. La voz de activación de Kike está retirada.

## Controles

P1: A/D mover, W saltar, S agacharse, H escudo, J golpe, K patada, U descendente, L especial, I ulti, O recargar. J+K agarre. R solicita salir con confirmación.

P2: flechas; teclado numérico 1 golpe, 2 patada, 5 descendente, 3 especial, 0 ulti, 4 escudo y 6 recarga. Hay soporte para mandos.

Arte generado con image_gen integrado; prompts y detalles en docs. Los audios y retratos conservan los recursos activos del proyecto.
