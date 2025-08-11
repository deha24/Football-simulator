import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { League } from '../../../shared/models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor (private http: HttpClient) {}

  getLeagues() {
    return this.http.get<League[]>('assets/leagues.json');
  }

  getLeagueById(id: number) {
    return this.http.get<League>(`assets/leagues.json?id=${id}`);
  }

  addLeague(league: League) {
    return this.http.post('assets/leagues.json', league);
  }

  removeLeague(id: number) {
    return this.http.delete(`assets/leagues.json?id=${id}`);
  }

}
