import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServerService } from '../../../../services/data-server.service';
import { Cita } from '../../../../models/CitaDTO';
import { LoadingService } from '../../../../services/loading.service';
import { NgForm } from '@angular/forms';
import { Paciente } from '../../../../models/PacienteDTO';
import { Medico } from '../../../../models/MedicoDTO';

@Component({
  selector: 'app-cita-create',
  templateUrl: './cita-create.component.html',
  styleUrls: ['./cita-create.component.scss']
})
export class CitaCreateComponent {
  arrPaciente: Array<Paciente> = []
  arrMedico: Array<Medico> = []
  cita: Cita = new Cita()
  
  constructor(public router: Router, private dataCitaSv: DataServerService<Cita>, private dataPacienteSv: DataServerService<Paciente>, private dataMedicoSv: DataServerService<Medico>, public loading: LoadingService) {
    dataPacienteSv.getAll('paciente').subscribe(res => this.arrPaciente = res as Paciente[])
    dataMedicoSv.getAll('medico').subscribe(res => this.arrMedico = res as Medico[])
  }


  onSubmit(f: NgForm) {
    const c: Cita = this.cita
    c.fechaHora = new Date(f.form.value.fechaHora).toISOString() // Conversión
    c.motivoCita = f.value.motivoCita
    c.diagnostico.valoracionEspecialista = f.value.valoracionEspecialista
    c.diagnostico.enfermedad = f.value.enfermedad
    if (this.cita.idMedico == 0 || this.cita.idPaciente == 0) {
      console.error('No hay un médico o paciente asignado'); return
    }
    // c.diagnostico.id = null
    console.log(this.cita)
    f.reset()
    
    this.loading.isLoading = true
    this.dataCitaSv.create('cita', c).subscribe(() => {
      this.popupMessage = 'Cita creada correctamente'
    }, error => {
      this.popupMessage = 'Error al intentar crear la cita'
    }).add(() => {
      this.openPopup(); this.loading.isLoading = false
    })
  }

  
  bindPaciente(idPaciente: number) {
    if (typeof this.arrPaciente.find(p => p.id == idPaciente) === "undefined") {
      console.error('No hay un paciente con ese ID'); return
    }
    this.cita.idPaciente = idPaciente
  }
  bindMedico(idMedico: number) {
    if (typeof this.arrPaciente.find(m => m.id == idMedico) === "undefined") {
      console.error('No hay un medico con ese ID'); return
    }
    this.cita.idMedico = idMedico
  }
  
  isMedicoBinded(idMedico?: number) {
    if (typeof idMedico === 'undefined') return this.cita.idMedico > 0
    return `${idMedico}` === `${this.cita.idMedico}`
  }
  isPacienteBinded(idPaciente?: number) {
    if (typeof idPaciente === 'undefined') return this.cita.idPaciente > 0
    return `${idPaciente}` === `${this.cita.idPaciente}`
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
