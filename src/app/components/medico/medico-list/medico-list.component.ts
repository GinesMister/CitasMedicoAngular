import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/MedicoDTO';
import { DataServerService } from '../../../services/data-server.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../pop-ups/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.scss']
})
export class MedicoListComponent {

  arrMedico: Array<Medico> = []
  
  constructor(private dataSv: DataServerService<Medico>, private dialog: MatDialog) {
    dataSv.getAll('Medico').subscribe(result => this.arrMedico = result)
  }
  
  updateList() {
    this.dataSv.getAll('Medico').subscribe(result => this.arrMedico = result)
  }
  
  openDeleteDialog(idMedico: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSv.deleteById('Medico', idMedico).subscribe(() => { this.updateList() })
        this.openPopup()
        console.log(`Médico con ID ${idMedico} borrado correctamente`)
      }
    })
  }
  
  popupTime = 3400
  visiblePopup: boolean = false
  openPopup() {
    this.visiblePopup = true
    setTimeout(() => {
      this.visiblePopup = false
    }, this.popupTime + 1000)
  }
}
