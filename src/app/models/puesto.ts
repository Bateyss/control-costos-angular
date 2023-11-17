import { Departamento } from "./departamento";
import { Rubro } from "./rubro";

export interface Puesto {
    idPuesto: number,
    departamento: Departamento,
    rubro: Rubro,
    nombrePuesto: string
}
