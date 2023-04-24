"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casino_1 = require("./casino");
const jugador_1 = require("./jugador");
let jugador = new jugador_1.Jugador("", 0);
let casino = new casino_1.Casino(jugador);
casino.inscripcion(jugador);
