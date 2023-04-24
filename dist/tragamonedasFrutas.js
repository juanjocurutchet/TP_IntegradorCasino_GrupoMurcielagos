"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TragamonedasFrutas = void 0;
const tragamonedas_1 = require("./tragamonedas");
const frutas_1 = require("./frutas");
class TragamonedasFrutas extends tragamonedas_1.Tragamonedas {
    constructor(pJugador, pNombre) {
        super(pJugador, pNombre);
        this.guia = new Array();
        this.tirada = [];
    }
    reglamentoJuego() {
        const reglamento = new Array;
        reglamento.push(`El juego consiste en conseguir tres frutas iguales`);
        reglamento.push(`Cada guia tiene quince frutas`);
        reglamento.push(`Son tres guias, y no van a salir dos frutas iguales en la misma guia`);
        reglamento.push(`Si salen tres frutas iguales en alguna diagonal obtendra quince veces la apuesta`);
        reglamento.push(`Si salen tres frutas iguales en la misma linea obtendra diez veces la apuesta`);
        reglamento.push(`si salen dispersas en distintas guias obtendras cinco veces la apuesta.\n`);
        return reglamento;
    }
    cargarGuia() {
        let fruta0 = new frutas_1.Frutas(" frutilla ");
        let fruta1 = new frutas_1.Frutas("  banana  ");
        let fruta2 = new frutas_1.Frutas("  manzana ");
        let fruta3 = new frutas_1.Frutas("   pera   ");
        let fruta4 = new frutas_1.Frutas("   mango  ");
        let fruta5 = new frutas_1.Frutas(" arandano ");
        let fruta6 = new frutas_1.Frutas("  cereza  ");
        let fruta7 = new frutas_1.Frutas("    uva   ");
        let fruta8 = new frutas_1.Frutas("   kiwi   ");
        let fruta9 = new frutas_1.Frutas("  naranja ");
        let fruta10 = new frutas_1.Frutas(" mandarina");
        let fruta11 = new frutas_1.Frutas("  sandia  ");
        let fruta12 = new frutas_1.Frutas("   melon  ");
        let fruta13 = new frutas_1.Frutas("   caqui  ");
        let fruta14 = new frutas_1.Frutas("   anana  ");
        this.guia.push(fruta0, fruta1, fruta2, fruta3, fruta4, fruta5, fruta6, fruta7, fruta8, fruta9, fruta10, fruta11, fruta12, fruta13, fruta14);
    }
    setTirada() {
        this.tirada = [];
        let indice;
        for (let i = 0; i < 3; i++) {
            this.tirada[i] = [];
            for (let j = 0; j < 3; j++) {
                indice = Math.floor(Math.random() * 15);
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
        for (let i = 0; i < this.tirada.length; i++) {
            for (let j = 0; j < this.tirada[i].length; j++) {
                aux.push(`${this.guia[this.tirada[i][j]].getNombre()}`);
            }
        }
        return aux;
    }
    verificarTresIguales() {
        let condicion = false;
        let cantidad = new Array();
        cantidad.push(1, 1, 1);
        for (let i = 1; i < 3; i++) {
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
            }
        }
        if (cantidad.includes(3)) {
            condicion = true;
        }
        return condicion;
    }
    verificarLinea() {
        let condicion = false;
        for (let i = 0; i < 3; i++) {
            if ((this.tirada[1][i] === this.tirada[0][i]) && (this.tirada[2][i] === this.tirada[0][i])) {
                condicion = true;
            }
        }
        return condicion;
    }
    verificarDiagonal() {
        let condicion = false;
        if ((this.tirada[0][0] === this.tirada[1][1]) && (this.tirada[2][2] === this.tirada[1][1])) {
            condicion = true;
        }
        else if ((this.tirada[0][2] === this.tirada[1][1]) && (this.tirada[2][0] === this.tirada[1][1])) {
            condicion = true;
        }
        return condicion;
    }
    calcularPremio() {
        let premio = 0;
        if (this.verificarTresIguales() === true) { //Verifica que haya tres frutas iguales. Si hay tres iguales entrega 5 veces la apuesta
            premio = this.jugador.getApuesta() * 5;
        }
        if (this.verificarLinea() === true) { //Verifica que haya tres frutas iguales en linea. Si hay tres en linea entrega 10 veces la apuesta
            premio = premio * 2;
        }
        else if (this.verificarDiagonal() === true) { //Verifica que haya tres frutas iguales en diagonal. Si hay tres iguales entrega 15 veces la apuesta
            premio = premio * 3;
        }
        return premio; // retorna el premio, si todas fallaron es 0;
    }
}
exports.TragamonedasFrutas = TragamonedasFrutas;
