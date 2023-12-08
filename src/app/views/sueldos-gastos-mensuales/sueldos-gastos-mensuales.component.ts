import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SueldoGastosMensuales } from '../../models/sueldo-gastos-mensuales';
import { SueldosGastosMensualesService } from '../../service/sueldos-gastos-mensuales.service';
import { Utils } from '../../utils/utilidades';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-sueldos-gastos-mensuales',
  templateUrl: './sueldos-gastos-mensuales.component.html',
  styleUrls: ['./sueldos-gastos-mensuales.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class SueldosGastosMensualesComponent {
  //forms
  public sueldosGastosMensualesForm: UntypedFormGroup;

  //selected
  public sueldoGastoMensualSeleccionado: SueldoGastosMensuales = {
    idSueldoGastoMensual: 0,
    descripcion: '',
    inversionMensual: 0,
    activo: false
  };

  //list
  public sueldoGastoMensualList: Array<SueldoGastosMensuales> = [];

  constructor(
    public sueldoGastoMensualService: SueldosGastosMensualesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.sueldosGastosMensualesForm = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      inversionMensual: ['', [Validators.required, Validators.min(0.00)]],
      activo: [false, [Validators.required, Validators.minLength(3)]],
    });
    this.cargarSueldoGastosMensuales()
  }

  sueldosGastosMensualesF(control: string) { return this.sueldosGastosMensualesForm.get(control); }

  cargarSueldoGastosMensuales() {
    this.sueldoGastoMensualService.getList(lista => this.sueldoGastoMensualList = lista);
  }

  guardarSueldoGastosMensuales() {
    if (this.validarDatos()) {
      this.sueldoGastoMensualSeleccionado.descripcion = this.sueldosGastosMensualesF('descripcion')?.value;
      this.sueldoGastoMensualSeleccionado.inversionMensual = this.sueldosGastosMensualesF('inversionMensual')?.value;
      this.sueldoGastoMensualSeleccionado.activo = this.sueldosGastosMensualesF('activo')?.value;
      if (this.sueldoGastoMensualSeleccionado.idSueldoGastoMensual > 0) {
        this.sueldoGastoMensualService.editOne(this.sueldoGastoMensualSeleccionado, listener => {
          Utils.openSnackBar('SueldoGastosMensuales Editado', 'ok', this._snackBar);
        });
      } else {
        this.sueldoGastoMensualService.creteOne(this.sueldoGastoMensualSeleccionado, listener => {
          if (listener && listener?.idSueldoGastoMensual > 0) {
            this.sueldoGastoMensualList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('Escribe nombre de departamento', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.sueldosGastosMensualesForm.valid;
    if (!this.sueldosGastosMensualesF('descripcion')?.valid) valido = false;
    if (!this.sueldosGastosMensualesF('inversionMensual')?.valid) valido = false;
    if (!this.sueldosGastosMensualesF('activo')?.valid) valido = false;
    return valido;
  }

  seleccionarSueldoGastosMensuales(row: any) {
    this.sueldoGastoMensualSeleccionado = row;
    this.sueldosGastosMensualesF('descripcion')?.setValue(this.sueldoGastoMensualSeleccionado.descripcion);
    this.sueldosGastosMensualesF('inversionMensual')?.setValue(this.sueldoGastoMensualSeleccionado.inversionMensual);
    this.sueldosGastosMensualesF('activo')?.setValue(this.sueldoGastoMensualSeleccionado.activo);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
