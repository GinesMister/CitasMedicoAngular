import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class CitaCreateComponent implements OnInit {

  arrPaciente: Array<Paciente> = []
  arrMedico: Array<Medico> = []
  cita: Cita = new Cita()
  
  @Input('isPage') isPage = true
  @Input('type') type = 'createEmpty' // | 'createFilled' | 'edit'
  @Input('idCitaToEdit') idCitaToEdit!: number
  @Input('idMedico') idMedico: number | undefined = undefined
  @Input('idPedico') idPaciente: number | undefined = undefined

  constructor(public router: Router, private dataCitaSv: DataServerService<Cita>, private dataPacienteSv: DataServerService<Paciente>, private dataMedicoSv: DataServerService<Medico>, public loading: LoadingService) {
    dataPacienteSv.getAll('paciente').subscribe(res => this.arrPaciente = res as Paciente[])
    dataMedicoSv.getAll('medico').subscribe(res => this.arrMedico = res as Medico[])

  }
  
  ngOnInit(): void {
    if (this.type === 'createFilled' ) {
      if (this.idMedico == undefined && this.idPaciente == undefined)
        console.error('Si el componente se ha creado de tipo "createFilled", se debe proporcionar un idMedico o idPaciente')
      this.cita.idMedico = this.idMedico! || 0
      this.cita.idPaciente = this.idPaciente! || 0
    }
    
    if (this.type === 'edit') {
      if (this.idCitaToEdit === undefined) 
        console.error('Si desea editar, debe introducir el ID de la cita')
      this.dataCitaSv.getById('cita', this.idCitaToEdit).subscribe(result => {
        this.loading.isLoading = true
        this.cita = result as Cita
        console.log(this.cita)
        this.fillFormData()
      }, error => {
        this.popupMessage = 'Error al obtener la cita a editar'
        this.openPopup()
      }).add(() => this.loading.isLoading = false)
    }

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
    console.log(this.cita)
    f.reset()
    
    this.loading.isLoading = true
    if (this.type === 'edit') {
      this.dataCitaSv.update('cita', this.cita, c.id!).subscribe(() => {
        this.router.navigateByUrl('/citas')
      })
    }
    else {
      this.dataCitaSv.create('cita', c).subscribe(() => {
        this.popupMessage = 'Cita creada correctamente'
      }, error => {
        this.popupMessage = 'Error al intentar crear la cita'
      }).add(() => {
        this.openPopup(); this.loading.isLoading = false
        this.router.navigateByUrl('/citas')
      })
    }
  }

  @ViewChild('form') form!: NgForm
  fillFormData() {
    this.form.form.patchValue({
      fechaHora: this.cita.fechaHora,
      motivoCita: this.cita.motivoCita,
      valoracionEspecialista: this.cita.diagnostico.valoracionEspecialista,
      enfermedad: this.cita.diagnostico.enfermedad
    })
    
    this.form.form.markAsPristine()
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
