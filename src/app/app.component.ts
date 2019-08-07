import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nightMode: string;

  constructor() { }

  onNightModeChange(evt: any) {
    this.nightMode = evt.value;
  }
}
