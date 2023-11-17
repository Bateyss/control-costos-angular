import { Departamento } from "../models/departamento";
import { GastosAdministrativos } from "../models/gastos-administrativos";
import { InventarioMateriaPrima } from "../models/inventario-materia-prima";
import { InventarioProductoVenta } from "../models/inventario-producto-venta";
import { MateriaPrima } from "../models/materia-prima";
import { MaterialesPorProducto } from "../models/materiales-por-producto";
import { Planilla } from "../models/planilla";
import { PlanillaPorProducto } from "../models/planilla-por-producto";
import { Producto } from "../models/producto";
import { Puesto } from "../models/puesto";
import { Rubro } from "../models/rubro";
import { SueldoGastosMensuales } from "../models/sueldo-gastos-mensuales";


export class EntityParser {

    public static parseDepartamento(data: any): Departamento {
        var modelo: Departamento = {
            idDepartamento: data.idDepartamento,
            nombreDepartamento: data.nombreDepartamento
        }
        return modelo;
    }

    public static parseInventarioMateriaPrima(data: any): InventarioMateriaPrima {
        var modelo: InventarioMateriaPrima = {
            idInventarioMP: data.idInventarioMP,
            materiaPrima: this.parseMateriaPrima(data.materiaPrima),
            lote: data.lote,
            esImportado: data.esImportado,
            flete: data.flete,
            cantidad: data.cantidad
        }
        return modelo;
    }

    public static parseInventarioProductoVenta(data: any): InventarioProductoVenta {
        var modelo: InventarioProductoVenta = {
            idInventarioPPV: data.idInventarioPPV,
            producto: this.parseProducto(data.producto),
            lote: data.lote,
            cantidad: data.cantidad
        }
        return modelo;
    }

    public static parseMateriaPrima(data: any): MateriaPrima {
        var modelo: MateriaPrima = {
            idMateria: data.idMateria,
            nombreMateria: data.nombreMateria,
            tipoMateria: data.tipoMateria,
            costoUnitarioMateria: data.costoUnitarioMateria,
            fleteMateria: data.fleteMateria
        }
        return modelo;
    }

    public static parsePlanilla(data: any): Planilla {
        var modelo: Planilla = {
            idPlanilla: data.idPlanilla,
            nombre: data.nombre,
            puesto: data.puesto,
            esEmpleadoDirecto: data.esEmpleadoDirecto,
            salarioMensual: data.salarioMensual,
            numeroEmpleados: data.numeroEmpleados
        }
        return modelo;
    }

    public static parseProducto(data: any): Producto {
        var modelo: Producto = {
            idProducto: data.idProducto,
            nombreProducto: data.nombreProducto
        }
        return modelo;
    }

    public static parsePuesto(data: any): Puesto {
        var modelo: Puesto = {
            idPuesto: data.idPuesto,
            departamento: this.parseDepartamento(data.departamento),
            rubro: this.parseRubro(data.rubro),
            nombrePuesto: data.nombrePuesto
        }
        return modelo;
    }

    public static parseRubro(data: any): Rubro {
        var modelo: Rubro = {
            idRubro: data.idRubro,
            nombreRubro: data.nombreRubro
        }
        return modelo;
    }
    public static parseSueldosGastosMensuales(data: any): SueldoGastosMensuales {
        var modelo: SueldoGastosMensuales = {
            descripcion: data.descripcion,
            inversionMensual: data.inversionMensual,
            activo: data.activo
        }
        return modelo;
    }
    public static parsePlanillaPorProducto(data: any): PlanillaPorProducto {
        var modelo: PlanillaPorProducto = {
            producto: this.parseProducto(data.producto),
            planilla: this.parsePlanilla(data.planilla),
            cantidadRecursos: data.cantidadRecursos,
            horasLaboradas: data.horasLaboradas,
            horasNocturnidad: data.horasNocturnidad,
            horasExtraDiurnas: data.horasExtraDiurnas,
            horasExtraNocturnas: data.horasExtraNocturnas
        }
        return modelo;
    }
    public static parseMaterialesPorProducto(data: any): MaterialesPorProducto {
        var modelo: MaterialesPorProducto = {
            producto: this.parseProducto(data.producto),
            materiaPrima: this.parseMateriaPrima(data.materiaPrima),
            cantidadNecesaria: data.cantidadRecursos
        }
        return modelo;
    }
    public static parseGastosAdministrativos(data: any): GastosAdministrativos {
        var modelo: GastosAdministrativos = {
            descripcion: data.descripcion,
            inversionMensual: data.inversionMensual,
            activo: data.activo
        }
        return modelo;
    }
}