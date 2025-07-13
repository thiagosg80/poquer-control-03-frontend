import { Component, DoCheck, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { PeriodService } from './service/period.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { Load } from 'src/app/model/load';
import { Crono } from 'src/app/model/crono';
import { Period } from './model/period';
import { Bet } from './model/bet';
import { Duration } from './model/duration';

@Component({
    selector: 'app-periods',
    templateUrl: './periods.component.html',
    standalone: false
})
export class PeriodsComponent implements OnInit, DoCheck {
  periodIdDisplay: number = 0;
  private differ: any;

  constructor(private periodService: PeriodService, private snackBarService: SnackBarService,
    private differs: KeyValueDiffers) {

      this.differ = differs.find({}).create();
  }

  private _load: Load = new Load;

  @Input()
  set load(load: Load) { this._load = load; }
  get load() { return this._load; }

  ngOnInit(): void {
    this._load.isLoadingPeriods = true;

    const SUBSCRIPTION =  this.periodService.getAll().subscribe({
      next: (periods) => this.processSuccess(periods),
      error: (e) => this.snackBarService.open('Erro ao consultar os perí­odos. ' + e.message)
    });

    SUBSCRIPTION.add(() => this._load.isLoadingPeriods = false);
  }

  private currentPeriod: Period = new Period;
  private periods: Period[] = [];
  private _nextbet: Bet = new Bet;

  @Input()
  get nextbet() { return this._nextbet; }
  set nextbet(nextbet: Bet) { this._nextbet = nextbet}

  nextBet: Bet = new Bet;

  private processSuccess(periods: Period[]): void {
    this.periods = periods;
    this.currentPeriod = this.getCurrent(this.periods);
    this.nextBet = this.getNextBet(this.periods);
    this.periodIdDisplay = this.currentPeriod.id;
    this.setInfos();
  }

  @Input()
  crono: Crono = new Crono;

  ngDoCheck(): void {
    const CHANGES = this.differ.diff(this.crono);
    if (CHANGES) {
      if (this.crono.isOverTime) {
        this.currentPeriod.isFinish = true;
        this.currentPeriod = this.getCurrent(this.periods);
        this.nextBet = this.getNextBet(this.periods);
        this.setInfos();
      }

      if (this.crono.isStartedByUser) {
        this.periodIdDisplay = this.currentPeriod.id;
      }
    }
  }

  private getCurrent(periods: Period[]): Period {
    return periods.filter((period) => !period.isFinish)[0] || new Period();
  }

  private getNextBet(periods: Period[]): Bet {
    const nextPeriod = periods.filter((period) => !period.isFinish)[1] || new Period();

    return nextPeriod.bet;
  }

  private _period: Period = new Period;
  
  @Input()
  get period() { return this._period; }
  set period(period: Period) { this._period = period; }

  private setInfos(): void {
    const duration = this.currentPeriod.duration || new Duration;
    this._period.duration.minutes = duration.minutes;
    this._period.duration.seconds = duration.seconds;
    const bet = this.currentPeriod.bet || new Bet;
    this._period.bet.smallBlind = bet.smallBlind;
    this._period.bet.bigBlind = bet.bigBlind;
    this._period.bet.ante = bet.ante;
    this._nextbet.smallBlind = this.nextBet.smallBlind;
    this._nextbet.bigBlind = this.nextBet.bigBlind;
    this._nextbet.ante = this.nextBet.ante;
  }
}
