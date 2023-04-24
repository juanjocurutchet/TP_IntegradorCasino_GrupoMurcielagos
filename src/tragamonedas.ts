import { Jugador } from "./jugador";
import { Pantalla } from "./pantalla";
import * as readlineSync from 'readline-sync';
import  {red, blue, green,yellow} from "colors";

export abstract class Tragamonedas {
    private nombre:string;
    protected jugador:Jugador;



    public constructor(pJugador:Jugador,pNombre: string){
        this.jugador=pJugador;
        this.nombre=pNombre;
    }

    protected getNombreTragamonedas():string{
        return this.nombre;
    }

    public setNombreTragamoneda(pNombre:string):void{
        this.nombre=pNombre;        
    }

    private entregarPremio():string[]{                                                          // Genera mensajes de entrega de premio, y llama a los metodos para saber si gano o perdio
        let premio:string[]=new  Array;
        const valor=this.calcularPremio();                                                           //llama al metodo calcular premio para saber si gano o perdio
        premio.push(`${red(`SU APUESTA ES DE: ${this.jugador.getApuesta()}\n`)}`);
        if(valor!==0){
            premio.push(`${green(`Felicitaciones... gano\n`.toUpperCase())}`);                                            // si el valor es distinto de 0 quiere decir que gano y da mensaje de felicitaciones
            premio.push(`${green(`Su premio es de ${valor}\n`)}`);
            this.jugador.setDinero(valor+this.jugador.getDinero());
        } else {
            premio.push(`${green(`Desafortunadamente perdio`.toUpperCase())}`);                                         // si es 0 quiere decir que perdio y da mensaje de derrota
        }
        premio.push(`${green(`Ahora le quedan ${this.jugador.getDinero()} fichas\n`)}`);                                  // carga al array para luego mostrar en pantalla la cantidad de fichas que le quedan
        return premio;
    }

    public juego(pPantalla: Pantalla): void {
        let strPantalla: string[] = new Array();  
        pPantalla.borrarConsola();                                                                          // borra la consola
        pPantalla.setPantalla(this.reglamentoJuego());                                                      // setea el arreglo a mostrar en pantalla con las reglas del juego
        pPantalla.mostrarReglas(this.getNombreTragamonedas());                                                               // muestra el reglamento en pantalla
        pPantalla.pausaConsola();  
        this.cargarGuia();   
        do {
            strPantalla=[];
            pPantalla.borrarConsola();                                                                       // borra la pantalla
            pPantalla.bienvenido(this.getNombreTragamonedas());
            pPantalla.borrarConsola();
            strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            pPantalla.setPantalla(strPantalla);
            pPantalla.mostrarMensaje()
            strPantalla=[];
            this.jugador.apostar(pPantalla);
            this.setTirada();
            pPantalla.borrarConsola();
            pPantalla.setPantalla(this.mostrarEnPantalla());
            pPantalla.mostrarPantallaInicio(this.getNombreTragamonedas());
            strPantalla.push.apply(strPantalla,this.entregarPremio());
            pPantalla.setPantalla(strPantalla);
            pPantalla.mostrarMensaje();
        } while ((this.jugador.getDinero()>0)&&(readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
        
    }

    abstract mostrarEnPantalla():string[];
    abstract setTirada():void;
    abstract reglamentoJuego():string[];
    abstract calcularPremio():number;
    abstract cargarGuia():void;



}