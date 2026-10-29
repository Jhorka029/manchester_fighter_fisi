// Recursos de la versión actual. Cada pose pertenece únicamente a su personaje.
const GAME_ASSETS = {
  "version": "0.5",
  "crest": "assets/interfaz/escudo-fisi.png",
  "stages": [
    {
      "id": "patio-fisi",
      "name": "Patio FISI",
      "location": "Campus · Atardecer",
      "image": "assets/escenarios/patio-fisi.png"
    },
    {
      "id": "entrada-unsm",
      "name": "Entrada UNSM",
      "location": "Ciudad Universitaria · Tarapoto",
      "image": "assets/escenarios/entrada-unsm.png"
    },
    {
      "id": "cafeteria",
      "name": "La cafetería",
      "location": "Campus · Mediodía",
      "image": "assets/escenarios/cafeteria.png"
    },
    {
      "id": "plaza-rioja",
      "name": "Plaza de Rioja",
      "location": "Rioja · San Martín",
      "image": "assets/escenarios/plaza-rioja.png"
    }
  ],
  "characters": [
    {
      "id": "lancha",
      "name": "LANCHA",
      "portrait": "assets/personajes/lancha/retrato.png",
      "base": [
        "assets/personajes/lancha/movimientos/guardia.png",
        "assets/personajes/lancha/movimientos/caminar.png",
        "assets/personajes/lancha/movimientos/puno-alto.png",
        "assets/personajes/lancha/movimientos/patada-alta.png",
        "assets/personajes/lancha/movimientos/especial.png",
        "assets/personajes/lancha/movimientos/reaccion.png"
      ],
      "moves": [
        {
          "src": "assets/personajes/lancha/movimientos/agachado.png",
          "height": 271
        },
        {
          "src": "assets/personajes/lancha/movimientos/puno-bajo.png",
          "height": 250
        },
        {
          "src": "assets/personajes/lancha/movimientos/patada-baja.png",
          "height": 242
        },
        {
          "src": "assets/personajes/lancha/movimientos/patada-media.png",
          "height": 347
        },
        {
          "src": "assets/personajes/lancha/movimientos/patada-aerea.png",
          "height": 284
        },
        {
          "src": "assets/personajes/lancha/movimientos/descendente.png",
          "height": 386
        }
      ],
      "follow": [
        {
          "src": "assets/personajes/lancha/movimientos/preparacion-descendente.png",
          "height": 380
        },
        {
          "src": "assets/personajes/lancha/movimientos/reaccion-agachado.png",
          "height": 303
        },
        {
          "src": "assets/personajes/lancha/movimientos/aterrizaje.png",
          "height": 320
        },
        {
          "src": "assets/personajes/lancha/movimientos/continuacion-especial.png",
          "height": 398
        }
      ],
      "show": [
        {
          "src": "assets/personajes/lancha/movimientos/salto-subida.png",
          "height": 348
        },
        {
          "src": "assets/personajes/lancha/movimientos/salto-caida.png",
          "height": 411
        },
        {
          "src": "assets/personajes/lancha/movimientos/presentacion-1.png",
          "height": 438
        },
        {
          "src": "assets/personajes/lancha/movimientos/presentacion-2.png",
          "height": 433
        }
      ],
      "roll": [
        {
          "src": "assets/personajes/lancha/movimientos/rodada-01.png",
          "height": 248
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-02.png",
          "height": 242
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-03.png",
          "height": 204
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-04.png",
          "height": 216
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-05.png",
          "height": 236
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-06.png",
          "height": 241
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-07.png",
          "height": 219
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-08.png",
          "height": 227
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-09.png",
          "height": 250
        },
        {
          "src": "assets/personajes/lancha/movimientos/rodada-10.png",
          "height": 227
        }
      ]
    },
    {
      "id": "el-fiel",
      "name": "EL FIEL",
      "portrait": "assets/personajes/el-fiel/retrato.png",
      "base": [
        "assets/personajes/el-fiel/movimientos/guardia.png",
        "assets/personajes/el-fiel/movimientos/caminar.png",
        "assets/personajes/el-fiel/movimientos/puno-alto.png",
        "assets/personajes/el-fiel/movimientos/patada-alta.png",
        "assets/personajes/el-fiel/movimientos/especial.png",
        "assets/personajes/el-fiel/movimientos/reaccion.png"
      ],
      "moves": [
        {
          "src": "assets/personajes/el-fiel/movimientos/agachado.png",
          "height": 284
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/puno-bajo.png",
          "height": 270
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/patada-baja.png",
          "height": 262
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/patada-media.png",
          "height": 373
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/patada-aerea.png",
          "height": 293
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/descendente.png",
          "height": 414
        }
      ],
      "follow": [
        {
          "src": "assets/personajes/el-fiel/movimientos/preparacion-descendente.png",
          "height": 424
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/reaccion-agachado.png",
          "height": 332
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/aterrizaje.png",
          "height": 344
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/continuacion-especial.png",
          "height": 473
        }
      ],
      "show": [
        {
          "src": "assets/personajes/el-fiel/movimientos/salto-subida.png",
          "height": 352
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/salto-caida.png",
          "height": 439
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/presentacion-1.png",
          "height": 458
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/presentacion-2.png",
          "height": 457
        }
      ],
      "roll": [
        {
          "src": "assets/personajes/el-fiel/movimientos/aspa-01.png",
          "height": 134
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/aspa-02.png",
          "height": 176
        },
        {
          "src": "assets/personajes/el-fiel/movimientos/aspa-03.png",
          "height": 197
        }
      ]
    }
  ]
};
