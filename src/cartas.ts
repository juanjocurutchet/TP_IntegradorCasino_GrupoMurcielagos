import { red } from "colors";

export class Cartas{
    private cartas : string;
        
    public constructor (pCartas:string){
      this.cartas = pCartas;
    }
    
    public setCartas(pCartas:string):void{
            this.cartas = pCartas
    }
    public getCartas():string{
            return this.cartas
    }

    public deQuePaloEs(pPalo:string):Boolean{
        return this.cartas.includes(pPalo)
    }

    public mostrarCartaPantalla(pCarta:boolean):string {
      let strCarta:string;  
      if (pCarta===true){
        strCarta=`La carta en la mesa es ${red(`${this.cartas}`)}`;
        } else{
          strCarta=`La nueva carta es ${red(`${this.cartas}`)}`;
        }
        return strCarta;
    }
}

