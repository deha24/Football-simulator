import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Footballer, CreateFootballerDTO, FootballerPositionsDTO } from '../../../../shared/models/footballer';
import { ClubsIds } from '../../../../shared/models/assigns/assignFootballer';

@Injectable({
  providedIn: 'root',
})
export class AssignFootballerService {

  constructor(private http: HttpClient) {}

  getFootballersByClubId(id: number){
    return this.http.get<Footballer[]>(`http://127.0.0.1:8000/assign/footballer/getfootballers/${id}`);
  }

  assignFootballerToClub(id: number, clubsIds: ClubsIds){
    return this.http.post(`http://127.0.0.1:8000/assign/footballer/${id}`, clubsIds);
  }
  
}
