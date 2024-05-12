import { Component, DoCheck, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { Duration } from '../period/model/duration';
import { Style } from './model/style';
import { TimerStyleService } from './service/timer-style.service';
import { Timeparam } from './model/timeparam';
import { Load } from 'src/app/model/load';
import { SoundService } from 'src/app/service/sound.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { Crono } from 'src/app/model/crono';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, DoCheck {

  minutesDisplay: number = 0;
  secondsDisplay: number = 0;
  private differ: any;

  @Input()
  duration: Duration = new Duration;

  @Input()
  load: Load = new Load;

  private _crono: Crono = new Crono;

  @Input()
  get crono(): Crono { return this._crono; }
  set crono(crono: Crono) { this._crono = crono; }

  constructor(private differs: KeyValueDiffers, private timerStyleService: TimerStyleService,
    private soundService: SoundService, private snackBarService: SnackBarService) {

    this.differ = differs.find({}).create();
  }

  style = new Style;

  ngOnInit(): void {
    this.style = this.getInitialStyle();
  }

  private getInitialStyle(): Style {
    const style = new Style;
    style.backgroundColor = 'rgb(76, 255, 94)';
    style.color = 'rgb(0, 127, 13)';

    return style;
  }

  private timeParam = new Timeparam;
  private isRunning = false;

  ngDoCheck(): void {
    const CHANGES = this.differ.diff(this.duration);
    if (CHANGES) {
      this.minutesDisplay = this.duration.minutes;
      this.secondsDisplay = this.duration.seconds;
    }

    if (this._crono.isStartedByUser && !this.isRunning) {
      this.isRunning = true;
      this.style = this.getInitialStyle();
      this.minutesDisplay = this.duration.minutes;
      this.secondsDisplay = this.duration.seconds;
      this._crono.isOverTime = false;
      this.timeParam.threshold01 = 0;
      this.countDownTime(this.duration.minutes, this.duration.seconds);
    }
  }

  private intervalId: any;

  private countDownTime(minutes: number, seconds: number): void {
    this.intervalId = setInterval(this.intervalCallback(minutes, seconds), 100);
  }

  private MAX_SECONDS = 59;

  private intervalCallback(minutes: number, seconds: number) {
    return () => {
      this.timeParam.currentSeconds = seconds;
      this.timeParam.currentMinutes = minutes;
      seconds -= 1;
      if (seconds == -1) {
        minutes -= 1;
        this.minutesDisplay = minutes;
        seconds = this.MAX_SECONDS;
      }

      if (minutes == 0 && seconds == 0) {
        this._crono.isOverTime = true;
        this.isRunning = false;
        this._crono.isStartedByUser = false;

        this.soundService.play()
          .subscribe(
            {error: (e) => this.snackBarService.open('Erro ao reproduzir o aviso sonoro. ' + e.message)}
          );

        clearInterval(this.intervalId);
      }

      this.secondsDisplay = seconds;
      this.timeParam.style = this.style;
      this.timeParam = this.timerStyleService.getTimeStyle(this.timeParam);
      this.style = this.timeParam.style;
    };
  }
}
