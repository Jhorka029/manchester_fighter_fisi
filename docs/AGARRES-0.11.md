# Revisión local 0.11

- Lancha usa dos imágenes nuevas y completas al descender y aterrizar; conserva el diseño del polo morado.
- Lancha y El Fiel tienen ocho poses de agarre cada uno, con aura, destellos y anillos de impacto. El suplex de El Fiel dispone de más tiempo para mostrar la elevación y caída. Se conservan daño y escape del agarre.
- La selección de escenario tiene una lista desplazable y «Al azar» aparece primero. Clic para marcar; «Elegir escenario» confirma.
- Se conserva una única versión autónoma en outputs y el código editable en work/github-deploy. Se retiran entregas y pruebas intermedias y recursos multimedia sin referencias en el juego.
- Arte nuevo generado con image_gen integrado. Frames en assets/personajes/lancha/agarres y assets/personajes/el-fiel/agarres. Prompt en AGARRES-PROMPT-0.11.json.

Esta revisión se integra en `main`. GitHub Pages utiliza los archivos de la raíz del repositorio; el generador detecta la organización local y mantiene una sola entrega en `bue/outputs`.
