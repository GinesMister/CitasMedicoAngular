import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService<T> {

  constructor() { }

  data: T | undefined
}
