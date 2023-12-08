import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from '../../models/menu';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class MenuComponent {
  public menusList: Array<Menu> = [];
  public menuSeleccionado: Menu = {
    id: 0,
    ruta: '',
    nombre: ''
  };
  public innerWidths = '0';

  constructor(
    private dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idUsuario: number
    }) { this.innerWidths = (window.innerWidth * 0.8) + 'px'; }

  ngOnInit(): void {
    this.cargarMenusDeMantenimientos();
  }

  cargarMenusDeMantenimientos() {
    this.menusList.push({id: 1,ruta: '/menu/departamento',nombre: 'Departamentos'});
    this.menusList.push({id: 2,ruta: '/menu/inventariomp',nombre: 'Inventario de Materia Prima'});
    this.menusList.push({id: 3,ruta: '/menu/inventarioppv',nombre: 'Inventario de Productos para la Venta'});
    this.menusList.push({id: 4,ruta: '/menu/materiaprima',nombre: 'Materias Primas'});
    this.menusList.push({id: 5,ruta: '/menu/planilla',nombre: 'Planillas'});
    this.menusList.push({id: 6,ruta: '/menu/producto',nombre: 'Productos'});
    this.menusList.push({id: 7,ruta: '/menu/puesto',nombre: 'Puestos'});
    this.menusList.push({id: 8,ruta: '/menu/rubro',nombre: 'Rubros'});
    this.menusList.push({id: 8,ruta: '/menu/gastosadministrativos',nombre: 'Gastos Administrativos'});
    this.menusList.push({id: 8,ruta: '/menu/materialesporproducto',nombre: 'Materiales Por Producto'});
    this.menusList.push({id: 8,ruta: '/menu/planillaporproducto',nombre: 'Planillas por Producto'});
    this.menusList.push({id: 8,ruta: '/menu/sueldogastosmensuales',nombre: 'Sueldos y Gastos Administrativos'});
  }

  redirigirMenu(dir: string) {
    let response: any = {};
    response.url = dir;
    this.dialogRef.close(response);
  }
}
