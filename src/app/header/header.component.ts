import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  colorEvent: EventEmitter<{value:string}> = new EventEmitter<{value:string}>();

  @Input()
  projectName: string = "Angular Cours";
  nightMode: boolean = false;

  constructor(private appService: AppService) { }
  ngOnInit() { }

  riseEvent(evt:any) {
    this.colorEvent.emit({value: evt});
  }

  setNightMode(value:any) {
    this.nightMode = value;
    this.appService.setNightMode(value);
    this.riseEvent(value);
  }
}
