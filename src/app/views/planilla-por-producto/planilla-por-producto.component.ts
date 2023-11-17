import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Planilla } from 'src/app/models/planilla';
import { PlanillaPorProducto } from 'src/app/models/planilla-por-producto';
import { Producto } from 'src/app/models/producto';
import { PlanillaPorProductoService } from 'src/app/service/planilla-por-producto.service';
import { PlanillaService } from 'src/app/service/planilla.service';
import { ProductoService } from 'src/app/service/producto.service';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-planilla-por-producto',
  templateUrl: './planilla-por-producto.component.html',
  styleUrls: ['./planilla-por-producto.component.css']
})
export class PlanillaPorProductoComponent {
  //forms
  public planillaPorProductoForm: UntypedFormGroup;

  public productoSeleccionado: Producto = {
    idProducto: 0,
    nombreProducto: ''
  };
  public planillaSeleccionada: Planilla = {
    idPlanilla: 0,
    nombre: '',
    puesto: {
      idPuesto: 0,
      departamento: {
        idDepartamento: 0,
        nombreDepartamento: ''
      },
      rubro: {
        idRubro: 0,
        nombreRubro: ''
      },
      nombrePuesto: ''
    },
    esEmpleadoDirecto: false,
    salarioMensual: 0,
    numeroEmpleados: 0
  };
  //selected
  public planillaPorProductoSeleccionada: PlanillaPorProducto = {
    idPlanillaProducto: 0,
    producto: this.productoSeleccionado,
    planilla: this.planillaSeleccionada,
    cantidadRecursos: 0,
    horasLaboradas: 0,
    horasNocturnidad: 0,
    horasExtraDiurnas: 0,
    horasExtraNocturnas: 0
  };

  //list
  public planillaPorProductoList: Array<PlanillaPorProducto> = [];
  public productoList: Array<Producto> = [];
  public planillaList: Array<Planilla> = [];

  constructor(
    public planillaPorProductoService: PlanillaPorProductoService,
    public productoService: ProductoService,
    public planillaService: PlanillaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.planillaPorProductoForm = this.formBuilder.group({
      producto: [null, [Validators.required]],
      planilla: [null, [Validators.required]],
      cantidadRecursos: [0, [Validators.required, Validators.min(0)]],
      horasLaboradas: [0, [Validators.required, Validators.min(0)]],
      horasNocturnidad: [0, [Validators.required, Validators.min(0)]],
      horasExtraDiurnas: [0, [Validators.required, Validators.min(0)]],
      horasExtraNocturnas: [0, [Validators.required, Validators.min(0)]]
    });
    this.cargarPlanillaPorProducto()
  }

  planillaPorProductoF(control: string) { return this.planillaPorProductoForm.get(control); }

  cargarPlanillaPorProducto() {
    this.planillaPorProductoService.getList(lista => this.planillaPorProductoList = lista);
  }
  cargarProductos() {
    this.productoService.getList(lista => this.productoList = lista);
  }
  cargarMateriasPrimas() {
    this.planillaService.getList(lista => this.planillaList = lista);
  }

  guardarPlanillaPorProducto() {
    if (this.validarDatos()) {
      this.planillaPorProductoSeleccionada.producto = this.planillaPorProductoF('producto')?.value;
      this.planillaPorProductoSeleccionada.planilla = this.planillaPorProductoF('planilla')?.value;
      this.planillaPorProductoSeleccionada.cantidadRecursos = this.planillaPorProductoF('cantidadRecursos')?.value;
      this.planillaPorProductoSeleccionada.horasLaboradas = this.planillaPorProductoF('horasLaboradas')?.value;
      this.planillaPorProductoSeleccionada.horasNocturnidad = this.planillaPorProductoF('horasNocturnidad')?.value;
      this.planillaPorProductoSeleccionada.horasExtraDiurnas = this.planillaPorProductoF('horasExtraDiurnas')?.value;
      this.planillaPorProductoSeleccionada.horasExtraNocturnas = this.planillaPorProductoF('horasExtraNocturnas')?.value;
      if (this.planillaPorProductoSeleccionada.idPlanillaProducto > 0) {
        this.planillaPorProductoService.editOne(this.planillaPorProductoSeleccionada, listener => {
          Utils.openSnackBar('PlanillaPorProducto Editado', 'ok', this._snackBar);
        });
      } else {
        this.planillaPorProductoService.creteOne(this.planillaPorProductoSeleccionada, listener => {
          if (listener && listener?.idPlanillaProducto > 0) {
            this.planillaPorProductoList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('Escribe nombre de departamento', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.planillaPorProductoForm.valid;
    if (!this.planillaPorProductoF('producto')?.valid) valido = false;
    if (!this.planillaPorProductoF('planilla')?.valid) valido = false;
    if (!this.planillaPorProductoF('cantidadRecursos')?.valid) valido = false;
    if (!this.planillaPorProductoF('horasLaboradas')?.valid) valido = false;
    if (!this.planillaPorProductoF('horasNocturnidad')?.valid) valido = false;
    if (!this.planillaPorProductoF('horasExtraDiurnas')?.valid) valido = false;
    if (!this.planillaPorProductoF('horasExtraNocturnas')?.valid) valido = false;
    return valido;
  }

  seleccionarPlanillaPorProducto(row: any) {
    this.planillaPorProductoSeleccionada = row;
    this.planillaPorProductoF('producto')?.setValue(this.planillaPorProductoSeleccionada.producto);
    this.planillaPorProductoF('planilla')?.setValue(this.planillaPorProductoSeleccionada.planilla);
    this.planillaPorProductoF('cantidadRecursos')?.setValue(this.planillaPorProductoSeleccionada.cantidadRecursos);
    this.planillaPorProductoF('horasLaboradas')?.setValue(this.planillaPorProductoSeleccionada.horasLaboradas);
    this.planillaPorProductoF('horasNocturnidad')?.setValue(this.planillaPorProductoSeleccionada.horasNocturnidad);
    this.planillaPorProductoF('horasExtraDiurnas')?.setValue(this.planillaPorProductoSeleccionada.horasExtraDiurnas);
    this.planillaPorProductoF('horasExtraNocturnas')?.setValue(this.planillaPorProductoSeleccionada.horasExtraNocturnas);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
