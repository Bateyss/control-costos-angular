import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../service/producto.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class ProductoComponent {
  //forms
  public productoForm: UntypedFormGroup;

  //selected
  public productoSeleccionado: Producto = {
    idProducto: 0,
    nombreProducto: ''
  };

  //list
  public productoList: Array<Producto> = [];

  constructor(
    public productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.productoForm = this.formBuilder.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.cargarProductos();
  }

  productoF(control: string) { return this.productoForm.get(control); }

  cargarProductos() {
    this.productoService.getList(lista => this.productoList = lista);
  }


  guardarProducto() {
    if (this.validarDatos()) {
      this.productoSeleccionado.nombreProducto = this.productoF('nombreProducto')?.value;
      if (this.productoSeleccionado.idProducto > 0) {
        this.productoService.editOne(this.productoSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.productoService.creteOne(this.productoSeleccionado, listener => {
          if (listener && listener?.idProducto > 0) {
            this.productoList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.productoForm.valid;
    if (!this.productoF('nombreProducto')?.valid) valido = false;
    return valido;
  }

  seleccionarProducto(row: any) {
    this.productoSeleccionado = row;
    this.productoF('nombreProducto')?.setValue(this.productoSeleccionado.nombreProducto);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
