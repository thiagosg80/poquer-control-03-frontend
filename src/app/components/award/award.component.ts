import { Component, OnInit } from '@angular/core';
import { MonetaryService } from './service/monetary.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { Monetary } from './model/monetary';

@Component({
    selector: 'app-award',
    templateUrl: './award.component.html',
    styleUrls: ['./award.component.css'],
    standalone: false
})
export class AwardComponent implements OnInit {
  constructor(private monetaryService: MonetaryService, private snackBarService: SnackBarService) {}

  ngOnInit(): void {
    this.getMonetary();
  }

  reloadAwards(): void {
    this.getMonetary();
  }

  isLoading: boolean = false;
  monetary: Monetary = new Monetary;

  private getMonetary(): void {
    this.isLoading = true;

    const SUBSCRIPTION = this.monetaryService.getOne().subscribe({
      next: (monetary) => this.monetary = monetary,
      error: (e) => this.snackBarService.open('Erro ao consultar a premiação. ' + e.message)
    });

    SUBSCRIPTION.add(() => this.isLoading = false);
  }
}
