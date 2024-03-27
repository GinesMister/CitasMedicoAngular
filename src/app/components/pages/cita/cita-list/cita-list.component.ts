import { Component } from '@angular/core';
import { Cita } from '../../../../models/CitaDTO';
import { MatDialog } from '@angular/material/dialog';
import { DataServerService } from '../../../../services/data-server.service';
import { LoadingService } from '../../../../services/loading.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../../../pop-ups/delete-confirmation/delete-confirmation.component';
import { Paciente } from '../../../../models/PacienteDTO';
import { Medico } from '../../../../models/MedicoDTO';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss']
})
export class CitaListComponent {
  arrCita: Array<Cita> = []
  arrPaciente: Array<Paciente> = []
  arrMedico: Array<Medico> = []

  funcCita: Cita
  
  constructor(private dataCitaSv: DataServerService<Cita>, private dataMedicoSv: DataServerService<Medico>, private dataPacienteSv: DataServerService<Paciente>,private dialog: MatDialog, public loading: LoadingService, public router: Router) {
    this.updateList()
    this.funcCita = new Cita()
  }
  
  updateList() {
    this.loading.isLoading = true
    this.dataCitaSv.getAll('cita').subscribe(result => {
      this.arrCita = result       
      this.loading.isLoading = false
    }, error => {
      this.popupMessage = 'Error al cargar'
      this.openPopup()
      this.loading.isLoading = false
    })
    this.fillPacientes()
    this.fillMedicos()
  }

  fillPacientes() {
    this.dataPacienteSv.getAll('paciente').subscribe(result => {
      this.arrPaciente = result
    })
  }
  fillMedicos() {
    this.dataMedicoSv.getAll('medico').subscribe(result => {
      this.arrMedico = result
    })
  }
  getPacienteFullName(idPaciente: number) {
    const nombre = this.arrPaciente.find(p => p.id == idPaciente)?.nombre
    if (typeof nombre === 'undefined') return
    const apellidos = this.arrPaciente.find(p => p.id == idPaciente)?.apellidos
    return  `${nombre} ${apellidos}`
  }
  getMedicoFullName(idMedico: number) {
    const nombre = this.arrMedico.find(p => p.id == idMedico)?.nombre
    if (typeof nombre === 'undefined') return
    const apellidos = this.arrMedico.find(p => p.id == idMedico)?.apellidos
    return  `${nombre} ${apellidos}`
  }
  
  openDeleteDialog(idCita: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataCitaSv.deleteById('cita', idCita).subscribe(() => { this.updateList() })
        this.popupMessage = 'Cita borrada correctamente'
        this.openPopup()
        console.log(`Cita con ID ${idCita} borrada correctamente`)
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

  goToDetails(idCita: number) {
    this.router.navigate(['/citas/' + idCita])
  }
}