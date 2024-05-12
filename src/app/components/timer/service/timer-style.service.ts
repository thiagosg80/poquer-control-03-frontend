import { Injectable } from '@angular/core';
import { Timeparam } from '../model/timeparam';
import { Style } from '../model/style';

@Injectable({
  providedIn: 'root'
})
export class TimerStyleService {

  constructor() { }

  getTimeStyle(timeParam: Timeparam): Timeparam {
    const SIXTY_SECONDS = 60;
    const seconds = timeParam.currentSeconds + timeParam.currentMinutes * SIXTY_SECONDS;
    if (!timeParam.threshold01) {
      timeParam = this.getThresholds(timeParam, seconds);
    }

    timeParam.style = this.getStyle(seconds, timeParam.threshold01, timeParam.threshold02, timeParam.style);

    return timeParam;
  }

  private getThresholds(timeStyle: Timeparam, seconds: number): Timeparam {
    const third = Math.round(seconds / 3);
    timeStyle.threshold01 = seconds - third;
    timeStyle.threshold02 = timeStyle.threshold01 - third;

    return timeStyle;
  }

  private getStyle(seconds: number, threshold01: number, threshold02: number, initial: Style): Style {
    const styleTh01 = new Style();
    styleTh01.backgroundColor = 'rgb(255, 252, 76)';
    styleTh01.color = 'rgb(127, 126, 0)';

    const styleTh02 = new Style();
    styleTh02.backgroundColor = 'rgb(255, 86, 76)';
    styleTh02.color = 'rgb(127, 7, 0)';

    const styles = [
      {predicate: this.isInitial, style: initial},
      {predicate: this.isThreshold01, style: styleTh01},
      {predicate: this.isThreshold02, style: styleTh02}
    ];

    const found = styles.filter((style) => style.predicate(seconds, threshold01, threshold02))[0] || new Timeparam;
    const result: Style = found.style;

    return result;
  }

  private isInitial(seconds: number, threshold01: number): boolean {
    return seconds >= threshold01;
  }

  private isThreshold01(seconds: number, threshold01: number, threshold02: number): boolean {
    return seconds < threshold01 && seconds >= threshold02;
  }

  private isThreshold02(seconds: number, threshold01: number, threshold02: number): boolean {
    return seconds < threshold02;
  }
}
