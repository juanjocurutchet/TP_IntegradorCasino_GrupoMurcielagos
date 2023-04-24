"use strict";
/* Esta clase es la entrada al casino, como la mesa de entrada, en ella esta el nombre del casino, con los metodos para leerlo
y modificarlo. Y también el metodo para inscribirse y comenzar a jugar, como asi tambien un metodo que llama a los juegos
disponibles segun la eleccion del jugador.
*/
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
exports.Casino = void 0;
const pantalla_1 = require("./pantalla");
const readlineSync = __importStar(require("readline-sync"));
const tragamonedasCartas_1 = require("./tragamonedasCartas");
const tragamonedasFrutas_1 = require("./tragamonedasFrutas");
const dados_1 = require("./dados");
const mayorOmenor_1 = require("./mayorOmenor");
class Casino {
    constructor(pJugador) {
        this.nombre = "LA VIRULETA";
        this.tragamonedasFrutas = new tragamonedasFrutas_1.TragamonedasFrutas(pJugador, "La fruta de la fortuna");
        this.tragamonedasCartas = new tragamonedasCartas_1.TragamonedasCartas(pJugador, "Las cartas tienen magia");
        this.mayorOmenor = new mayorOmenor_1.MayorOmenor(pJugador, "A las cartas, Mayor o Menor");
        this.dados = new dados_1.Dados(pJugador, "Dados, dados y mas dados");
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(pNombre) {
        this.nombre = pNombre;
    }
    inscripcion(pJugador) {
        const pantalla = new pantalla_1.Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombre);
        pantalla.pausaConsola();
        const nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        const dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        pJugador.setDinero(dinero);
        pJugador.setNombre(nombreAinscribirse);
        pJugador.jugar(pantalla, this);
        pantalla.borrarConsola();
        console.log(`Gracias ${pJugador.getNombre()} por apostar en ${this.nombre}`);
        console.log(`Puede canjear las ${pJugador.getDinero()} fichas que gano`);
        console.log("Vuelva pronto");
        pantalla.pausaConsola();
    }
    fabrica(pIndice, pPantalla) {
        switch (pIndice) {
            case 1:
                this.tragamonedasFrutas.juego(pPantalla);
                break;
            case 2:
                this.tragamonedasCartas.juego(pPantalla);
                break;
            case 3:
                this.mayorOmenor.juego(pPantalla);
                break;
            case 4:
                this.dados.jugar(pPantalla);
                break;
            case 0:
                console.log("Gracias por sumarte al Casino");
                break;
            default:
                console.log("No pertence a este Casino");
        }
    }
}
exports.Casino = Casino;
