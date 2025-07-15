import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  play(): Observable<any> {
    return new Observable(() => {
      const AUDIO = new Audio('/assets/avisoFimPeriodo.wav');
      AUDIO.play();
    });
  }
}
