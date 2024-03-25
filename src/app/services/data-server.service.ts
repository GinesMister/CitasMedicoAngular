import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServerService<T> {

  private baseUrl = 'http://localhost:5044/citasmedicos'
  constructor(private http: HttpClient) { }

  getAll(resource: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${resource}`)
  }

  getById(resource: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${resource}/${id}`)
  }

  create(resource: string, element: any) {
    return this.http.post(`${this.baseUrl}/${resource}`, element)
  }

  deleteById(resource: string, id: number) {
    return this.http.delete<T>(`${this.baseUrl}/${resource}/${id}`)
  }

  update(resource: string, element: T, id: number) {
    return this.http.put<T>(`${this.baseUrl}/${resource}/${id}`, element)
  }
}