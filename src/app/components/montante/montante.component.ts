import { Component, DoCheck, Input, KeyValueDiffers } from '@angular/core';
import { Crono } from 'src/app/model/crono';

@Component({
  selector: 'app-montante',
  templateUrl: './montante.component.html',
  styleUrls: ['./montante.component.css']
})
export class MontanteComponent implements DoCheck {
  @Input()
  label: string = '';

  @Input()
  value: number = 0;

  @Input()
  additionalStyle: string = '';

  valueDisplay: number = 0;
  private differ: any;

  constructor(private differs: KeyValueDiffers) {
    this.differ = differs.find({}).create();
  }

  @Input()
  crono: Crono = new Crono;

  ngDoCheck(): void {
    const CHANGES = this.differ.diff(this.crono);
    if (CHANGES && this.crono.isStartedByUser || !this.valueDisplay) {
        this.valueDisplay = this.value;
    }
  }
}
