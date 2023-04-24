"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cartas = void 0;
const colors_1 = require("colors");
class Cartas {
    constructor(pCartas) {
        this.cartas = pCartas;
    }
    setCartas(pCartas) {
        this.cartas = pCartas;
    }
    getCartas() {
        return this.cartas;
    }
    deQuePaloEs(pPalo) {
        return this.cartas.includes(pPalo);
    }
    mostrarCartaPantalla(pCarta) {
        let strCarta;
        if (pCarta === true) {
            strCarta = `La carta en la mesa es ${(0, colors_1.red)(`${this.cartas}`)}`;
        }
        else {
            strCarta = `La nueva carta es ${(0, colors_1.red)(`${this.cartas}`)}`;
        }
        return strCarta;
    }
}
exports.Cartas = Cartas;
