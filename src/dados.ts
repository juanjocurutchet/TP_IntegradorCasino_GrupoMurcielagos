import { Jugador } from "./jugador";
import * as readlineSync from 'readline-sync';
import { red, blue, green, yellow } from "colors";
import { Pantalla } from "./pantalla";

export class Dados {

        private dados: number[];
        private nombre: string;
        private jugador: Jugador;

        public constructor(jugador: Jugador, nombre: string) {

                this.dados = [];
                this.nombre = nombre;
                this.jugador = jugador;
        }

        public getdados(): number[] {
                return this.dados;
        }
        public setDados(pdados: number[]): void {
                this.dados = pdados;
        }

        public getNombreDados(): String {
                return this.nombre;
        }

        public setNombreDados(nombre: string): void {
                this.nombre = nombre;
        }

        //Calculamos el premio obtenido segun cada combinacion...

        private calcularPremio(): string {
                let premio: string = `Ah perdido, su dinero actual es de ${this.jugador.getDinero()}`;
                if (this.verificarGenerala()) {
                        premio = `¡Felicidades, obtuviste Generala! Ganaste el premio Mayor; $ ${this.jugador.getApuesta() * 10}.`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 10);
                } else if (this.verificarEscalera()) {
                        premio = `¡Felicidades, Obtuviste escalera! Ganaste el cuarto premio, $ ${this.jugador.getApuesta() * 2}`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                } else if (this.verificarPoker()) {
                        premio = `¡Felicidades, obtuviste Poker! Ganaste el tercer premio, $ ${this.jugador.getApuesta() * 4}`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 4);
                } else if (this.verificarFull()) {
                        premio = `¡Obtuviste Full! Ganaste el segundo premio, $ ${this.jugador.getApuesta() * 8}`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 8);
                } else {
                        premio = `Lo siento, no obtuviste ninguna combinación ganadora, su dinero actual es de ${this.jugador.getDinero()}`;
                }
                return premio;
        }

        //Mostramos el reglamento del juego...

        private reglamentoJuego(): string[] {
                const reglamento: string[] = new Array;
                reglamento.push(`El juego consiste en tirar cinco dados y ver las combinaciones obtenidas`);
                reglamento.push(`Primero debe apostar las fichas que cree conveniente, RECUERDE,`);
                reglamento.push(`tiene que apostar más de una ficha y menos del total de fichas que posee.`);
                reglamento.push(`Usted tiene cuatro combinaciones posibles para ganar, si salen`);
                reglamento.push(`cinco caras iguales obtiene generala, con cuatro caras iguales`);
                reglamento.push(`obtiene poker, con tres caras iguales y dos caras iguales obtiene full y`);
                reglamento.push(`si salen cinco numeros consecutivos obtiene escalera.\n`);
                reglamento.push(`Mientras menos probabilidades de ganar tenga, mayor va a ser el premio.\n`);
                return reglamento;
        }

        public jugar(pantalla: Pantalla): void {
                let strDados: string[] = new Array();
                let strPantalla: string[] = new Array();
                pantalla.borrarConsola();                                                                          // borra la consola
                pantalla.setPantalla(this.reglamentoJuego());                                                      // setea el arreglo a mostrar en pantalla con las reglas del juego
                pantalla.mostrarReglas(this.nombre);                                                               // muestra el reglamento en pantalla
                pantalla.pausaConsola();
                pantalla.borrarConsola();                                                                       // borra la pantalla
                pantalla.bienvenido(this.nombre);
                do {
                        pantalla.borrarConsola();
                        strPantalla.push.apply(strPantalla, this.probabilidad());
                        strPantalla.push(`\n`)
                        strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
                        pantalla.setPantalla(strPantalla);
                        pantalla.mostrarMensaje();
                        strPantalla = [];
                        this.jugador.apostar(pantalla);
                        this.tirarDados();
                        strDados = [];
                        for (let i: number = 0; i < 5; i++) {
                                strDados.push(`Dado ${i + 1}: ${this.dados[i]}`)
                        }
                        pantalla.setPantalla(strDados);
                        pantalla.mostrarPantallaInicio(this.nombre);
                        pantalla.pausaConsola();
                        strPantalla.push(`${red(`SU APUESTA ES DE: ${this.jugador.getApuesta()}\n`)}`);
                        strPantalla.push(this.calcularPremio());
                        strPantalla.push(`\n`)
                        pantalla.setPantalla(strPantalla);
                        pantalla.mostrarMensaje();

                } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")))



        }

        //Calculamos las probabilidades de obtenes las distintas combinaciones...

        private calcularProbabilidadCuatroIguales(): number {
                
                const numCombinacionesPrimeraPosibilidad = 6 * 5;
                const numCombinacionesSegundaPosibilidad = 6;                
                const numCombinacionesTotal = 6 ** 5;                
                const probabilidad = Number(((numCombinacionesPrimeraPosibilidad + numCombinacionesSegundaPosibilidad) / numCombinacionesTotal * 100).toFixed(3));
                return probabilidad;
        }
        private calcularProbabilidadEscalera(): number {
                
                const numEscaleras = 2;                
                const numCombinacionesOtros = 6 ** 5;                
                const numCombinacionesTotal = 6 ** 5;                
                const probabilidad = Number(((numEscaleras + numCombinacionesOtros) / numCombinacionesTotal).toFixed(3));
                return probabilidad;
        }
        private calcularProbabilidadCincoIguales(): number {
                
                const numCombinaciones = 6;                
                const numCombinacionesTotal = 6 ** 5;                
                const probabilidad = Number((numCombinaciones / numCombinacionesTotal * 100).toFixed(3));
                return probabilidad;
        }

        private calcularProbabilidadTresDosIguales(): number {
                
                const numCombinaciones = 6 * 5;                
                const numCombinacionesTotal = 6 ** 5;                
                const probabilidad = Number((numCombinaciones / numCombinacionesTotal * 100).toFixed(3));
                return probabilidad;
        }

        //Mostramos las probalidades de ganar con cada combinacion posible...

        private probabilidad(): string[] {
                const strProbabilidad = new Array();
                strProbabilidad.push(`Su probabilidad de obtener generala es de ${red(`${this.calcularProbabilidadCincoIguales()}`)} %`);
                strProbabilidad.push(`Su probabilidad de obtener escalera es de ${red(`${this.calcularProbabilidadEscalera()}`)} %`);
                strProbabilidad.push(`Su probabilidad de obtener full es de ${red(`${this.calcularProbabilidadTresDosIguales()}`)} %`);
                strProbabilidad.push(`Su probabilidad de obtener poker es de ${red(`${this.calcularProbabilidadCuatroIguales()}`)} %`);
                return strProbabilidad;

        }

        // Cargamos el arreglo dados con cinco numeros aleatorios...

        private tirarDados(): void {
                this.dados = [];
                for (let i = 0; i < 5; i++) {
                        this.dados.push(Math.floor(Math.random() * 6) + 1);
                }
        }

        /* Obtenemos el primer elemento del arreglo para compararlo con el resto.Iteramos a través 
        del resto de los elementos en el arreglo, si encontramos un elemento que no es igual al
        primer elemento, devolvemos falso. Si llegamos al final del bucle sin encontrar ningún 
        elemento diferente, devolvemos verdadero... */

        private verificarGenerala(): boolean {

                const primerElemento = this.dados[0];

                for (let i = 1; i < this.dados.length; i++) {

                        if (this.dados[i] !== primerElemento) {
                                return false;
                        }
                }

                return true;
        }

        //Verificamos las distintas combinaciones posibles...

        /* Utilizamos un bucle for para iterar sobre cada elemento del array.
        luego utilizamos otro bucle for anidado para contar el número de ocurrencias 
        en el array. Si elememento aparece cuatro veces en el array, retorna true.Si 
        el bucle exterior se completa sin encontrar cuatro números iguales, retorna false.*/

        private verificarPoker(): boolean {
                for (let i = 0; i < this.dados.length; i++) {
                        const elemActual = this.dados[i];
                        let count = 0;
                        for (let j = 0; j < this.dados.length; j++) {
                                if (this.dados[j] === elemActual) {
                                        count++;
                                }
                                if (count === 4) {
                                        return true;
                                }
                        }
                }
                return false;
        }

        /*Primero ordenamos el arreglo de menor a mayor con sort. Luego, iteramos a través de cada
        elemento del arreglo y verificamos si es igual al elemento anterior más 1. Si encontramos
        un elemento que no es consecutivo, devolvemos false. Si llegamos al final del bucle sin 
        encontrar ningún elemento que no sea consecutivo, devolvemos true. */

        private verificarEscalera(): boolean {
                this.dados.sort((a, b) => a - b);
                for (let i = 1; i < this.dados.length; i++) {
                        if (this.dados[i] !== this.dados[i - 1] + 1) {
                                return false;
                        }
                }
                return true;
        }

        /* Tomamos los valores de los dados y creamos un nuevo arreglo que contiene solo los valores 
        únicos almacenados en dados utilizando Set. Luego, verificamos si numerosUnicos contiene dos 
        valores únicos; si no es así, no puede haber un Full, por lo que la función devuelve false.
        Si hay exactamente dos valores únicos en numerosUnicos, contamos cuántas veces aparece uno de 
        ellos en dados utilizando el método filter. Si ese valor aparece exactamente dos o tres veces,
        retornamos true, de lo contrario, retornamos false. */


        private verificarFull(): boolean {
                const numerosUnicos = this.dados.reduce((acumulador: number[], valor) => {
                        if (!acumulador.includes(valor)) {
                                acumulador.push(valor);
                        }
                        return acumulador;
                }, []);


                if (numerosUnicos.length === 2) {
                        const numRepetidos = this.dados.filter((num) => num === numerosUnicos[0]).length;
                        return numRepetidos === 2 || numRepetidos === 3;
                }
                return false;
        }
}