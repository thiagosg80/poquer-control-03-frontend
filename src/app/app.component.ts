import { Component } from '@angular/core';
import { Period } from './components/periods/model/period';
import { Duration } from './components/periods/model/duration';
import { Load } from './model/load';
import { Crono } from './model/crono';
import { Bet } from './components/periods/model/bet';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'poquer-control-03-frontend';
  period: Period = new Period;
  duration: Duration = new Duration;
  load: Load = new Load;
  crono: Crono = new Crono;
  nextBet: Bet = new Bet;
  
  constructor() {
    this.duration.minutes = 0;
    this.duration.seconds = 0;
    this.period.duration = this.duration;
    this.load.isLoadingPeriods = false;
  }
}
