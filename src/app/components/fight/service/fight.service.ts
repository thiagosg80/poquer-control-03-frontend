import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fight } from '../model/fight';
import { API } from 'src/app/const/net';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private http: HttpClient) { }

  getOne(): Observable<Fight> {
    return this.http.get<Fight>(API.concat('/fights'));
  }
}
