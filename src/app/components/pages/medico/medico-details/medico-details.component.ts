import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServerService } from '../../../../services/data-server.service';
import { Medico } from '../../../../models/MedicoDTO';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';
import { Paciente } from '../../../../models/PacienteDTO';
import { Cita } from '../../../../models/CitaDTO';

@Component({
  selector: 'app-medico-details',
  templateUrl: './medico-details.component.html',
  styleUrls: ['./medico-details.component.scss']
})
export class MedicoDetailsComponent {
  
  medico: Medico | undefined

  hasLoad = false
  @ViewChild('form') form!: NgForm;

  constructor(private route: ActivatedRoute, private dataMedicoSv: DataServerService<Medico>, private dataPacienteSv: DataServerService<Paciente>, public loading: LoadingService) {
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

  updateMedicoFromServer() {
    this.loading.isLoading = true
    this.route.params.subscribe(params => {
      this.hasLoad = false
      const idMedico = params['id'];
      this.dataMedicoSv.getById('Medico', idMedico).subscribe(result => {
        this.medico = result
        this.hasLoad = true
        this.fillFormData()
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

  getCommonCita(idPaciente: number) {
    // let paciente
    // this.dataPacienteSv.getById('paciente', idPaciente).subscribe(result => {
    //   paciente = result
    // })
    // return paciente.citas.find((cita: Cita) => cita.idMedico === this.medico?.id)
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
