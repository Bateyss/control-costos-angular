import { MateriaPrima } from "./materia-prima";

export interface InventarioMateriaPrima {
    idInventarioMP:number,
    materiaPrima: MateriaPrima,
    lote: string,
    esImportado: boolean,
    flete: number,
    cantidad: number
}
