import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../utils/material.module';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
  standalone: true,
  imports: [MaterialModule,RouterOutlet]
})
export class MantenimientoComponent {
  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,) { }

  ngOnInit(): void {
  }

  abrirMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idUsuario: 1
    };
    const dialogRef = this.dialog.open(MenuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result && result?.url) {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "nada": 'xd'
            }
          };
          this._router.navigate([result.url], navigationExtras);
        }
      });
  }
}
