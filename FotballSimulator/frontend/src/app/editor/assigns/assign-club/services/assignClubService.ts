import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Club, CreateClubDTO} from '../../../../../shared/models/club';
import { LeaguesIds } from '../../../../../shared/models/assigns/assignClub';

@Injectable({
  providedIn: 'root',
})
export class AssignClubService {

  constructor(private http: HttpClient) {}

  getClubsByLeagueId(id: number){
    return this.http.get<Club[]>(`http://127.0.0.1:8000/assign/club/getclubs/${id}`);
  }

  assignClubToLeague(id: number, leaguesIds: LeaguesIds){
    console.log("here");
    return this.http.post(`http://127.0.0.1:8000/assign/club/${id}`, leaguesIds);
  }
}
