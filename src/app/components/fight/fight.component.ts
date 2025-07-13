import { Component, OnInit } from '@angular/core';
import { FightService } from './service/fight.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
    selector: 'app-fight',
    templateUrl: './fight.component.html',
    styleUrls: ['./fight.component.css'],
    standalone: false
})
export class FightComponent implements OnInit {
  constructor(private fightService: FightService, private snackBarService: SnackBarService) {}

  ngOnInit(): void {
    this.getFight();
  }

  reloadFight(): void {
    this.getFight();
  }

  playing: number = 0;
  total: number = 0;
  isLoading: boolean = false;

  private getFight(): void {
    this.isLoading = true;

    const SUBSCRIPTION = this.fightService.getOne().subscribe({
      next: (fight) => {
        this.playing = fight.playing;
        this.total = fight.total;
      },
      error: (e) => this.snackBarService.open('Erro ao consultar os participantes. ' + e.message),
    });

    SUBSCRIPTION.add(() => this.isLoading = false);
  }
}
