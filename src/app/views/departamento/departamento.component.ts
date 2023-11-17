import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { Utils } from 'src/app/utils/utilidades';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent {

  //forms
  public departamentoForm: UntypedFormGroup;

  //selected
  public departamentoSeleccionado: Departamento = {
    idDepartamento: 0,
    nombreDepartamento: ''
  };

  //list
  public departamentoList: Array<Departamento> = [];

  constructor(
    public departamentoService: DepartamentoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.departamentoForm = this.formBuilder.group({
      nombreDepartamento: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.cargarDepartamentos()
  }

  departamentoF(control: string) { return this.departamentoForm.get(control); }

  cargarDepartamentos() {
    this.departamentoService.getList(lista => this.departamentoList = lista);
  }

  guardarDepartamento() {
    if (this.validarDatos()) {
      this.departamentoSeleccionado.nombreDepartamento = this.departamentoF('nombreDepartamento')?.value;
      if (this.departamentoSeleccionado.idDepartamento > 0){
        this.departamentoService.editOne(this.departamentoSeleccionado, listener => { 
          Utils.openSnackBar('Departamento Editado', 'ok', this._snackBar);
        });
      } else {
        this.departamentoService.creteOne(this.departamentoSeleccionado, listener => {
          if (listener && listener?.idDepartamento > 0) {
            this.departamentoList.push(listener);
          }
        }); 
      }
    } else {
      Utils.openSnackBar('Escribe nombre de departamento', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.departamentoForm.valid;
    if (!this.departamentoF('nombreDepartamento')?.valid) valido = false;
    return valido;
  }

  seleccionarDepartamento(row: any) {
    this.departamentoSeleccionado = row;
    this.departamentoF('nombreDepartamento')?.setValue(this.departamentoSeleccionado.nombreDepartamento);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }
}
