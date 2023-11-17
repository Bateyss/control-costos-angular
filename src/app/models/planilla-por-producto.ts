import { Planilla } from "./planilla";
import { Producto } from "./producto";

export interface PlanillaPorProducto {
    idPlanillaProducto: number,
    producto: Producto,
    planilla: Planilla,
    cantidadRecursos: number,
    horasLaboradas: number,
    horasNocturnidad: number,
    horasExtraDiurnas: number,
    horasExtraNocturnas: number
}
