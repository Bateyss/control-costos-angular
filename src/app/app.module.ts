import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { RestService } from './service/abs/rest.service';
import { DepartamentoService } from './service/departamento.service';
import { InventarioMateriaPrimaService } from './service/inventario-materia-prima.service';
import { InventarioProductoVentaService } from './service/inventario-producto-venta.service';
import { MateriaPrimaService } from './service/materia-prima.service';
import { PlanillaService } from './service/planilla.service';
import { ProductoService } from './service/producto.service';
import { PuestoService } from './service/puesto.service';
import { RubroService } from './service/rubro.service';
import { DepartamentoComponent } from './views/departamento/departamento.component';
import { InventarioMateriaPrimaComponent } from './views/inventario-materia-prima/inventario-materia-prima.component';
import { InventarioProductoVentaComponent } from './views/inventario-producto-venta/inventario-producto-venta.component';
import { MateriaPrimaComponent } from './views/materia-prima/materia-prima.component';
import { PlanillaComponent } from './views/planilla/planilla.component';
import { ProductoComponent } from './views/producto/producto.component';
import { PuestoComponent } from './views/puesto/puesto.component';
import { RubroComponent } from './views/rubro/rubro.component';
import { MantenimientoComponent } from './views/mantenimiento/mantenimiento.component';
import { MenuComponent } from './views/menu/menu.component';
import { MaterialesPorProductoComponent } from './views/materiales-por-producto/materiales-por-producto.component';
import { MaterialesPorProductoService } from './service/materiales-por-producto.service';
import { PlanillaPorProductoService } from './service/planilla-por-producto.service';
import { SueldosGastosMensualesService } from './service/sueldos-gastos-mensuales.service';
import { GastosAdministrativosService } from './service/gastos-administrativos.service';
import { PlanillaPorProductoComponent } from './views/planilla-por-producto/planilla-por-producto.component';
import { SueldosGastosMensualesComponent } from './views/sueldos-gastos-mensuales/sueldos-gastos-mensuales.component';
import { GastosAdministrativosComponent } from './views/gastos-administrativos/gastos-administrativos.component';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatGridListModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatMenuModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule
]

const services = [
  RestService,
  DepartamentoService,
  InventarioMateriaPrimaService,
  InventarioProductoVentaService,
  MateriaPrimaService,
  PlanillaService,
  ProductoService,
  PuestoService,
  RubroService,
  MaterialesPorProductoService,
  PlanillaPorProductoService,
  SueldosGastosMensualesService,
  GastosAdministrativosService
]

const modelComponents = [
  DepartamentoComponent,
  InventarioMateriaPrimaComponent,
  InventarioProductoVentaComponent,
  MateriaPrimaComponent,
  PlanillaComponent,
  ProductoComponent,
  PuestoComponent,
  RubroComponent,
  MantenimientoComponent,
  MenuComponent,
  MaterialesPorProductoComponent,
  PlanillaPorProductoComponent,
  SueldosGastosMensualesComponent,
  GastosAdministrativosComponent
]


@NgModule({
  declarations: [
    AppComponent,
    modelComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
