import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Footballer } from '../../../shared/models/footballer';


@Injectable({
  providedIn: 'root'
})

export class FootballersService {

  constructor(private http: HttpClient) {}

  getFootballers() {
    return this.http.get('assets/footballers.json');
  }

  addFootballer(footballer: Footballer) {
    return this.http.post('assets/footballers.json', footballer);
  }
}
