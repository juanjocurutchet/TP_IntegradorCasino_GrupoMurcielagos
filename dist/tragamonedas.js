"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamonedas = void 0;
const readlineSync = __importStar(require("readline-sync"));
const colors_1 = require("colors");
class Tragamonedas {
    constructor(pJugador, pNombre) {
        this.jugador = pJugador;
        this.nombre = pNombre;
    }
    getNombreTragamonedas() {
        return this.nombre;
    }
    setNombreTragamoneda(pNombre) {
        this.nombre = pNombre;
    }
    entregarPremio() {
        let premio = new Array;
        const valor = this.calcularPremio(); //llama al metodo calcular premio para saber si gano o perdio
        premio.push(`${(0, colors_1.red)(`SU APUESTA ES DE: ${this.jugador.getApuesta()}\n`)}`);
        if (valor !== 0) {
            premio.push(`${(0, colors_1.green)(`Felicitaciones... gano\n`.toUpperCase())}`); // si el valor es distinto de 0 quiere decir que gano y da mensaje de felicitaciones
            premio.push(`${(0, colors_1.green)(`Su premio es de ${valor}\n`)}`);
            this.jugador.setDinero(valor + this.jugador.getDinero());
        }
        else {
            premio.push(`${(0, colors_1.green)(`Desafortunadamente perdio`.toUpperCase())}`); // si es 0 quiere decir que perdio y da mensaje de derrota
        }
        premio.push(`${(0, colors_1.green)(`Ahora le quedan ${this.jugador.getDinero()} fichas\n`)}`); // carga al array para luego mostrar en pantalla la cantidad de fichas que le quedan
        return premio;
    }
    juego(pPantalla) {
        let strPantalla = new Array();
        pPantalla.borrarConsola(); // borra la consola
        pPantalla.setPantalla(this.reglamentoJuego()); // setea el arreglo a mostrar en pantalla con las reglas del juego
        pPantalla.mostrarReglas(this.getNombreTragamonedas()); // muestra el reglamento en pantalla
        pPantalla.pausaConsola();
        this.cargarGuia();
        do {
            strPantalla = [];
            pPantalla.borrarConsola(); // borra la pantalla
            pPantalla.bienvenido(this.getNombreTragamonedas());
            pPantalla.borrarConsola();
            strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            pPantalla.setPantalla(strPantalla);
            pPantalla.mostrarMensaje();
            strPantalla = [];
            this.jugador.apostar(pPantalla);
            this.setTirada();
            pPantalla.borrarConsola();
            pPantalla.setPantalla(this.mostrarEnPantalla());
            pPantalla.mostrarPantallaInicio(this.getNombreTragamonedas());
            strPantalla.push.apply(strPantalla, this.entregarPremio());
            pPantalla.setPantalla(strPantalla);
            pPantalla.mostrarMensaje();
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    }
}
exports.Tragamonedas = Tragamonedas;
