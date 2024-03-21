import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataServerService } from '../../services/medico.service';
import { Medico } from '../../models/MedicoDTO';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private titleService: Title, public medicoSv: DataServerService<Medico>) { 
    this.titleService.setTitle('Inicio')
  }

}
