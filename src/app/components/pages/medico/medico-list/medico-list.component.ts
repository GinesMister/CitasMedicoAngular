import { Component } from '@angular/core';
import { Medico } from '../../../../models/MedicoDTO';
import { DataServerService } from '../../../../services/data-server.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../../pop-ups/delete-confirmation/delete-confirmation.component';
import { LoadingService } from '../../../../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.scss']
})
export class MedicoListComponent {

  arrMedico: Array<Medico> = []
  
  constructor(private dataSv: DataServerService<Medico>, private dialog: MatDialog, public loading: LoadingService, private router: Router) {
    this.updateList()
  }
  
  updateList() {
    this.loading.isLoading = true
    this.dataSv.getAll('Medico').subscribe(result => {
      this.arrMedico = result       
      this.loading.isLoading = false
    }, error => {
      this.popupMessage = 'Error al cargar'
      this.openPopup()
      this.loading.isLoading = false
    })
  }
  
  openDeleteDialog(idMedico: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSv.deleteById('Medico', idMedico).subscribe(() => { this.updateList() })
        this.popupMessage = 'Médico borrado correctamente'
        this.openPopup()
        console.log(`Médico con ID ${idMedico} borrado correctamente`)
      }
    })
  }
  
  popupTime = 3400
  visiblePopup: boolean = false
  popupMessage = ''
  openPopup() {
    this.visiblePopup = true
    setTimeout(() => {
      this.visiblePopup = false
    }, this.popupTime + 1000)
  }

  goToDetails(idMedico: number) {
    this.router.navigate(['/medicos/' + idMedico])
  }
}
