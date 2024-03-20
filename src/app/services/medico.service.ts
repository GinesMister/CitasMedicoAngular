import { Injectable } from '@angular/core';
import { Medico } from '../models/MedicoDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private rawurl = 'http://localhost:5044/citasmedicos/Medico'
  arrMedico = new Array<Medico>()
  constructor(private http: HttpClient) {
    this.http.get<Medico[]>(this.rawurl).subscribe(data => {
      console.log(data)
      this.arrMedico = data
      console.log(data)
      
    })
    
  }

}
