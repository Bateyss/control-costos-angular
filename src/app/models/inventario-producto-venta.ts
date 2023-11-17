import { Producto } from "./producto";

export interface InventarioProductoVenta {
    idInventarioPPV: number,
    producto: Producto,
    lote: string,
    cantidad: number
}
