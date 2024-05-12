import { Component } from '@angular/core';
import { Period } from './components/period/model/period';
import { Duration } from './components/period/model/duration';
import { Load } from './model/load';
import { Crono } from './model/crono';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poquer-control-03-frontend';
  period: Period = new Period;
  duration: Duration = new Duration;
  load: Load = new Load;
  crono: Crono = new Crono;
  
  constructor() {
    this.duration.minutes = 1;
    this.duration.seconds = 3;
    this.period.duration = this.duration;
    this.load.isLoadingPeriods = false;
  }
}
