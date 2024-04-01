import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Medico } from '../../../../models/MedicoDTO';
import { DataServerService } from '../../../../services/data-server.service';
import { MedicoRequest } from '../../../../models/request/MedicoRequestDTO';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrls: ['./medico-create.component.scss']
})
export class MedicoCreateComponent {

  constructor(public router: Router, private sv: DataServerService<Medico>, public loading: LoadingService) { }

  onSubmit(f: NgForm) {
    const m: MedicoRequest = new MedicoRequest()
    m.nombre = f.value.nombre
    m.apellidos = f.value.apellidos
    m.nombreUsuario = f.value.nombreUsuario
    m.clave = f.value.clave
    m.numColegiado = f.value.numColegiado
    f.reset()
    
    this.loading.isLoading = true
    this.sv.create('Medico', m).subscribe(() => {
      this.popupMessage = 'Médico creado correctamente'
      this.openPopup()
      this.loading.isLoading = false
    }, error => {
      this.popupMessage = 'Error al intentar crear el médico'
      this.openPopup()
      this.loading.isLoading = false
    })
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
