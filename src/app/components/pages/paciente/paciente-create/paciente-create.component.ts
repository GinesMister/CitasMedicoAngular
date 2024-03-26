import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServerService } from '../../../../services/data-server.service';
import { Paciente } from '../../../../models/PacienteDTO';
import { LoadingService } from '../../../../services/loading.service';
import { NgForm } from '@angular/forms';
import { PacienteRequest } from '../../../../models/request/PacienteRquestDTO';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.scss']
})
export class PacienteCreateComponent {

  constructor(public router: Router, private sv:DataServerService<Paciente>, public loading: LoadingService) { }

  onSubmit(f: NgForm) {
    const p: PacienteRequest = new PacienteRequest()
    p.nombre = f.value.nombre
    p.apellidos = f.value.apellidos
    p.nombreUsuario = f.value.nombreUsuario
    p.clave = f.value.clave
    p.nss = f.value.nss
    p.numTarjeta = f.value.numTarjeta
    p.telefono = f.value.telefono
    p.direccion = f.value.direccion
    f.reset()
    
    this.loading.isLoading = true
    this.sv.create('paciente', p).subscribe(() => {
      this.popupMessage = 'Paciente creado correctamente'
    }, error => {
      this.popupMessage = 'Error al intentar crear el paciente'
    }).add(() => {      
      this.loading.isLoading = false
      this.openPopup()
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
