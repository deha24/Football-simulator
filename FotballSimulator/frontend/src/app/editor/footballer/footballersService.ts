import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Footballer } from '../../../shared/models/footballer';


@Injectable({
  providedIn: 'root'
})

export class FootballersService {

  constructor(private http: HttpClient) {}

  getFootballers() {
    return this.http.get('http://127.0.0.1:8000/footballers/getfootballers');
  }

  getFootballerById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/footballers/details/${id}`);
  }

  addFootballer(footballer: Footballer) {
    return this.http.post('http://127.0.0.1:8000/footballers/addfootballer', footballer);
  }

  deleteFootballer(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/footballers/deletefootballer?id=${id}`);
  }
}
