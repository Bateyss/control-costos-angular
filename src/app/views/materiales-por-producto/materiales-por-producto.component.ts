import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MateriaPrima } from 'src/app/models/materia-prima';
import { MaterialesPorProducto } from 'src/app/models/materiales-por-producto';
import { Producto } from 'src/app/models/producto';
import { MateriaPrimaService } from 'src/app/service/materia-prima.service';
import { MaterialesPorProductoService } from 'src/app/service/materiales-por-producto.service';
import { ProductoService } from 'src/app/service/producto.service';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-materiales-por-producto',
  templateUrl: './materiales-por-producto.component.html',
  styleUrls: ['./materiales-por-producto.component.css']
})
export class MaterialesPorProductoComponent {
  //forms
  public materialesPorProductoForm: UntypedFormGroup;

  public productoSeleccionado: Producto = {
    idProducto: 0,
    nombreProducto: ''
  };
  public materiaPrimaSeleccionada: MateriaPrima = {
    idMateria: 0,
    nombreMateria: '',
    tipoMateria: '',
    costoUnitarioMateria: 0,
    fleteMateria: 0
  };
  //selected
  public materialesPorProductoSeleccionado: MaterialesPorProducto = {
    idMaterialProducto: 0,
    producto: this.productoSeleccionado,
    materiaPrima: this.materiaPrimaSeleccionada,
    cantidadNecesaria: 0
  };

  //list
  public materialesPorProductoList: Array<MaterialesPorProducto> = [];
  public productoList: Array<Producto> = [];
  public materiaPrimaList: Array<MateriaPrima> = [];

  constructor(
    public materialesPorProductoService: MaterialesPorProductoService,
    public productoService: ProductoService,
    public materiaPrimaService: MateriaPrimaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.materialesPorProductoForm = this.formBuilder.group({
      producto: [null, [Validators.required]],
      materiaPrima: [null, [Validators.required]],
      cantidadNecesaria: ['', [Validators.required, Validators.min(0.00)]]
    });
    this.cargarMaterialesPorProducto()
  }

  materialesPorProductoF(control: string) { return this.materialesPorProductoForm.get(control); }

  cargarMaterialesPorProducto() {
    this.materialesPorProductoService.getList(lista => this.materialesPorProductoList = lista);
  }
  cargarProductos() {
    this.productoService.getList(lista => this.productoList = lista);
  }
  cargarMateriasPrimas() {
    this.materiaPrimaService.getList(lista => this.materiaPrimaList = lista);
  }

  guardarMaterialesPorProducto() {
    if (this.validarDatos()) {
      this.materialesPorProductoSeleccionado.producto = this.materialesPorProductoF('producto')?.value;
      this.materialesPorProductoSeleccionado.materiaPrima = this.materialesPorProductoF('materiaPrima')?.value;
      this.materialesPorProductoSeleccionado.cantidadNecesaria = this.materialesPorProductoF('cantidadNecesaria')?.value;
      if (this.materialesPorProductoSeleccionado.idMaterialProducto > 0) {
        this.materialesPorProductoService.editOne(this.materialesPorProductoSeleccionado, listener => {
          Utils.openSnackBar('MaterialesPorProducto Editado', 'ok', this._snackBar);
        });
      } else {
        this.materialesPorProductoService.creteOne(this.materialesPorProductoSeleccionado, listener => {
          if (listener && listener?.idMaterialProducto > 0) {
            this.materialesPorProductoList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('Escribe nombre de departamento', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.materialesPorProductoForm.valid;
    if (!this.materialesPorProductoF('producto')?.valid) valido = false;
    if (!this.materialesPorProductoF('materiaPrima')?.valid) valido = false;
    if (!this.materialesPorProductoF('cantidadNecesaria')?.valid) valido = false;
    return valido;
  }

  seleccionarMaterialesPorProducto(row: any) {
    this.materialesPorProductoSeleccionado = row;
    this.materialesPorProductoF('producto')?.setValue(this.materialesPorProductoSeleccionado.producto);
    this.materialesPorProductoF('materiaPrima')?.setValue(this.materialesPorProductoSeleccionado.materiaPrima);
    this.materialesPorProductoF('cantidadNecesaria')?.setValue(this.materialesPorProductoSeleccionado.cantidadNecesaria);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
