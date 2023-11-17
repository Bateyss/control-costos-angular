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
    ]
  },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
