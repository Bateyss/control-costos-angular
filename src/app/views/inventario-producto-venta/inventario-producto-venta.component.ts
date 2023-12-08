import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventarioProductoVenta } from '../../models/inventario-producto-venta';
import { Producto } from '../../models/producto';
import { InventarioProductoVentaService } from '../../service/inventario-producto-venta.service';
import { ProductoService } from '../../service/producto.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';


@Component({
  selector: 'app-inventario-producto-venta',
  templateUrl: './inventario-producto-venta.component.html',
  styleUrls: ['./inventario-producto-venta.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class InventarioProductoVentaComponent {

  //forms
  public inventarioPPVForm: UntypedFormGroup;

  //selected
  public productoSelected: Producto = {
    idProducto: 0,
    nombreProducto: ''
  };
  public inventarioPPVSeleccionado: InventarioProductoVenta = {
    idInventarioPPV: 0,
    producto: this.productoSelected,
    lote: '',
    cantidad: 0
  };

  //list
  public inventarioPPVList: Array<InventarioProductoVenta> = [];
  public productoList: Array<Producto> = [];

  constructor(
    public inventarioPPVService: InventarioProductoVentaService,
    public productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.inventarioPPVForm = this.formBuilder.group({
      producto: [null, [Validators.required]],
      lote: ['', [Validators.required, Validators.minLength(3)]],
      cantidad: ['', [Validators.required, Validators.min(0.00)]]
    });
    this.cargarInventariosMP();
    this.cargarMateriasPrimas();
  }

  inventarioPPVF(control: string) { return this.inventarioPPVForm.get(control); }

  cargarInventariosMP() {
    this.inventarioPPVService.getList(lista => this.inventarioPPVList = lista);
  }

  cargarMateriasPrimas() {
    this.productoService.getList(lista => this.productoList = lista);
  }

  guardarInventarioPPV() {
    if (this.validarDatos()) {
      this.productoSelected = this.inventarioPPVF('producto')?.value
      this.inventarioPPVSeleccionado.producto = this.productoSelected;
      this.inventarioPPVSeleccionado.lote = this.inventarioPPVF('lote')?.value;
      this.inventarioPPVSeleccionado.cantidad = this.inventarioPPVF('cantidad')?.value;
      if (this.inventarioPPVSeleccionado.idInventarioPPV > 0) {
        this.inventarioPPVService.editOne(this.inventarioPPVSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.inventarioPPVService.creteOne(this.inventarioPPVSeleccionado, listener => {
          if (listener && listener?.idInventarioPPV > 0) {
            this.inventarioPPVList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.inventarioPPVForm.valid;
    if (!this.inventarioPPVF('producto')?.valid) valido = false;
    if (!this.inventarioPPVF('lote')?.valid) valido = false;
    if (!this.inventarioPPVF('cantidad')?.valid) valido = false;
    return valido;
  }

  seleccionarInventarioPPV(row: any) {
    this.inventarioPPVSeleccionado = row;
    this.productoSelected = this.inventarioPPVSeleccionado.producto;
    this.inventarioPPVF('producto')?.setValue(this.inventarioPPVSeleccionado.producto);
    this.inventarioPPVF('lote')?.setValue(this.inventarioPPVSeleccionado.lote);
    this.inventarioPPVF('cantidad')?.setValue(this.inventarioPPVSeleccionado.cantidad);
  }

  seleccionarProducto(row: any) {
    this.productoSelected = row;
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }


}
