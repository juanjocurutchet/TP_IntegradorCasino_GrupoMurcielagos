import { Casino } from "./casino";
import { Jugador } from "./jugador";

let jugador = new Jugador("",0);
let casino = new Casino(jugador);
casino.inscripcion(jugador);