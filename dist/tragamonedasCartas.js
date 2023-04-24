"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TragamonedasCartas = void 0;
const mazo_1 = require("./mazo");
const tragamonedas_1 = require("./tragamonedas");
class TragamonedasCartas extends tragamonedas_1.Tragamonedas {
    constructor(pJugador, pNombre) {
        super(pJugador, pNombre);
        this.tirada = new Array();
        this.mazo = new mazo_1.Mazo();
        this.guia = new Array();
    }
    reglamentoJuego() {
        const reglamento = new Array;
        reglamento.push(`El juego consiste en conseguir cuatro cartas con el mismo numero`);
        reglamento.push(`Cada guia tiene 14 cartas, del 1 al 13 mas el comodin`);
        reglamento.push(`Son cuatro guias, y no van a salir dos cartas iguales en la misma guia`);
        reglamento.push(`Si salen cuatro cartas iguales en la misma linea obtendra veinticinco veces la apuesta`);
        reglamento.push(`si salen dispersas en distintas guias obtendras cinco veces la apuesta.\n`);
        return reglamento;
    }
    cargarGuia() {
        this.mazo.cargarMazo();
        let auxMazo = new mazo_1.Mazo();
        for (let i = 0; i < 4; i++) {
            auxMazo.setMazo(auxMazo.cargarPalo(i));
            this.guia.push(auxMazo);
        }
    }
    setTirada() {
        this.tirada = [];
        let indice;
        for (let i = 0; i < 4; i++) {
            this.tirada[i] = [];
            for (let j = 0; j < 3; j++) {
                indice = Math.floor(Math.random() * 14);
                if (this.tirada[i].includes(indice)) {
                    j = j - 1;
                }
                else {
                    this.tirada[i].push(indice);
                }
            }
        }
    }
    mostrarEnPantalla() {
        let aux = new Array;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                aux.push(`${this.mazo.getMazo()[this.tirada[i][j] + (14 * i)].getCartas()}`);
            }
        }
        return aux;
    }
    verificarCuatroIguales() {
        let condicion = false;
        let cantidad = new Array();
        cantidad.push(1, 1, 1, 1);
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.tirada[i][j] === this.tirada[0][0]) {
                    cantidad[0] = cantidad[0] + 1;
                }
                if (this.tirada[i][j] === this.tirada[0][1]) {
                    cantidad[1] = cantidad[1] + 1;
                }
                if (this.tirada[i][j] === this.tirada[0][2]) {
                    cantidad[2] = cantidad[2] + 1;
                }
                if (this.tirada[i][j] === this.tirada[0][3]) {
                    cantidad[3] = cantidad[3] + 1;
                }
            }
        }
        if (cantidad.includes(4)) {
            condicion = true;
        }
        return condicion;
    }
    verificarLinea() {
        let condicion = false;
        for (let i = 0; i < 3; i++) {
            if ((this.tirada[1][i] === this.tirada[0][i]) && (this.tirada[2][i] === this.tirada[0][i]) && (this.tirada[3][i] === this.tirada[0][i])) {
                condicion = true;
            }
        }
        return condicion;
    }
    calcularPremio() {
        let premio = 0;
        if (this.verificarCuatroIguales() === true) { //Verifica que haya cuatro cartas iguales. Si hay cuatro iguales entrega 5 veces la apuesta
            premio = this.jugador.getApuesta() * 5;
        }
        if (this.verificarLinea() === true) { //Verifica que haya cuatro cartas iguales en linea. Si hay cuatro iguales entrega 25 veces la apuesta
            premio = premio * 5;
        }
        return premio; // retorna el premio, si todas fallaron es 0;
    }
}
exports.TragamonedasCartas = TragamonedasCartas;
