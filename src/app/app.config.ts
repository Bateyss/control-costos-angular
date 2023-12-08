import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { RestService } from './service/abs/rest.service';
import { DepartamentoService } from './service/departamento.service';
import { InventarioMateriaPrimaService } from './service/inventario-materia-prima.service';
import { InventarioProductoVentaService } from './service/inventario-producto-venta.service';
import { MateriaPrimaService } from './service/materia-prima.service';
import { PlanillaService } from './service/planilla.service';
import { ProductoService } from './service/producto.service';
import { PuestoService } from './service/puesto.service';
import { RubroService } from './service/rubro.service';
import { MaterialesPorProductoService } from './service/materiales-por-producto.service';
import { PlanillaPorProductoService } from './service/planilla-por-producto.service';
import { SueldosGastosMensualesService } from './service/sueldos-gastos-mensuales.service';
import { GastosAdministrativosService } from './service/gastos-administrativos.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

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



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), services, provideAnimations(), provideHttpClient()]
};
