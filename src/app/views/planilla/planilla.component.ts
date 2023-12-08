import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Planilla } from '../../models/planilla';
import { Puesto } from '../../models/puesto';
import { PlanillaService } from '../../service/planilla.service';
import { PuestoService } from '../../service/puesto.service';
import { MaterialModule } from '../../utils/material.module';
import { Utils } from '../../utils/utilidades';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class PlanillaComponent {
  //forms
  public planillaForm: UntypedFormGroup;

  //selected
  public puestoSeleccionado: Puesto = {
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
  }
  public planillaSeleccionado: Planilla = {
    idPlanilla: 0,
    nombre: '',
    puesto: this.puestoSeleccionado,
    esEmpleadoDirecto: false,
    salarioMensual: 0,
    numeroEmpleados: 0
  };

  //list
  public planillaList: Array<Planilla> = [];
  public puestoList: Array<Puesto> = [];

  constructor(
    public planillaService: PlanillaService,
    public puestoService: PuestoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.planillaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      puesto: [null, [Validators.required, Validators.minLength(3)]],
      esEmpleadoDirecto: [false, [Validators.required]],
      salarioMensual: ['', [Validators.required, Validators.min(0.00)]],
      numeroEmpleados: ['', [Validators.required, Validators.min(0)]]
    });
    this.cargarPlanillas();
    this.cargarPuestos();
  }

  planillaF(control: string) { return this.planillaForm.get(control); }

  cargarPlanillas() {
    this.planillaService.getList(lista => this.planillaList = lista);
  }
  cargarPuestos() {
    this.puestoService.getList(lista => this.puestoList = lista);
  }

  guardarPlanilla() {
    if (this.validarDatos()) {
      this.planillaSeleccionado.nombre = this.planillaF('nombre')?.value;
      this.planillaSeleccionado.puesto = this.planillaF('puesto')?.value;
      this.planillaSeleccionado.esEmpleadoDirecto = this.planillaF('esEmpleadoDirecto')?.value;
      this.planillaSeleccionado.salarioMensual = this.planillaF('salarioMensual')?.value;
      this.planillaSeleccionado.numeroEmpleados = this.planillaF('numeroEmpleados')?.value;
      if (this.planillaSeleccionado.idPlanilla > 0) {
        this.planillaService.editOne(this.planillaSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.planillaService.creteOne(this.planillaSeleccionado, listener => {
          if (listener && listener?.idPlanilla > 0) {
            this.planillaList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.planillaForm.valid;
    if (!this.planillaF('nombre')?.valid) valido = false;
    if (!this.planillaF('puesto')?.valid) valido = false;
    if (!this.planillaF('esEmpleadoDirecto')?.valid) valido = false;
    if (!this.planillaF('salarioMensual')?.valid) valido = false;
    if (!this.planillaF('numeroEmpleados')?.valid) valido = false;
    return valido;
  }

  seleccionarPlanilla(row: any) {
    this.planillaSeleccionado = row;
    this.planillaF('nombre')?.setValue(this.planillaSeleccionado.nombre);
    this.planillaF('puesto')?.setValue(this.planillaSeleccionado.puesto);
    this.planillaF('esEmpleadoDirecto')?.setValue(this.planillaSeleccionado.esEmpleadoDirecto);
    this.planillaF('salarioMensual')?.setValue(this.planillaSeleccionado.salarioMensual);
    this.planillaF('numeroEmpleados')?.setValue(this.planillaSeleccionado.numeroEmpleados);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
