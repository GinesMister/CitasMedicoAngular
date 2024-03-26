import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { Paciente } from '../../../../models/PacienteDTO';
import { DataServerService } from '../../../../services/data-server.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../../../services/loading.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../../../pop-ups/delete-confirmation/delete-confirmation.component';
import { Medico } from '../../../../models/MedicoDTO';
import { MedicoRequest } from '../../../../models/request/MedicoRequestDTO';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent {

  // Opciones
  @Input('isPage') isPage = true
  @Input('buttonsToShow') buttonsToShow = ['create', 'delete', 'details']
  @Input('idMedico') idMedico?: number
  @Input('pacientesToSkip') idsPacinete? : Array<number>

  arrPaciente: Array<Paciente> = []
  
  constructor(private dataSvPaciente: DataServerService<Paciente>, private dataSvMedico: DataServerService<Medico>,private dialog: MatDialog, public loading: LoadingService, private router: Router) {
    this.updateList()
  }
  
  updateList() {
    this.loading.isLoading = true
    this.dataSvPaciente.getAll('paciente').subscribe(result => {
      this.arrPaciente = result
      if (this.idsPacinete != null)
        this.applyFilter(this.idsPacinete!)
      this.loading.isLoading = false
    }, error => {
      this.popupMessage = 'Error al cargar'
      this.openPopup()
      this.loading.isLoading = false
    })
  }

  applyFilter(idsPaciente: Array<number>) {
    this.arrPaciente = this.arrPaciente.filter(paciente => !idsPaciente.includes(paciente.id))
  }
  
  openDeleteDialog(idPaciente: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSvPaciente.deleteById('paciente', idPaciente).subscribe(() => { this.updateList() })
        this.popupMessage = 'Paciente borrado correctamente'
        this.openPopup()
        console.log(`Paciente con ID ${idPaciente} borrado correctamente`)
      }
    })
  }
  
  goToDetails(idPaciente: number) {
    this.router.navigate(['/pacientes/' + idPaciente])
  }

  @Output() updatePage = new EventEmitter<void>()
  bindToMedico(idPaciente: number) {
    if (this.idMedico == null || this.idMedico == undefined)
      throw new Error("No se ha introducido un médico en el componente")

    this.dataSvMedico.getById('medico', this.idMedico!).subscribe(result => {
      const mr = new MedicoRequest(result.nombre, result.apellidos, result.nombreUsuario, result.clave, result.numColegiado)
        result.pacientes.forEach(p => {
            mr.idsPaciente.push(p.id)
        })
        mr.idsPaciente.push(idPaciente)
      this.dataSvMedico.update('medico', mr, this.idMedico!).subscribe(() => {
        this.popupMessage = "Se ha asignado este paciente correctamente"
        this.updatePage.emit()
        this.updateList()
      }, error => {
        this.popupMessage = `Ha ocurrido un error al intentar asignar el paciente a este médico`
      }).add(() => this.openPopup())
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
}
