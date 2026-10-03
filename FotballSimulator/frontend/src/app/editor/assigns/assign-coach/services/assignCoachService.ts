import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { CoachDetailsDTO } from '../../../../../shared/models/coach';
import { ClubsIds } from '../../../../../shared/models/assigns/assignPerson';

@Injectable({
  providedIn: 'root',
})
export class AssignCoachService {
  
  constructor(private http: HttpClient) {}

  getCoachesByClubId(id: number){
    return this.http.get<CoachDetailsDTO[]>(`http://127.0.0.1:8000/assign/coach/getcoaches/${id}`);
  }

  assignCoachToClub(id: number, clubsIds: ClubsIds){
    return this.http.post(`http://127.0.0.1:8000/assign/coach/${id}`, clubsIds);
  }
}
