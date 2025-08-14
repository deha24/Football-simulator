import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { League } from '../../../shared/models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor (private http: HttpClient) {}

  getLeagues() {
    return this.http.get<League[]>('http://127.0.0.1:8000/leagues/getleagues');
  }

  getLeagueById(id: number) {
    return this.http.get<League>(`http://127.0.0.1:8000/leagues/details/${id}`);
  }

  getLeaguesByCountryByLevel(country: string, level: number) {
    return this.http.get<League[]>(`assets/leagues.json?country=${country}&level=${level}`);
  }

  addLeague(league: League) {
    return this.http.post('http://127.0.0.1:8000/leagues/addleague', league);
  }

  removeLeague(id: number) {
    return this.http.delete(`assets/leagues.json?id=${id}`);
  }

}
