import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicoRequest } from '../models/request/MedicoRequestDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServerService<T> {

  private baseUrl = 'http://localhost:5044/citasmedicos'
  constructor(private http: HttpClient) { }

  getAll(reference: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${reference}`)
  }

  getById(reference: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${reference}?Id=${id}`)
  }

  create(reference: string, medico: MedicoRequest) {
    return this.http.post(`${this.baseUrl}/${reference}`, medico)
  }

  deleteById(reference: string, id: number) {
    return this.http.delete(`${this.baseUrl}/${reference}?Id=${id}`)
  }
}