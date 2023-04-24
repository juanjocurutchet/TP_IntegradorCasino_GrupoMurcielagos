"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frutas = void 0;
class Frutas {
    constructor(pNombre) {
        this.nombre = pNombre;
    }
    setNombre(pNombre) {
        this.nombre = pNombre;
    }
    getNombre() {
        return this.nombre;
    }
}
exports.Frutas = Frutas;
