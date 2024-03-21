import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó, realiza la acción de borrado
        console.log('Borrando elemento...');
      }
    })
  }
}
