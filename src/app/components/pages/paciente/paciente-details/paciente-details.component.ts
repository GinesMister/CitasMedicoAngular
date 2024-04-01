import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServerService } from '../../../../services/data-server.service';
import { Paciente } from '../../../../models/PacienteDTO';
import { LoadingService } from '../../../../services/loading.service';
import { NgForm } from '@angular/forms';
import { DeleteConfirmationComponent } from '../../../pop-ups/delete-confirmation/delete-confirmation.component';
import { Cita } from '../../../../models/CitaDTO';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.scss']
})
export class PacienteDetailsComponent {

  paciente: Paciente | undefined
  
  hasLoad = false
  
  @ViewChild('form') form!: NgForm;
  
  funcCita: Cita
  
  constructor(public router: Router, private dialog: MatDialog, private route: ActivatedRoute, private dataPacienteSv: DataServerService<Paciente>, public loading: LoadingService) {
    this.updatePacienteFromServer()
    this.funcCita = new Cita()
  }
  
  fillFormData() {
    this.form.form.patchValue({
      nombre: this.paciente?.nombre,
      apellidos: this.paciente?.apellidos,
      nombreUsuario: this.paciente?.nombreUsuario,
      clave: this.paciente?.clave,
      nss: this.paciente?.nss,
      numTarjeta: this.paciente?.numTarjeta,
      telefono: this.paciente?.telefono,
      direccion: this.paciente?.direccion
    })
    
    this.form.form.markAsPristine()
  }
  
  onSubmit() {
    this.saveChanges()
    this.form.form.markAsPristine()
  }
  
  updatePacienteFromServer(fillFormData? :boolean) {
    this.loading.isLoading = true
    this.route.params.subscribe(params => {
      this.hasLoad = false
      const idPaciente = params['id'];
      this.dataPacienteSv.getById('paciente', idPaciente).subscribe(result => {
        this.paciente = result
        this.hasLoad = true
        if (fillFormData == null || fillFormData == true)
        this.fillFormData()
        // Refrescar pacientes
        // this.pacienteList.updateList()
      }, error => {
        this.popupMessage = 'Error al cargar el paciente para editar'
        this.openPopup()
      }).add(() => {
        this.loading.isLoading = false
      })
    })
  }

updatePacienteFromForm() {
    if (this.form.form.valid) {
      this.paciente!.nombre = this.form.form.value.nombre
      this.paciente!.apellidos = this.form.form.value.apellidos
      this.paciente!.nombreUsuario = this.form.form.value.nombreUsuario
      this.paciente!.clave = this.form.form.value.clave
      this.paciente!.nss = this.form.form.value.nss
      this.paciente!.numTarjeta = this.form.form.value.numTarjeta
      this.paciente!.telefono = this.form.form.value.telefono
      this.paciente!.direccion = this.form.form.value.direccion
      this.paciente!.citas = this.form.form.value.citas
    } else {
      this.popupMessage = 'El formulario no es válido'
      this.openPopup()
    }
  }
  
  saveChanges() {
    this.updatePacienteFromForm()
    this.dataPacienteSv.update('paciente', this.paciente!, this.paciente!.id).subscribe(() => {
      this.loading.isLoading = true
      this.popupMessage  = 'Se han guardado los cambios correctamente'
    }, error => {
      this.popupMessage = 'Error al guardar el paciente'
    }).add(() => { this.loading.isLoading = false; this.openPopup() })
  }
  
  deletePaciente() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataPacienteSv.deleteById('paciente', this.paciente?.id!).subscribe(() => { this.router.navigateByUrl('/pacientes') })
      }
    })
  }

  goToCreateCita(idPaciente: number) {
  }
  // getArrIdPaciente(arrPaciente: Array<Paciente>): Array<number> {
  //   return arrPaciente.map((paciente: Paciente) => paciente.id)
  // }  
    
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
