import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string): void {
    const CONFIG = {
      duration: 15000
    };

    this.snackBar.open(message, undefined, CONFIG);
  }
}
