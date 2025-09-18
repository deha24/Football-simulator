import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Club, CreateClubDTO } from '../../../shared/models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) {
    // Initialization logic if needed
  }

  // Define methods for club service here
  getClubs() {
    return this.http.get<Club[]>('http://127.0.0.1:8000/clubs/getclubs');
  }

  addClub(club: CreateClubDTO) {
    return this.http.post<CreateClubDTO>('http://127.0.0.1:8000/clubs/addclub', club);
  }

  removeClub(clubId: number) {
    return this.http.delete(`assets/clubs.json?id=${clubId}`);
  }

  getClubById(clubId: number) {
    return this.http.get<Club>(`http://127.0.0.1:8000/clubs/details/${clubId}`);
  }
}
