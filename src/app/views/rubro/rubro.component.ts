import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rubro } from '../../models/rubro';
import { RubroService } from '../../service/rubro.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class RubroComponent {
  //forms
  public rubroForm: UntypedFormGroup;

  //selected
  public rubroSeleccionado: Rubro = {
    idRubro: 0,
    nombreRubro: ''
  };

  //list
  public rubroList: Array<Rubro> = [];

  constructor(
    public rubroService: RubroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.rubroForm = this.formBuilder.group({
      nombreRubro: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.cargarRubros();
  }

  rubroF(control: string) { return this.rubroForm.get(control); }

  cargarRubros() {
    this.rubroService.getList(lista => this.rubroList = lista);
  }


  guardarRubro() {
    if (this.validarDatos()) {
      this.rubroSeleccionado.nombreRubro = this.rubroF('nombreRubro')?.value;
      if (this.rubroSeleccionado.idRubro > 0) {
        this.rubroService.editOne(this.rubroSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.rubroService.creteOne(this.rubroSeleccionado, listener => {
          if (listener && listener?.idRubro > 0) {
            this.rubroList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.rubroForm.valid;
    if (!this.rubroF('nombreRubro')?.valid) valido = false;
    return valido;
  }

  seleccionarRubro(row: any) {
    this.rubroSeleccionado = row;
    this.rubroF('nombreRubro')?.setValue(this.rubroSeleccionado.nombreRubro);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
