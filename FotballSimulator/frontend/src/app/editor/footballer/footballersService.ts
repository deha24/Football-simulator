import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Footballer, CreateFootballerDTO } from '../../../shared/models/footballer';


@Injectable({
  providedIn: 'root'
})

export class FootballersService {

  constructor(private http: HttpClient) {}

  getFootballers() {
    return this.http.get<Footballer[]>('http://127.0.0.1:8000/footballers/getfootballers');
  }

  getFootballerById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/footballers/details/${id}`);
  }

  addFootballer(footballer: CreateFootballerDTO) {
    return this.http.post('http://127.0.0.1:8000/footballers/addfootballer', footballer);
  }

  updateFootballer(footballer: Footballer, id: number) {
    return this.http.patch(`http://127.0.0.1:8000/footballers/update/${id}`, footballer);
  }

  deleteFootballer(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/footballers/delete/${id}`);
  }
}
