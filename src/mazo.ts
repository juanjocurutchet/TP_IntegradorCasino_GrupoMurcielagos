import { Cartas } from "./cartas";

export class Mazo{
    private mazo : Cartas[]
   private descarte : number[]

   public constructor(){
        this.mazo = [];
        this.descarte = [];
   }

   /* Este metodo se encarga de cargar los cuatro palos al mazo, lo hace con un bucle for, pasanandole a cargar palos
   como parametro en indice del for. Y los agrupa al mazo de la clase... En resumen, está agrupando los cuatro palos en 
   un solo mazo. Las cartas se cargan de forma ordenada, del 1 al 13 mas el comodin de corazones, despues pica... y así*/

   public cargarMazo():void{
          for (let i:number=0;i<4;i++){
               this.mazo.push.apply(this.mazo,this.cargarPalo(i));
          }
   }

   /* Este metodo te devuelve un minimazo ordenado de un solo palo con catorce cartas, trece cartas numeradas, 
   del 1 al 13, y el comodin, la carta numero catorce, el palo depende del indice que se le pase por parametro.
   Si es 0 es corazon, 1 pica, 2 diamante y tres trebol.*/

   public cargarPalo(indice:number):Cartas[] {
     let palo:string;
     switch (indice){
          case 0:
              palo=" ♥  ";
              break;
         case 1:
              palo=" ♠  ";
              break;
         case 2:
              palo=" ♦  "
              break;
         case 3: 
              palo=" ♣  "
              break;
         default :
              palo=""
              break;
     }
     let paloMazo : Cartas[]=new Array();
     for (let i:number=0;i<13;i++){
          paloMazo.push(new Cartas(`   ${i+1} ${palo}`));
     }
     paloMazo.push(new Cartas(`COMODIN ${palo}`));

     return paloMazo;

   }

   public setMazo(pMazo:Cartas[]):void{
        this.mazo = pMazo;
   }
   public getMazo():Cartas[]{
    return this.mazo
   }
   public getNombreCarta(indice:number):string{
         return this.mazo[indice].getCartas();
   }
   
   public getDescarte():number[]{
    return this.descarte
   }

   public setDescarte(pDescarte:number[]):void{
     this.descarte=pDescarte;
   }

   /* Este metodo devuelve una carta aleatorria sin desordenar el mazo. La carta que devuelve la ingresa en el descarte. 
   Pero si ya habia sido sacada antes, vuelve a procesar el metodo de sacar una carta random, hasta que la carta no se encuentre en el descarte. Las cartas solo pueden ser sacada
   del mazo, (en si no se sacan, solo se copia su indice al descarte, y devuelve esa carta) 
   */
   
   public darCarta():Cartas{
          let indice:number;
          let ultimaCarta:number;
          if (this.descarte.length>45){
               ultimaCarta=this.descarte[this.descarte.length-1]
               this.descarte=[];
               this.descarte.push(ultimaCarta);
          } 
          do {
               indice = Math.floor(Math.random()*56);              // Este devuelve un numero random del 0 al 55. este numero es el indice del mazo de cartas  
          } while (this.descarte.includes(indice)===true);
          this.descarte.push(indice);

          return this.mazo[indice];
   }
   

}