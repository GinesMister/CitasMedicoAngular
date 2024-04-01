import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cita-details',
  templateUrl: './cita-details.component.html',
  styleUrls: ['./cita-details.component.scss']
})
export class CitaDetailsComponent {
  idCita!: number
  constructor(public route: ActivatedRoute) {
    route.params.subscribe(param => {
      this.idCita = param['id']
    })
  }

}
