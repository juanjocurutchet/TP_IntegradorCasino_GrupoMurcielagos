import { Tragamonedas } from "./tragamonedas";
import { Jugador } from "./jugador";
import { Frutas } from "./frutas";

export class TragamonedasFrutas extends Tragamonedas {
    
    private guia: Frutas[];
    private tirada: number[][];


    public constructor (pJugador:Jugador,pNombre:string){
        super(pJugador,pNombre);
        this.guia= new Array ();
        this.tirada= [];
    }

    public reglamentoJuego():string[]{
        const reglamento: string[] = new Array;
        reglamento.push(`El juego consiste en conseguir tres frutas iguales`);
        reglamento.push(`Cada guia tiene quince frutas`);
        reglamento.push(`Son tres guias, y no van a salir dos frutas iguales en la misma guia`);
        reglamento.push(`Si salen tres frutas iguales en alguna diagonal obtendra quince veces la apuesta`);
        reglamento.push(`Si salen tres frutas iguales en la misma linea obtendra diez veces la apuesta`);
        reglamento.push(`si salen dispersas en distintas guias obtendras cinco veces la apuesta.\n`);
        return reglamento;
    }
    public cargarGuia():void{
        let fruta0= new Frutas(" frutilla ");
        let fruta1= new Frutas("  banana  ");
        let fruta2= new Frutas("  manzana ");
        let fruta3= new Frutas("   pera   ");
        let fruta4= new Frutas("   mango  ");
        let fruta5= new Frutas(" arandano ");
        let fruta6= new Frutas("  cereza  ");
        let fruta7= new Frutas("    uva   ");
        let fruta8= new Frutas("   kiwi   ");
        let fruta9= new Frutas("  naranja ");
        let fruta10= new Frutas(" mandarina");
        let fruta11= new Frutas("  sandia  ");
        let fruta12= new Frutas("   melon  ");
        let fruta13= new Frutas("   caqui  ");
        let fruta14= new Frutas("   anana  ");
        this.guia.push(fruta0,fruta1,fruta2,fruta3,fruta4,fruta5,fruta6,fruta7,fruta8,fruta9,fruta10,fruta11,fruta12,fruta13,fruta14);
    }

    public setTirada():void{
        this.tirada=[];
        let indice : number;
        for (let i:number=0; i<3; i++){
            this.tirada[i]=[];
            for (let j:number=0; j<3; j++) {
                indice = Math.floor(Math.random()*15);  
                    if (this.tirada[i].includes(indice)){
                        j = j-1;
                    } else {
                        this.tirada[i].push(indice);
                    }       
                
            }
        }
        
        
    }

    public mostrarEnPantalla():string[]{
        let aux:string[] = new Array;
        for (let i:number=0;i<this.tirada.length;i++){
            for (let j:number=0;j<this.tirada[i].length;j++){
                aux.push(`${this.guia[this.tirada[i][j]].getNombre()}`);
            }
        }
        return aux;
    }

    private verificarTresIguales():boolean{
        let condicion:boolean=false;
        let cantidad:number[] = new Array();
        cantidad.push(1,1,1);
        
        for (let i:number =1;i<3;i++){
            for (let j:number=0;j<3;j++){
                if (this.tirada[i][j]===this.tirada[0][0]){
                        cantidad[0]=cantidad[0]+1;
                }
                if (this.tirada[i][j]===this.tirada[0][1]){
                    cantidad[1]=cantidad[1]+1;
                }
                if (this.tirada[i][j]===this.tirada[0][2]){
                    cantidad[2]=cantidad[2]+1;
                }
            }
        }
        if (cantidad.includes(3)){
            condicion=true;
        }
        return condicion;
    }

    private verificarLinea():boolean{
        let condicion:boolean=false;
        
        for (let i:number =0;i<3;i++){
            if ((this.tirada[1][i]===this.tirada[0][i])&&(this.tirada[2][i]===this.tirada[0][i])){
                condicion=true;                
            }
        }
        return condicion;
    }

    private verificarDiagonal():boolean{
        let condicion:boolean=false;
        if ((this.tirada[0][0]===this.tirada[1][1])&&(this.tirada[2][2]===this.tirada[1][1])){
            condicion=true;
        } else if ((this.tirada[0][2]===this.tirada[1][1])&&(this.tirada[2][0]===this.tirada[1][1])){
            condicion=true;
        }
        return condicion;
    }

    public calcularPremio():number{
        let premio:number=0;
        if (this.verificarTresIguales()===true){                             //Verifica que haya tres frutas iguales. Si hay tres iguales entrega 5 veces la apuesta
            premio=this.jugador.getApuesta()*5;
        } 
        if (this.verificarLinea()===true){                                     //Verifica que haya tres frutas iguales en linea. Si hay tres en linea entrega 10 veces la apuesta
            premio=premio*2;

        } else if (this.verificarDiagonal()===true){                                     //Verifica que haya tres frutas iguales en diagonal. Si hay tres iguales entrega 15 veces la apuesta
            premio=premio*3;
        }
        return premio;                                                                                          // retorna el premio, si todas fallaron es 0;
    }

}