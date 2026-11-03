# Integración de Dadick en la versión 0.11

Se integra la rama `Dadick` hasta `709dd28`, incluidos los cambios `c5f11ed` y `a62fc1a`.

- Nuevo atlas de Ingestrella de 31 cuadros: patada media, puñetazo bajo y cuatro poses de agarre con carpeta.
- El proyectil de código nace a 160 px sobre el suelo y 90 px delante del personaje; se dibuja con `{<>}` y una estela de ceros y unos.
- El origen de los proyectiles queda configurable por personaje y se conserva el origen del balón de Joshi.
- La CPU reserva los especiales cuerpo a cuerpo de Lancha y Kike para corta distancia.

Se resuelven los conflictos de dibujo y guía sin perder los tigrillos de Kike ni los módulos de la versión 0.11. La patada media anterior de Ingestrella deja de sustituir a la nueva del atlas; su patada aérea reciente permanece activa.

La organización local sigue siendo `work/github-deploy` para editar y `outputs/Manchester-FISI-Fighter-v0.11.html` para jugar. `node build.cjs` actualiza esa única entrega.

Verificación específica: 15 comprobaciones de poses, daño, origen de proyectiles e IA. También se ejecuta la regresión de selección, combate y agarres de la versión 0.11.
