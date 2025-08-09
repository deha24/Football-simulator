import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Club } from '../../../shared/models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) {
    // Initialization logic if needed
  }

  // Define methods for club service here
  getClubs() {
    return this.http.get<Club[]>('assets/clubs.json');
  }

  addClub(club: Club) {
    return this.http.post<Club>('assets/clubs.json', club);
  }

  removeClub(clubId: number) {
    return this.http.delete(`assets/clubs.json?id=${clubId}`);
  }

  getClubById(clubId: number) {
    return this.http.get<Club>(`assets/clubs.json?id=${clubId}`);
  }
}
