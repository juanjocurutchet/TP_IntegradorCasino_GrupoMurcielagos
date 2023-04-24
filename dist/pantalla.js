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
exports.Pantalla = void 0;
const readlineSync = __importStar(require("readline-sync"));
const colors_1 = require("colors");
class Pantalla {
    constructor(pPantalla) {
        this.pantalla = pPantalla;
    }
    getPantalla() {
        return this.pantalla;
    }
    setPantalla(pPantalla) {
        this.pantalla = pPantalla;
    }
    bienvenido(pTitulo) {
        console.log((0, colors_1.red)(`BIENVENIDO A ${pTitulo}\n`.toUpperCase()));
        console.log((0, colors_1.green)(`Que comience el juego\n`.toUpperCase()));
    }
    mostrarPantallaInicio(pTitulo) {
        console.log("\n");
        console.log((0, colors_1.yellow)(`                  ${pTitulo}\n`.toUpperCase()));
        console.log("\n");
        console.log((0, colors_1.blue)("======================================================="));
        console.log("\n");
        console.log((0, colors_1.red)("                  MUCHA SUERTE EN SU TIRADA      \n"));
        console.log((0, colors_1.red)("           TRULULULULULULU TRULULULULU TRULULULU\n"));
        this.pausaConsola();
        console.log("\n");
        switch (pTitulo) {
            case "La fruta de la fortuna":
                for (let i = 0; i < 3; i++) {
                    console.log((0, colors_1.blue)(`Fila ${i + 1}.....`));
                    console.log((0, colors_1.blue)("------ -----// " + (0, colors_1.green)(this.pantalla[i]) + " // " + (0, colors_1.green)(this.pantalla[i + 3]) + " // " + (0, colors_1.green)(this.pantalla[i + 6]) + " // --------"));
                }
                console.log(`\n`);
                break;
            case "Las cartas tienen magia":
                for (let i = 0; i < 3; i++) {
                    console.log((0, colors_1.blue)(`Fila ${i + 1}.....`));
                    console.log((0, colors_1.blue)("------ -----// " + (0, colors_1.green)(this.pantalla[i]) + " // " + (0, colors_1.green)(this.pantalla[i + 3]) + " // " + (0, colors_1.green)(this.pantalla[i + 6]) + " // " + (0, colors_1.green)(this.pantalla[i + 9]) + " // --------"));
                }
                console.log(`\n`);
                break;
            case "A las cartas, Mayor o Menor":
                this.borrarConsola();
                for (let i = 0; i < this.pantalla.length; i++) {
                    console.log(this.pantalla[i]);
                }
                console.log(`\n`);
                break;
            case "Dados, dados y mas dados":
                for (let i = 0; i < 5; i++) {
                    console.log(this.pantalla[i]);
                }
                console.log(`\n`);
                break;
            default:
                console.log("algo fallo");
        }
    }
    mostrarMensaje() {
        for (let i = 0; i < this.pantalla.length; i++) {
            console.log(`${this.pantalla[i]}`);
        }
    }
    mostrarProbabilidades() {
        console.log("\n");
        console.log((0, colors_1.yellow)(`          Las probabilidades de ganar son\n`.toUpperCase()));
        console.log("\n");
        console.log((0, colors_1.blue)("======================================================="));
        for (let i = 0; i < this.pantalla.length; i++) {
            console.log((0, colors_1.green)(this.pantalla[i]));
            console.log("\n");
        }
        console.log((0, colors_1.red)("                  MUCHA SUERTE CON SU APUESTA      \n"));
    }
    mostrarReglas(pJuego) {
        console.log("\n");
        console.log((0, colors_1.yellow)(`          bienvenido a ${pJuego}\n`.toUpperCase()));
        console.log((0, colors_1.yellow)(`     el juego conciste en los siguientes puntos\n`.toUpperCase()));
        console.log("\n");
        console.log((0, colors_1.blue)("======================================================="));
        for (let i = 0; i < this.pantalla.length; i++) {
            console.log((0, colors_1.green)(this.pantalla[i]));
        }
    }
    menuPantalla() {
        console.clear();
        console.log((0, colors_1.blue)("====================================="));
        console.log((0, colors_1.red)(`||                                 ||`));
        console.log((0, colors_1.red)(`||   BIENVENIDO A NUESTRO CASINO   ||`));
        console.log((0, colors_1.red)(`||                                 ||`));
        console.log((0, colors_1.red)(`||   ESTOS  SON NUESTROS JUEGOS    ||`));
        console.log((0, colors_1.red)(`||                                 ||`));
        console.log((0, colors_1.blue)("====================================="));
        console.log((0, colors_1.green)("||                                 ||"));
        console.log((0, colors_1.green)("||   1 - Tragamonedas de frutas    ||"));
        console.log((0, colors_1.green)("||   2 - Tragamonedas de cartas    ||"));
        console.log((0, colors_1.green)("||   3 - Juego de mayor o menor    ||"));
        console.log((0, colors_1.green)("||   4 - Juego de cinco dados      ||"));
        console.log((0, colors_1.green)("||                                 ||"));
        console.log((0, colors_1.blue)("====================================="));
        console.log((0, colors_1.green)("||   0 - Salir                     ||"));
        console.log((0, colors_1.blue)("=====================================\n"));
        return readlineSync.questionInt("Ingrese una opcion del menu: ".toUpperCase());
    }
    mensajesError(indice) {
        switch (indice) {
            case 1:
                console.log(`Debe ingresar opciones del menu\n`.toUpperCase());
                break;
            case 2:
                console.log(`Ingrese 1 o 2, no puede ingresar cualquier cosa\n`.toUpperCase());
                break;
            default:
                break;
        }
        this.pausaConsola();
    }
    comprobacionDatoIngresado(pMax, pMin, situacion, pJugadoor) {
        let condicion = false;
        switch (situacion) {
            case 1:
                const valor = readlineSync.questionInt(`Ingrese un juego`.toUpperCase());
                if ((valor < pMin) && (valor > pMax)) {
                    console.log((0, colors_1.green)(`No puede ingresar ${(0, colors_1.red)(`${valor}`)}, no es una opción del ${(0, colors_1.red)(`menu`)}`.toUpperCase()));
                }
                else {
                    condicion = true;
                }
                break;
            default:
                const valor1 = readlineSync.questionInt("Ingrese su apuesta: ".toUpperCase());
                if (valor1 < pMin) {
                    console.log((0, colors_1.green)(`No puede apostar ${(0, colors_1.red)(`${valor1}`)}, no se puede apostar en ${(0, colors_1.red)(`negativo`)}`.toUpperCase()));
                }
                else {
                    if (valor1 > pMax) {
                        console.log((0, colors_1.green)(`No puede apostar ${(0, colors_1.red)(`${valor1}`)}, no puede apostar mas de lo que tiene`.toUpperCase()));
                    }
                    else {
                        condicion = true;
                        pJugadoor.setApuesta(valor1);
                    }
                }
                break;
        }
        return condicion;
    }
    borrarConsola() {
        console.clear();
    }
    pausaConsola() {
        readlineSync.question("Presiona " + (0, colors_1.green)("Enter") + " para continuar...");
    }
}
exports.Pantalla = Pantalla;
