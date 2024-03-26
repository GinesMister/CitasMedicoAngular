import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../../models/PacienteDTO';
import { DataServerService } from '../../../../services/data-server.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../../../services/loading.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../../../pop-ups/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent {
  arrPaciente: Array<Paciente> = []
  
  constructor(private dataSv: DataServerService<Paciente>, private dialog: MatDialog, public loading: LoadingService, private router: Router) {
    this.updateList()
  }
  
  updateList() {
    this.loading.isLoading = true
    this.dataSv.getAll('paciente').subscribe(result => {
      this.arrPaciente = result       
      this.loading.isLoading = false
    }, error => {
      this.popupMessage = 'Error al cargar'
      this.openPopup()
      this.loading.isLoading = false
    })
  }
  
  openDeleteDialog(idPaciente: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSv.deleteById('paciente', idPaciente).subscribe(() => { this.updateList() })
        this.popupMessage = 'Paciente borrado correctamente'
        this.openPopup()
        console.log(`Paciente con ID ${idPaciente} borrado correctamente`)
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

  goToDetails(idPaciente: number) {
    this.router.navigate(['/pacientes/' + idPaciente])
  }
}
