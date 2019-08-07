import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { App } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  nightMode: boolean = false;
  nightModeSubject = new Subject<App>();

  constructor() {
    this.getNightMode();
  }

  emitNightMode() {
    this.nightModeSubject.next(this.nightMode);
  }

  setNightMode(value: boolean) {
    this.nightMode = value;
    return this.nightMode;
  }

  getNightMode() {
    return this.nightMode;
  }
}
