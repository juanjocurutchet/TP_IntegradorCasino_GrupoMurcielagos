"use strict";
/* La clase jugador se encarga de manejar las apuestas, el dinero del jugador y de elegir el juego al que desea jugar.
Tiene como atributos el nombre, el dinero y la apuesta que va a realizar.Cuando apuesta solo puede apostar mayor a 0 y
menor a la cantidad de fichas que posee. Cada vez que la apuesta es aceptada se le descuenta del dinero, y si gana se le
reintegra junto al premio.Tambien existe un metodo por si se queda sin fichas para recargar fichas.*/
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
exports.Jugador = void 0;
const readlineSync = __importStar(require("readline-sync"));
class Jugador {
    constructor(pNombre, pDinero) {
        this.nombre = pNombre;
        this.dinero = pDinero;
        this.apuesta = 0;
    }
    getNombre() {
        return this.nombre;
    }
    getDinero() {
        return this.dinero;
    }
    getApuesta() {
        return this.apuesta;
    }
    setNombre(pNombre) {
        this.nombre = pNombre;
    }
    setApuesta(pApuesta) {
        this.apuesta = pApuesta;
    }
    setDinero(pDinero) {
        this.dinero = pDinero;
    }
    apostar(pPantalla) {
        do {
        } while (pPantalla.comprobacionDatoIngresado(this.dinero, 1, 2, this) === false); // hace comprobacion de datos si es falso va a seguir preguntando
        this.dinero = this.dinero - this.apuesta; // al dinero le resta la apuesta realizada
    }
    agregarSaldo() {
        let valor;
        console.log("\n");
        if (readlineSync.keyInYN("¿Desea comprar mas fichas? ")) {
            valor = readlineSync.questionInt("Ingrese la cantidad de fichas que quiere comprar: ".toUpperCase());
            if (valor >= 0) {
                this.dinero = this.dinero + valor;
            }
            else {
                console.log(`No se puede comprar en negativo`);
            }
        }
    }
    jugar(pPantalla, pCasino) {
        let valor;
        do {
            valor = pPantalla.menuPantalla();
            if ((valor > 0) && (valor < 5)) {
                pCasino.fabrica(valor, pPantalla);
            }
            else {
                if ((valor < 0) || (valor >= 5)) {
                    console.log("Debe ingresar opciones del menu".toUpperCase());
                    console.log("\n");
                    pPantalla.pausaConsola();
                }
            }
        } while (valor != 0);
    }
}
exports.Jugador = Jugador;
