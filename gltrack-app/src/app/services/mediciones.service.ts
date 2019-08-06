import { Injectable, OnInit } from '@angular/core';
import { MedicionGlucosa } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  storageKey = 'mediciones';

  constructor() {
    if (localStorage.getItem(this.storageKey) === null) {
      localStorage.setItem(this.storageKey, JSON.stringify([] as MedicionGlucosa[]));
    }
  }

  GetAll() {
    const medicionesString = localStorage.getItem(this.storageKey);
    return JSON.parse(medicionesString) as MedicionGlucosa[];
  }

  Create(mc: MedicionGlucosa) {
    mc.Id = this.NewGuid();

    const mediciones = this.GetAll();
    mediciones.push(mc);
    localStorage.setItem(this.storageKey, JSON.stringify(mediciones));
  }

  Delete(id: string) {
    const mediciones = this.GetAll();
    const i = mediciones.findIndex(f => f.Id === id);
    if (i > -1) {
      mediciones.splice(i, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(mediciones));
    }
  }

  private NewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
