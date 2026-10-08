import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClubDTO, ClubNameDTO ,CreateClubDTO } from '../../../shared/models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) {
    // Initialization logic if needed
  }

  // Define methods for club service here
  getClubs() {
    return this.http.get<ClubDTO[]>('http://127.0.0.1:8000/clubs/getclubs');
  }

  addClub(club: CreateClubDTO) {
    return this.http.post<CreateClubDTO>('http://127.0.0.1:8000/clubs/addclub', club);
  }

  updateClub(clubId: number,club: ClubDTO) {
    return this.http.patch(`http://127.0.0.1:8000/clubs/update/${clubId}`, club);
  }

  removeClub(clubId: number) {
    return this.http.delete(`http://127.0.0.1:8000/clubs/remove/${clubId}`);
  }

  getClubById(clubId: number) {
    return this.http.get<ClubDTO>(`http://127.0.0.1:8000/clubs/details/${clubId}`);
  }

  getClubNameById(clubId: number) {
    return this.http.get<ClubNameDTO>(`http://127.0.0.1:8000/clubs/getclubname/${clubId}`);
  }
}
