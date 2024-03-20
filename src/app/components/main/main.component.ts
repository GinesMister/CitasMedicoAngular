import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MedicoService } from '../../services/medico.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private titleService: Title, public medicoSv: MedicoService) { 
    this.titleService.setTitle('Inicio')
  }

}
