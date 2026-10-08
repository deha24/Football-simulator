import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FootballersDTO, FootballerDetailsDTO, CreateFootballerDTO, FootballerPositionsDTO } from '../../../shared/models/footballer';


@Injectable({
  providedIn: 'root'
})

export class FootballersService {

  constructor(private http: HttpClient) {}

  getFootballers() {
    return this.http.get<FootballersDTO[]>('http://127.0.0.1:8000/footballers/getfootballers');
  }

  getFootballerById(id: number) {
    return this.http.get<FootballerDetailsDTO>(`http://127.0.0.1:8000/footballers/details/${id}`);
  }

  getFootballerPositionsById(id: number) {
    return this.http.get<FootballerPositionsDTO>(`http://127.0.0.1:8000/footballers/positions/${id}`);
  }

  addFootballer(footballer: CreateFootballerDTO) {
    return this.http.post('http://127.0.0.1:8000/footballers/addfootballer', footballer);
  }

  updateFootballer(footballer: CreateFootballerDTO, id: number) {
    return this.http.patch(`http://127.0.0.1:8000/footballers/update/${id}`, footballer);
  }

  deleteFootballer(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/footballers/delete/${id}`);
  }
}
