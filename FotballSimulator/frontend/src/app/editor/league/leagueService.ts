import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateLeagueDTO, LeagueDTO } from '../../../shared/models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor (private http: HttpClient) {}

  getLeagues() {
    return this.http.get<LeagueDTO[]>('http://127.0.0.1:8000/leagues/getleagues');
  }

  getLeagueById(id: number) {
    return this.http.get<LeagueDTO>(`http://127.0.0.1:8000/leagues/details/${id}`);
  }

  getLeaguesByCountryByLevel(country: string, level: number) {
    return this.http.get<LeagueDTO[]>(`http://127.0.0.1:8000/leagues/getleaguesbycountrybylevel?country=${country}&level=${level}`);
  }

  addLeague(league: CreateLeagueDTO) {
    return this.http.post<CreateLeagueDTO>('http://127.0.0.1:8000/leagues/addleague', league);
  }

  updateLeague(leagueId: number,league: LeagueDTO) {
      console.log('League updated successfully', league);
      return this.http.patch(`http://127.0.0.1:8000/leagues/update/${leagueId}`, league);
  }

  removeLeague(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/leagues/delete/${id}`);
  }
}
