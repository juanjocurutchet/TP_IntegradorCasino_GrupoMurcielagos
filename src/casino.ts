/* Esta clase es la entrada al casino, como la mesa de entrada, en ella esta el nombre del casino, con los metodos para leerlo
y modificarlo. Y también el metodo para inscribirse y comenzar a jugar, como asi tambien un metodo que llama a los juegos
disponibles segun la eleccion del jugador.
*/

import { Jugador } from "./jugador";
import { Pantalla } from "./pantalla";
import * as readlineSync from 'readline-sync';
import { TragamonedasCartas } from "./tragamonedasCartas";
import { TragamonedasFrutas } from "./tragamonedasFrutas";
import { Dados } from "./dados";
import { MayorOmenor } from "./mayorOmenor";

export class Casino{
    private nombre:string;
    private tragamonedasFrutas: TragamonedasFrutas;
    private tragamonedasCartas: TragamonedasCartas;
    private mayorOmenor: MayorOmenor;
    private dados: Dados;
    

    public constructor(pJugador:Jugador){
        this.nombre="LA VIRULETA";
        this.tragamonedasFrutas = new TragamonedasFrutas(pJugador,"La fruta de la fortuna"); 
        this.tragamonedasCartas = new TragamonedasCartas(pJugador,"Las cartas tienen magia"); 
        this.mayorOmenor = new MayorOmenor(pJugador,"A las cartas, Mayor o Menor"); 
        this.dados = new Dados(pJugador,"Dados, dados y mas dados"); 
    }

    public getNombre():string {
        return this.nombre
    }
    public setNombre(pNombre:string):void{
        this.nombre=pNombre;
    }

    public inscripcion(pJugador:Jugador):void {
        const pantalla = new Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombre);
        pantalla.pausaConsola();
        const nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        const dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        pJugador.setDinero(dinero);
        pJugador.setNombre(nombreAinscribirse);
        pJugador.jugar(pantalla,this);
        pantalla.borrarConsola();
        console.log(`Gracias ${pJugador.getNombre()} por apostar en ${this.nombre}`);
        console.log(`Puede canjear las ${pJugador.getDinero()} fichas que gano`);
        console.log("Vuelva pronto");    
        pantalla.pausaConsola();
    }

    public fabrica(pIndice:number, pPantalla:Pantalla):void{
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
