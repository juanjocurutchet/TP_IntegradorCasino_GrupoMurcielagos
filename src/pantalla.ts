import * as readlineSync from 'readline-sync';
import  {red, blue, green,yellow} from "colors";
import { Jugador } from './jugador';
export class Pantalla {
    private pantalla:string[];

    public constructor(pPantalla:string[]) {
        this.pantalla=pPantalla;
    }
    public getPantalla():string[]{
        return this.pantalla;
    }
    public setPantalla(pPantalla:string[]){
        this.pantalla=pPantalla;
    }

    public bienvenido(pTitulo:String):void{
        console.log(red(`BIENVENIDO A ${pTitulo}\n`.toUpperCase()));
        console.log(green(`Que comience el juego\n`.toUpperCase()));
        
    }
    
    public mostrarPantallaInicio(pTitulo:String){
        console.log("\n");
        
        console.log(yellow(`                  ${pTitulo}\n`.toUpperCase()));
        console.log("\n");
        console.log(blue("======================================================="));
        console.log("\n");
        console.log(red("                  MUCHA SUERTE EN SU TIRADA      \n"));
        console.log(red("           TRULULULULULULU TRULULULULU TRULULULU\n"));

        this.pausaConsola();
        console.log("\n");
        switch (pTitulo){
            case "La fruta de la fortuna":
                for (let i:number=0; i<3; i++) {
                    console.log(blue(`Fila ${i+1}.....`));
                    console.log(blue("------ -----// " + green(this.pantalla[i]) + " // " + green(this.pantalla[i+3]) + " // " + green(this.pantalla[i+6]) + " // --------"));
                }
                console.log(`\n`);
                break;
            case "Las cartas tienen magia":
                for (let i:number=0; i<3; i++) {
                    console.log(blue(`Fila ${i+1}.....`));
                    console.log(blue("------ -----// " + green(this.pantalla[i]) + " // " + green(this.pantalla[i+3]) + " // " + green(this.pantalla[i+6]) + " // " + green(this.pantalla[i+9]) + " // --------"));
                }
                console.log(`\n`);
                
                break;
            case "A las cartas, Mayor o Menor":
                this.borrarConsola();
                for (let i:number =0; i<this.pantalla.length; i++){
                    console.log(this.pantalla[i]);
                }
                console.log(`\n`);
                break;
            case "Dados, dados y mas dados":
                for (let i:number=0;i<5;i++){
                    console.log(this.pantalla[i]);                    
                }
                console.log(`\n`);
                break;
            default:
                console.log("algo fallo");
        }
        
    }

    public mostrarMensaje():void{
        for(let i:number=0;i<this.pantalla.length;i++){
            console.log(`${this.pantalla[i]}`);
        }
    }

    public mostrarProbabilidades():void {
        console.log("\n");
        
        console.log(yellow(`          Las probabilidades de ganar son\n`.toUpperCase()));
        console.log("\n");
        console.log(blue("======================================================="));
        for (let i:number=0; i<this.pantalla.length;i++){
            console.log(green(this.pantalla[i]));
            console.log("\n");     
        }   
        console.log(red("                  MUCHA SUERTE CON SU APUESTA      \n"));
    }

    public mostrarReglas(pJuego:string):void{
        console.log("\n");
        
        console.log(yellow(`          bienvenido a ${pJuego}\n`.toUpperCase()));
        console.log(yellow(`     el juego conciste en los siguientes puntos\n`.toUpperCase()));
        console.log("\n");
        console.log(blue("======================================================="));
        for (let i:number=0; i<this.pantalla.length;i++){
            console.log(green(this.pantalla[i]));    
        }   
    }

    public menuPantalla():number{
        console.clear();        
        console.log(blue ("====================================="));
        console.log( red (`||                                 ||`));
        console.log( red (`||   BIENVENIDO A NUESTRO CASINO   ||`));
        console.log( red (`||                                 ||`));
        console.log( red (`||   ESTOS  SON NUESTROS JUEGOS    ||`));
        console.log( red (`||                                 ||`));
        console.log(blue ("====================================="));
        console.log(green("||                                 ||"));
        console.log(green("||   1 - Tragamonedas de frutas    ||"));
        console.log(green("||   2 - Tragamonedas de cartas    ||"));
        console.log(green("||   3 - Juego de mayor o menor    ||"));
        console.log(green("||   4 - Juego de cinco dados      ||"));
        console.log(green("||                                 ||"));
        console.log(blue ("====================================="));
        console.log(green("||   0 - Salir                     ||"));
        console.log(blue ("=====================================\n"));

        return readlineSync.questionInt("Ingrese una opcion del menu: ".toUpperCase());

    }

    public mensajesError(indice:number):void {
        switch(indice){
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

    public comprobacionDatoIngresado(pMax:number, pMin:number, situacion:number, pJugadoor:Jugador):boolean{
        let condicion:boolean = false;
        
        switch(situacion) {
            case 1:
                const valor = readlineSync.questionInt(`Ingrese un juego`.toUpperCase());
                if ((valor<pMin)&& (valor>pMax)){
                    console.log(green(`No puede ingresar ${red(`${valor}`)}, no es una opción del ${red(`menu`)}`.toUpperCase())); 
                } else {
                    condicion = true;
                }
                break;
            default:
                const valor1 = readlineSync.questionInt("Ingrese su apuesta: ".toUpperCase());
                if (valor1<pMin){
                    console.log(green(`No puede apostar ${red(`${valor1}`)}, no se puede apostar en ${red(`negativo`)}`.toUpperCase())); 
                } else { 
                    if (valor1>pMax){
                        console.log(green(`No puede apostar ${red(`${valor1}`)}, no puede apostar mas de lo que tiene`.toUpperCase())); 
                    } else {
                        condicion = true;
                        pJugadoor.setApuesta(valor1);
                    }
                } 
                break;
        }      
        return condicion; 
        
    }

    public borrarConsola(){
        console.clear();
    }
    
    public pausaConsola(){
        readlineSync.question("Presiona " + green("Enter") + " para continuar...");
    }

 
}





