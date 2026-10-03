import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoachDetailsDTO, CoachesDTO, CoachLineupDTO, CreateCoachDTO } from '../../../shared/models/coach';


@Injectable({
  providedIn: 'root'
})

export class CoachService {

  constructor(private http: HttpClient) {}

  getCoaches() {
    return this.http.get<CoachesDTO[]>('http://127.0.0.1:8000/coaches/getcoaches');
  }

  getCoachById(id: number) {
    return this.http.get<CoachDetailsDTO>(`http://127.0.0.1:8000/coaches/details/${id}`);
  }

  getCoachLineupById(id: number) {
    return this.http.get<CoachLineupDTO>(`http://127.0.0.1:8000/coaches/lineup/${id}`);
  }

  addCoach(coach: CreateCoachDTO) {
    return this.http.post('http://127.0.0.1:8000/coaches/addcoach', coach);
  }

  updateCoach(coach: Partial<CoachDetailsDTO>, id: number) {
    return this.http.patch(`http://127.0.0.1:8000/coaches/update/${id}`, coach);
  }

  deleteCoach(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/coaches/delete/${id}`);
  }
}
