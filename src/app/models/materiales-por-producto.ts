import { MateriaPrima } from "./materia-prima";
import { Producto } from "./producto";

export interface MaterialesPorProducto {
    idMaterialProducto: number,
    producto: Producto,
    materiaPrima: MateriaPrima,
    cantidadNecesaria: number
}
