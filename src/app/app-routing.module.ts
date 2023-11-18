import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoComponent } from './views/departamento/departamento.component';
import { InventarioMateriaPrimaComponent } from './views/inventario-materia-prima/inventario-materia-prima.component';
import { InventarioProductoVentaComponent } from './views/inventario-producto-venta/inventario-producto-venta.component';
import { MateriaPrimaComponent } from './views/materia-prima/materia-prima.component';
import { ProductoComponent } from './views/producto/producto.component';
import { PuestoComponent } from './views/puesto/puesto.component';
import { PlanillaComponent } from './views/planilla/planilla.component';
import { RubroComponent } from './views/rubro/rubro.component';
import { MantenimientoComponent } from './views/mantenimiento/mantenimiento.component';
import { GastosAdministrativosComponent } from './views/gastos-administrativos/gastos-administrativos.component';
import { MaterialesPorProductoComponent } from './views/materiales-por-producto/materiales-por-producto.component';
import { PlanillaPorProductoComponent } from './views/planilla-por-producto/planilla-por-producto.component';
import { SueldosGastosMensualesComponent } from './views/sueldos-gastos-mensuales/sueldos-gastos-mensuales.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  {
    path: 'menu', component: MantenimientoComponent, children: [
      { path: '', redirectTo: '/menu/departamento', pathMatch: 'full' },
      { path: 'departamento', component: DepartamentoComponent, },
      { path: 'inventariomp', component: InventarioMateriaPrimaComponent, },
      { path: 'inventarioppv', component: InventarioProductoVentaComponent, },
      { path: 'materiaprima', component: MateriaPrimaComponent, },
      { path: 'planilla', component: PlanillaComponent, },
      { path: 'producto', component: ProductoComponent, },
      { path: 'puesto', component: PuestoComponent, },
      { path: 'rubro', component: RubroComponent, },
      { path: 'gastosadministrativos', component: GastosAdministrativosComponent, },
      { path: 'materialesporproducto', component: MaterialesPorProductoComponent, },
      { path: 'planillaporproducto', component: PlanillaPorProductoComponent, },
      { path: 'sueldogastosmensuales', component: SueldosGastosMensualesComponent, },
    ]
  },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
