import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from '../model/period';
import { API } from 'src/app/const/net';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Period[]> {
    return this.http.get<Period[]>(API.concat('/periods'));
  }
}
