import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServerService } from '../../../../services/data-server.service';
import { Medico } from '../../../../models/MedicoDTO';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';
import { Paciente } from '../../../../models/PacienteDTO';
import { MedicoRequest } from '../../../../models/request/MedicoRequestDTO';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../../pop-ups/delete-confirmation/delete-confirmation.component';
import { PacienteListComponent } from '../../paciente/paciente-list/paciente-list.component';

@Component({
  selector: 'app-medico-details',
  templateUrl: './medico-details.component.html',
  styleUrls: ['./medico-details.component.scss']
})
export class MedicoDetailsComponent {
  
  medico: Medico | undefined
  
  isAddPacienteVisible: boolean = false
  @ViewChild('pacienteList') pacienteList!: PacienteListComponent

  hasLoad = false
  
  @ViewChild('form') form!: NgForm;
  
  constructor(public router: Router, private dialog: MatDialog, private route: ActivatedRoute, private dataMedicoSv: DataServerService<Medico>, private dataPacienteSv: DataServerService<Paciente>, public loading: LoadingService) {
    this.updateMedicoFromServer()
  }
  
  fillFormData() {
    this.form.form.patchValue({
      nombre: this.medico?.nombre,
      apellidos: this.medico?.apellidos,
      nombreUsuario: this.medico?.nombreUsuario,
      clave: this.medico?.clave,
      numColegiado: this.medico?.numColegiado
    })
    
    this.form.form.markAsPristine()
  }
  
  onSubmit() {
    this.saveChanges()
    this.form.form.markAsPristine()
  }
  
  updateMedicoFromServer(fillFormData? :boolean) {
    this.loading.isLoading = true
    this.route.params.subscribe(params => {
      this.hasLoad = false
      const idMedico = params['id'];
      this.dataMedicoSv.getById('Medico', idMedico).subscribe(result => {
        this.medico = result
        this.hasLoad = true
        if (fillFormData == null || fillFormData == true)
        this.fillFormData()
        // Refrescar pacientes
        this.pacienteList.updateList()
      }, error => {
        this.popupMessage = 'Error al cargar el médico para editar'
        this.openPopup()
      }).add(() => {
        this.loading.isLoading = false
      })
    })
  }

updateMedicoFromForm() {
    if (this.form.form.valid) {
      this.medico!.nombre = this.form.form.value.nombre
      this.medico!.apellidos = this.form.form.value.apellidos
      this.medico!.nombreUsuario = this.form.form.value.nombreUsuario
      this.medico!.clave = this.form.form.value.clave
      this.medico!.numColegiado = this.form.form.value.numColegiado
    } else {
      this.popupMessage = 'El formulario no es válido'
      this.openPopup()
    }
  }
  
  saveChanges() {
    this.updateMedicoFromForm()
    this.dataMedicoSv.update('medico', this.medico!, this.medico!.id).subscribe(() => {
      this.loading.isLoading = true
      this.popupMessage  = 'Se han guardado los cambios correctamente'
    }, error => {
      this.popupMessage = 'Error al guardar el médico'
    }).add(() => { this.loading.isLoading = false; this.openPopup() })
  }
  
  unbindPaciente(idPaciente: number) {
    const mr = new MedicoRequest(this.medico?.nombre, this.medico?.apellidos, this.medico?.nombreUsuario, this.medico?.clave, this.medico?.numColegiado)
    this.medico?.pacientes.forEach(p => {
      mr.idsPaciente.push(p.id)
    })
    mr.idsPaciente =  mr.idsPaciente.filter(id => id != idPaciente)
    this.dataMedicoSv.update('medico', mr, this.medico?.id!).subscribe(() => {
      this.popupMessage = "Se ha desasignado este paciente correctamente"
      this.updateMedicoFromServer()
    }, error => {
      this.popupMessage = `Ha ocurrido un error al intentar desasignar el paciente a este médico`
    }).add(() => this.openPopup())
  }
  
  deleteMedico() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataMedicoSv.deleteById('Medico', this.medico?.id!).subscribe(() => { this.router.navigateByUrl('/medicos') })
      }
    })
  }

  getCommonCita(idPaciente: number) {
    // let paciente
    // this.dataPacienteSv.getById('paciente', idPaciente).subscribe(result => {
      //   paciente = result
      // })
      // return paciente.citas.find((cita: Cita) => cita.idMedico === this.medico?.id)
  }

  getArrIdPaciente(arrPaciente: Array<Paciente>): Array<number> {
    return arrPaciente.map((paciente: Paciente) => paciente.id)
  }  
    
    popupTime = 4000
    visiblePopup: boolean = false
    popupMessage = ''
    openPopup() {
      this.visiblePopup = true
      setTimeout(() => {
        this.visiblePopup = false
      }, this.popupTime + 1000)
    }
    
}
