/* Esta clase hace que el juego de mayor o menor funcione. Se encarga de comunicarse con la clase Jugador, y la clase Pantalla...
Todo lo maneja desde el metodo jugar(). Que tiene un bucle que se repite hasta que le digas que no, o hasta que te quedes sin dinero
Los otros metodos que surgen segun se los necesite son los de leer o modificar los atributos de la clase, un metodo reglamento
que devuelve un string, que luego se mostrara en pantalla.
Los atributos que tiene son el titulo del juego, las cartas uno, la de la mesa, y dos la proxima a salir, el jugador y el mazo con el
que se va a dar las cartas.
*/

import { Cartas } from "./cartas";
import { Jugador } from "./jugador";
import { Mazo } from "./mazo";
import  {red, blue, green,yellow} from "colors";
import * as readlineSync from 'readline-sync';
import { Pantalla } from "./pantalla";

export class MayorOmenor{
    private titulo:string;
    private carta1:Cartas;
    private carta2:Cartas;
    private jugador:Jugador;
    private mazo:Mazo;

    public constructor(pJugador:Jugador,pTitulo:string){
        this.mazo=new Mazo();
        this.titulo=pTitulo;
        this.carta1= new Cartas("Instrucciones");
        this.carta2=new Cartas("Dorso");;
        this.jugador=pJugador;
    }

    public getNombre():string{
        return this.titulo;
    }
    public getCarta1():Cartas{
        return this.carta1;
    }
    public getCarta2():Cartas{
        return this.carta2;
    }
    public setCarta1(pCarta1:Cartas){
        this.carta1=pCarta1;
    }
    public setCarta2(pCarta2:Cartas){
        this.carta2=pCarta2;
    }

    private reglamentoJuego():string[]{
        const reglamento: string[] = new Array;
        reglamento.push(`El juego consiste en acertar si la siguiente carta es mayor o menor`);
        reglamento.push(`Primero debe apostar las fichas que cree conveniente, RECUERDE,`);
        reglamento.push(`tiene que apostar más de una ficha y menos del total de fichas que posee.`);
        reglamento.push(`Despues se le mostrara una carta en la mesa, debe adivinar si la siguiente es mayor o menor,`);
        reglamento.push(`si sale algún comodín automaticamente pierde la apuesta y se vuelve a abarajar.`);
        reglamento.push(`Mientras menos probabilidades de ganar tenga, mayor va a ser el premio`);
        reglamento.push(`Si en el mazo hay menos de 15 cartas se vuelve a abarajar.\n`);
        return reglamento;
    }

    private cantidadCartasMazo():number{              //Calcula la cantidad de cartas en el mazo, restandole al mazo las cartas del descartes
        return 56-this.mazo.getDescarte().length;
    }

    private probabilidadMayor():number{
        const carta1aux=parseInt(this.carta1.getCartas().replace(/\D/g, ""));   // Lee el numero de la carta que esta en la mesa, si es comodin es undefined
        const casosPosibles:number=this.cantidadCartasMazo();                   // Total de cartas en el mazo
        let casosProbables:number=(13-carta1aux)*4;                             // cantidad de cartas mayores a la carta que esta en la mesa
        for (let i:number=0;i<this.mazo.getDescarte().length;i++){                        // recorre el descarte, buscando el numero de cartas y la cantidad de cartas mayores.
            if(parseInt(this.mazo.getNombreCarta(this.mazo.getDescarte()[i]).replace(/\D/g, ""))>carta1aux){   //Pregunta si la carta es mayor a la carta de la mesa
                casosProbables=casosProbables-1;                                // Si es mayor le resta 1 a los casos probables.
            }
        }
        return Number((casosProbables/casosPosibles*100).toFixed(0));           // retorna el porcentaje de probabilidades que tiene de salir una carta mayor con 0 decimales.
        
    }

    private probabilidadMenor():number{
        const carta1aux=parseInt(this.carta1.getCartas().replace(/\D/g, ""));   // Lee el numero de la carta que esta en la mesa, si es comodin es undefined
        const casosPosibles:number=this.cantidadCartasMazo();                   // Total de cartas en el mazo
        let casosProbables:number=(carta1aux-1)*4;                              // cantidad de cartas menores a la carta que esta en la mesa
        for (let i:number=0;i<this.mazo.getDescarte().length;i++){                        // recorre el descarte, buscando el numero de cartas y la cantidad de cartas menores.
            if(parseInt(this.mazo.getNombreCarta(this.mazo.getDescarte()[i]).replace(/\D/g, ""))<carta1aux){   //Pregunta si la carta es menor a la carta de la mesa
                casosProbables=casosProbables-1;                                // Si es menor le resta 1 a los casos probables.
            }
        }
        return Number((casosProbables/casosPosibles*100).toFixed(0));           // retorna el porcentaje de probabilidades que tiene de salir una carta menor con 0 decimales.  
    }

    private probabilidadComodin():number{
        const casosPosibles:number=this.cantidadCartasMazo();                                            // Total de cartas en el mazo
        let casosProbables:number=4;                                                                     // cantidad de comodines en el mazo 
        return Number((casosProbables/casosPosibles*100).toFixed(0));                                    // retorna el porcentaje de probabilidades que tiene de salir un comodin con 0 decimales.  
    }

    private verificaMayor():boolean{                                                                      // Devuelve true si la segunda carta es mayor que la primera y false si pasa cualquier otra cosa
        let condicion:boolean;
        if(parseInt(this.carta1.getCartas().replace(/\D/g, ""))<parseInt(this.carta2.getCartas().replace(/\D/g, ""))){      // Obtengo solo el numero de la carta en cuestión
            condicion=true;
        } else {
            condicion=false;
        }
        return condicion;
    }

    private verificaMenor():boolean{                                                                      // Devuelve true si la segunda carta es menor que la primera y false si pasa cualquier otra cosa
        let condicion:boolean;
        if(parseInt(this.carta1.getCartas().replace(/\D/g, ""))>parseInt(this.carta2.getCartas().replace(/\D/g, ""))){      // Obtengo solo el numero de la carta en cuestión
            condicion=true;
        } else {
            condicion=false;
        }
        return condicion;
    }

    private verificaComodin():boolean{                                                                      // Devuelve true si la segunda carta es un comodin false si es cualquier otra carta
        let condicion:boolean;
        if(this.carta1.getCartas().replace(/\D/g, "")===undefined){                                         // Obtengo solo el numero de la carta como el comodin no tiene numero me devuelve un undefined
            condicion=true;
        } else {
            condicion=false;
        }
        return condicion;
    }

    private calcularPremio(pApuesta:number):number{
        let premio:number=0;
        if (this.verificaComodin()===true){                             //Verifica que la segunda carta no sea comodin, si lo es, reestablece el descarte
            this.mazo.setDescarte([]);                                           //y da una nueva carta... El premio sigue en 0 porque perdio.
            this.carta2=this.mazo.darCarta();
        } else {
            if ((pApuesta===1)&&(this.verificaMayor()===true)){          //verifica si la apuesta fue a mayor y si la carta es mayor. Calcula el premio
                premio=Number((10-this.probabilidadMayor()/10).toFixed(0))*this.jugador.getApuesta();       //restandole a 10 el porcentaje de probabilidades que tenia, y multiplicandolo por la apuesta-
            } else {                                                                                        //de 0 a 9 va a multiplicar la apuesta por 10, de 10 a 19 multipluca por 20, de 20 a 29 por 30 y asi.
                if ((pApuesta===2)&&(this.verificaMenor()===true)){                                         // para menor hace lo mismo pero si es menor.
                    premio=Number((10-this.probabilidadMenor()/10).toFixed(0))*this.jugador.getApuesta();
                }
            }
        }
        return premio;                                                                                          // retorna el premio, si todas fallaron es 0;
    }


    private probabilidad(): string[] {
        const listaProbabilidades: string[] = new Array();
        
        listaProbabilidades.push(`${green(`La probabilidad de sacar una carta mayor es de ${this.probabilidadMayor()}%`)}`); //carga mensaje con la probabilidad de cartas mayores
        listaProbabilidades.push(`${green(`La probabilidad de sacar una carta menor es de ${this.probabilidadMenor()}%`)}`); //carga mensaje con la probabilidad de cartas menores
        listaProbabilidades.push(`${green(`La probabilidad de sacar un comodin es de ${this.probabilidadComodin()}%`)}`);    //carga mensaje con la probabilidad de comodines

        return listaProbabilidades;                                                                              // Lo devuelve como array para mostrarlo en pantalla.
    }

    private entregarPremio(pApuesta:number):string[]{                                                       // Genera mensajes de entrega de premio, y llama a los metodos para saber si gano o perdio
        let premio:string[]=new  Array;
        const valor=this.calcularPremio(pApuesta);                                                            //llama al metodo calcular premio para saber si gano o perdio
        premio.push(`${red(`SU APUESTA ES DE: ${this.jugador.getApuesta()}\n`)}`);
        if(valor!==0){
            premio.push(`Felicitaciones... gano`.toUpperCase());                                            // si el valor es distinto de 0 quiere decir que gano y da mensaje de felicitaciones
            premio.push(`Su premio es de ${valor}`);
            this.jugador.setDinero(valor+this.jugador.getDinero());
        } else {
            premio.push(`Desafortunadamente perdio`.toUpperCase());                                         // si es 0 quiere decir que perdio y da mensaje de derrota
        }
        premio.push(`Ahora le quedan ${this.jugador.getDinero()} fichas`);                                  // carga al array para luego mostrar en pantalla la cantidad de fichas que le quedan
        return premio;
    }



    public juego(pPantalla:Pantalla):void {                                                                 // Es el metodo que engloba todo los otros metodos
        let strPantalla: string[] = new Array();                                                            // Declaro el array para pasarlo cargado a la pantalla
        let valor:number;                                                                                   // valor me va a tomar la elección de mayor o menor   
        let condicion:boolean=false;                                                                        // condición me va a decir si eligio 1 o 2, si es falso va a seguir en el bucle de eleccion
        this.mazo.cargarMazo();                                                                                  // carga el mazo de cartas
        this.carta2=this.mazo.darCarta();                                                                        // da la primera carta.
        pPantalla.borrarConsola();                                                                          // borra la consola
        pPantalla.setPantalla(this.reglamentoJuego());                                                      // setea el arreglo a mostrar en pantalla con las reglas del juego
        pPantalla.mostrarReglas(this.titulo);                                                               // muestra el reglamento en pantalla
        pPantalla.pausaConsola();  
        pPantalla.borrarConsola();                                                                       // borra la pantalla
        pPantalla.bienvenido(this.titulo);                                                                         // pasa la pantalla hasta que se precione enter
        do {
            this.carta1=this.carta2;                                                                        // comienza el ciclo del juego, se termina cuando te quedas sin fichas, o cuando decis que no queres jugar mas
            this.carta2=this.mazo.darCarta();                                                                    // Pasa la carta 2 a carta 1, y da una nueva carta a carta 2
            strPantalla=[];
            strPantalla.push(`${this.carta1.mostrarCartaPantalla(true)} \n`);                                // empieza a cargar el array a mostrar en pantalla con la carta 1
            strPantalla.push.apply(strPantalla,this.probabilidad());                                         // carga las probabilidades
            strPantalla.push(`Recuerde si sale ${green("COMODIN")} pierde todo su dinero\n`);                // y la advertencia de comodin
            strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`)                        // y el dinero que posee
            strPantalla.push(`¿La siguiente carta es Mayor o Menor?`);                                       // pregunta por la siguiente carta
            pPantalla.setPantalla(strPantalla);                                                              // lo setea a la pantalla
            strPantalla=[];                                                                                  // borra el array que se estaba cargando.
            pPantalla.mostrarPantallaInicio(this.titulo);                                                    // lo muestra en pantalla
            this.jugador.apostar(pPantalla);                                                                 // toma la apuesta del jugador
            strPantalla.push(`${this.carta2.mostrarCartaPantalla(false)} \n`);                               // carga la segunda carta en el arreglo
            do{                                                                                              // comienza el ciclo de la eleccion de mayor o menor.  
                valor = readlineSync.questionInt(`Ingrese 1 para mayor, 2 para menor: `.toUpperCase());
                if((valor===1)||(valor===2)){
                    strPantalla.push.apply(strPantalla,this.entregarPremio(valor))                            // carga en el array los premios
                    pPantalla.setPantalla(strPantalla);                                                       // los setea en pantalla
                    condicion=true;                                                                           // y habilita la salida del bucle
                } else {
                    pPantalla.mensajesError(2);  
                    pPantalla.pausaConsola();                                                 //Da en pantalla el mensaje de que solo puede elegir mayor o menor, 1 o 2    
                } 
            } while (condicion===false);               
            
            pPantalla.mostrarMensaje();                                                         // muestra en pantalla los mensajes cargados en el array
            console.log("\n");
            pPantalla.pausaConsola();

        } while((this.jugador.getDinero()>0)&&(readlineSync.keyInYN("¿Desea jugar de nuevo? ")));       // hace la pregunta si quiere seguir jugando
    }

}