import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FootballersService {

  constructor(private http: HttpClient) {}

  getFootballers() {
    return this.http.get('assets/footballers.json');
  }
}
