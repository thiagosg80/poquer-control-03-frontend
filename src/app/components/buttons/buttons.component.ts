import { Component, Input } from '@angular/core';
import { Crono } from 'src/app/model/crono';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  private _crono: Crono = new Crono;

  @Input()
  set crono(crono: Crono) { this._crono = crono }
  get crono(): Crono { return this._crono; }

  start(): void {
    this._crono.isStartedByUser = true;
  }
}
