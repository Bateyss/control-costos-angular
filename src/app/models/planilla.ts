import { Puesto } from "./puesto";

export interface Planilla {
    idPlanilla: number,
    nombre: string,
    puesto: Puesto,
    esEmpleadoDirecto: boolean,
    salarioMensual: number,
    numeroEmpleados: number
}
