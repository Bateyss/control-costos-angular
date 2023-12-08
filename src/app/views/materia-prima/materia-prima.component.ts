import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MateriaPrima } from '../../models/materia-prima';
import { MateriaPrimaService } from '../../service/materia-prima.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class MateriaPrimaComponent {

  //forms
  public materiaPrimaForm: UntypedFormGroup;

  //selected
  public materiaPrimaSeleccionado: MateriaPrima = {
    idMateria: 0,
    nombreMateria: '',
    tipoMateria: '',
    costoUnitarioMateria: 0,
    fleteMateria: 0
  };

  //list
  public materiaPrimaList: Array<MateriaPrima> = [];

  constructor(
    public materiaPrimaService: MateriaPrimaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.materiaPrimaForm = this.formBuilder.group({
      nombreMateria: ['', [Validators.required, Validators.minLength(3)]],
      tipoMateria: ['', [Validators.required, Validators.minLength(3)]],
      costoUnitarioMateria: ['', [Validators.required, Validators.min(0.00)]],
      fleteMateria: ['', [Validators.required, Validators.min(0.00)]]
    });
    this.cargarMateriasPrimas();
  }

  materiaPrimaF(control: string) { return this.materiaPrimaForm.get(control); }

  cargarMateriasPrimas() {
    this.materiaPrimaService.getList(lista => this.materiaPrimaList = lista);
  }

  guardarMateriaPrima() {
    if (this.validarDatos()) {
      this.materiaPrimaSeleccionado.nombreMateria = this.materiaPrimaF('nombreMateria')?.value;
      this.materiaPrimaSeleccionado.tipoMateria = this.materiaPrimaF('tipoMateria')?.value;
      this.materiaPrimaSeleccionado.costoUnitarioMateria = this.materiaPrimaF('costoUnitarioMateria')?.value;
      this.materiaPrimaSeleccionado.fleteMateria = this.materiaPrimaF('fleteMateria')?.value;
      if (this.materiaPrimaSeleccionado.idMateria > 0) {
        this.materiaPrimaService.editOne(this.materiaPrimaSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.materiaPrimaService.creteOne(this.materiaPrimaSeleccionado, listener => {
          if (listener && listener?.idMateria > 0) {
            this.materiaPrimaList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.materiaPrimaForm.valid;
    if (!this.materiaPrimaF('nombreMateria')?.valid) valido = false;
    if (!this.materiaPrimaF('tipoMateria')?.valid) valido = false;
    if (!this.materiaPrimaF('costoUnitarioMateria')?.valid) valido = false;
    if (!this.materiaPrimaF('fleteMateria')?.valid) valido = false;
    return valido;
  }

  seleccionarMateriaPrima(row: any) {
    this.materiaPrimaSeleccionado = row;
    this.materiaPrimaF('nombreMateria')?.setValue(this.materiaPrimaSeleccionado.nombreMateria);
    this.materiaPrimaF('tipoMateria')?.setValue(this.materiaPrimaSeleccionado.tipoMateria);
    this.materiaPrimaF('costoUnitarioMateria')?.setValue(this.materiaPrimaSeleccionado.costoUnitarioMateria);
    this.materiaPrimaF('fleteMateria')?.setValue(this.materiaPrimaSeleccionado.fleteMateria);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }

}
