import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InventarioMateriaPrima } from '../../models/inventario-materia-prima';
import { MateriaPrima } from '../../models/materia-prima';
import { InventarioMateriaPrimaService } from '../../service/inventario-materia-prima.service';
import { MateriaPrimaService } from '../../service/materia-prima.service';
import { Utils } from '../../utils/utilidades';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../utils/material.module';


@Component({
  selector: 'app-inventario-materia-prima',
  templateUrl: './inventario-materia-prima.component.html',
  styleUrls: ['./inventario-materia-prima.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class InventarioMateriaPrimaComponent {

  //forms
  public inventarioMPForm: UntypedFormGroup;

  //selected
  public materiaPrimaSelected: MateriaPrima = {
    idMateria: 0,
    nombreMateria: '',
    tipoMateria: '',
    costoUnitarioMateria: 0,
    fleteMateria: 0
  };
  public inventarioMPSeleccionado: InventarioMateriaPrima = {
    idInventarioMP: 0,
    materiaPrima: this.materiaPrimaSelected,
    lote: '',
    esImportado: false,
    flete: 0,
    cantidad: 0
  };

  //list
  public inventarioMPList: Array<InventarioMateriaPrima> = [];
  public materiaPrimaList: Array<MateriaPrima> = [];

  constructor(
    public inventarioMPService: InventarioMateriaPrimaService,
    public materiaPrimaService: MateriaPrimaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.inventarioMPForm = this.formBuilder.group({
      materiaPrima: [null, [Validators.required]],
      lote: ['', [Validators.required, Validators.minLength(3)]],
      esImportado: [false, [Validators.required]],
      flete: ['', [Validators.required, Validators.min(0.00)]],
      cantidad: ['', [Validators.required, Validators.min(0.00)]]
    });
    this.cargarInventariosMP();
    this.cargarMateriasPrimas();
  }

  inventarioMPF(control: string) { return this.inventarioMPForm.get(control); }

  cargarInventariosMP() {
    this.inventarioMPService.getList(lista => this.inventarioMPList = lista);
  }

  cargarMateriasPrimas() {
    this.materiaPrimaService.getList(lista => this.materiaPrimaList = lista);
  }

  guardarInventarioMP() {
    if (this.validarDatos()) {
      this.materiaPrimaSelected = this.inventarioMPF('materiaPrima')?.value
      this.inventarioMPSeleccionado.materiaPrima = this.materiaPrimaSelected;
      this.inventarioMPSeleccionado.lote = this.inventarioMPF('lote')?.value;
      this.inventarioMPSeleccionado.esImportado = this.inventarioMPF('esImportado')?.value;
      this.inventarioMPSeleccionado.flete = this.inventarioMPF('flete')?.value;
      this.inventarioMPSeleccionado.cantidad = this.inventarioMPF('cantidad')?.value;
      if (this.inventarioMPSeleccionado.idInventarioMP > 0) {
        this.inventarioMPService.editOne(this.inventarioMPSeleccionado, listener => {
          Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
        });
      } else {
        this.inventarioMPService.creteOne(this.inventarioMPSeleccionado, listener => {
          if (listener && listener?.idInventarioMP > 0) {
            this.inventarioMPList.push(listener);
          }
        });
      }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.inventarioMPForm.valid;
    if (!this.inventarioMPF('materiaPrima')?.valid) valido = false;
    if (!this.inventarioMPF('lote')?.valid) valido = false;
    if (!this.inventarioMPF('esImportado')?.valid) valido = false;
    if (!this.inventarioMPF('flete')?.valid) valido = false;
    if (!this.inventarioMPF('cantidad')?.valid) valido = false;
    return valido;
  }

  seleccionarInventarioMP(row: any) {
    this.inventarioMPSeleccionado = row;
    this.materiaPrimaSelected = this.inventarioMPSeleccionado.materiaPrima;
    this.inventarioMPF('materiaPrima')?.setValue(this.inventarioMPSeleccionado.materiaPrima);
    this.inventarioMPF('lote')?.setValue(this.inventarioMPSeleccionado.lote);
    this.inventarioMPF('esImportado')?.setValue(this.inventarioMPSeleccionado.esImportado);
    this.inventarioMPF('flete')?.setValue(this.inventarioMPSeleccionado.flete);
    this.inventarioMPF('cantidad')?.setValue(this.inventarioMPSeleccionado.cantidad);
  }

  seleccionarMateriaPrima(row: any) {
    this.materiaPrimaSelected = row;
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }

}
