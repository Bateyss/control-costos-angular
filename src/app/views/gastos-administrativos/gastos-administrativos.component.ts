import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GastosAdministrativos } from '../../models/gastos-administrativos';
import { GastosAdministrativosService } from '../../service/gastos-administrativos.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-gastos-administrativos',
  templateUrl: './gastos-administrativos.component.html',
  styleUrls: ['./gastos-administrativos.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class GastosAdministrativosComponent {
  //forms
  public gastoAdministrativoForm: UntypedFormGroup;

  //selected
  public gastoAdministrativoSeleccionado: GastosAdministrativos = {
    descripcion: '',
    inversionMensual: 0,
    activo: false,
    idGastoAdministrativo: 0
  };

  //list
  public gastoAdministrativoList: Array<GastosAdministrativos> = [];

  constructor(
    public gastoAdministrativoService: GastosAdministrativosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.gastoAdministrativoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      inversionMensual: ['', [Validators.required, Validators.min(0.00)]],
      activo: [false, [Validators.required, Validators.minLength(3)]],
    });
    this.cargarGastosAdministrativos()
  }

  gastoAdministrativoF(control: string) { return this.gastoAdministrativoForm.get(control); }

  cargarGastosAdministrativos() {
    this.gastoAdministrativoService.getList(lista => this.gastoAdministrativoList = lista);
  }

  guardarGastosAdministrativos() {
    if (this.validarDatos()) {
      this.gastoAdministrativoSeleccionado.descripcion = this.gastoAdministrativoF('descripcion')?.value;
      this.gastoAdministrativoSeleccionado.inversionMensual = this.gastoAdministrativoF('inversionMensual')?.value;
      this.gastoAdministrativoSeleccionado.activo = this.gastoAdministrativoF('activo')?.value;
      if (this.gastoAdministrativoSeleccionado.idGastoAdministrativo > 0) {
        this.gastoAdministrativoService.editOne(this.gastoAdministrativoSeleccionado, listener => {
          Utils.openSnackBar('GastosAdministrativos Editado', 'ok', this._snackBar);
        });
      } else {
        this.gastoAdministrativoService.creteOne(this.gastoAdministrativoSeleccionado, listener => {
          if (listener && listener?.idGastoAdministrativo > 0) {
            this.gastoAdministrativoList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('Escribe nombre de departamento', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.gastoAdministrativoForm.valid;
    if (!this.gastoAdministrativoF('descripcion')?.valid) valido = false;
    if (!this.gastoAdministrativoF('inversionMensual')?.valid) valido = false;
    if (!this.gastoAdministrativoF('activo')?.valid) valido = false;
    return valido;
  }

  seleccionarGastosAdministrativos(row: any) {
    this.gastoAdministrativoSeleccionado = row;
    this.gastoAdministrativoF('descripcion')?.setValue(this.gastoAdministrativoSeleccionado.descripcion);
    this.gastoAdministrativoF('inversionMensual')?.setValue(this.gastoAdministrativoSeleccionado.inversionMensual);
    this.gastoAdministrativoF('activo')?.setValue(this.gastoAdministrativoSeleccionado.activo);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
