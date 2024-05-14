import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monetary } from '../model/monetary';
import { API } from 'src/app/const/net';

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {

  constructor(private http: HttpClient) { }

  getOne(): Observable<Monetary> {
    return this.http.get<Monetary>(API.concat('/monetaries'));
  }
}
