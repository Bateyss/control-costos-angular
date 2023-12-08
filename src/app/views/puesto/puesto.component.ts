import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Departamento } from '../../models/departamento';
import { Puesto } from '../../models/puesto';
import { Rubro } from '../../models/rubro';
import { DepartamentoService } from '../../service/departamento.service';
import { PuestoService } from '../../service/puesto.service';
import { RubroService } from '../../service/rubro.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class PuestoComponent {
  //forms
  public puestoForm: UntypedFormGroup;

  //selected
  public rubroSelected: Rubro = {
    idRubro: 0,
    nombreRubro: ''
  };
  public departamentoSelected: Departamento = {
    idDepartamento: 0,
    nombreDepartamento: ''
  };
  public puestoSeleccionado: Puesto = {
    idPuesto: 0,
    departamento: this.departamentoSelected,
    rubro: this.rubroSelected,
    nombrePuesto: ''
  };

  //list
  public puestoList: Array<Puesto> = [];
  public rubroList: Array<Rubro> = [];
  public departamentoList: Array<Departamento> = [];

  constructor(
    public puestoService: PuestoService,
    public rubroService: RubroService,
    public departamentoService: DepartamentoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.puestoForm = this.formBuilder.group({
      departamento: [null, [Validators.required]],
      rubro: [null, [Validators.required]],
      nombrePuesto: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.cargarPuestos();
    this.cargarRubros();
    this.cargarDepartamentos(); 
  }

  puestoF(control: string) { return this.puestoForm.get(control); }

  cargarPuestos() {
    this.puestoService.getList(lista => this.puestoList = lista);
  }

  cargarRubros() {
    this.rubroService.getList(lista => this.rubroList = lista);
  }

  cargarDepartamentos() {
    this.departamentoService.getList(lista => this.departamentoList = lista);
  }

  guardarPuesto() {
    if (this.validarDatos()) {
      this.puestoSeleccionado.departamento = this.puestoF('departamento')?.value
      this.puestoSeleccionado.rubro = this.puestoF('rubro')?.value;
      this.puestoSeleccionado.nombrePuesto = this.puestoF('nombrePuesto')?.value;
      if (this.puestoSeleccionado.idPuesto > 0) {
        this.puestoService.editOne(this.puestoSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.puestoService.creteOne(this.puestoSeleccionado, listener => {
          if (listener && listener?.idPuesto > 0) {
            this.puestoList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.puestoForm.valid;
    if (!this.puestoF('departamento')?.valid) valido = false;
    if (!this.puestoF('rubro')?.valid) valido = false;
    if (!this.puestoF('nombrePuesto')?.valid) valido = false;
    return valido;
  }

  seleccionarPuesto(row: any) {
    this.puestoSeleccionado = row;
    this.puestoF('departamento')?.setValue(this.puestoSeleccionado.departamento);
    this.puestoF('rubro')?.setValue(this.puestoSeleccionado.rubro);
    this.puestoF('nombrePuesto')?.setValue(this.puestoSeleccionado.nombrePuesto);
  }

  seleccionarRubro(row: any) {
    this.rubroSelected = row;
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
