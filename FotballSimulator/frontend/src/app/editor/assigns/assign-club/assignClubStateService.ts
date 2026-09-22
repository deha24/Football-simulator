import { Injectable, signal, inject} from '@angular/core';
import { EventService } from '../../../../shared/services/EventServices';
import { AssignClubService } from './assignClubService';
import { LeaguesIds } from '../../../../shared/models/assigns/assignClub';

@Injectable()
export class AssignClubStateService {
  private assignService = inject(AssignClubService);

  readonly league1Id = signal<number>(0);
  readonly league2Id = signal<number>(0);

  constructor(private eventService: EventService) { }

  setLeague1(id: number){ 
    this.league1Id.set(id); 
  }

  setLeague2(id: number){ 
    this.league2Id.set(id);
  }

  assignClub(clubId: number) {
    const ids: LeaguesIds = {
      league1Id: this.league1Id(),
      league2Id: this.league2Id()
    };

    if (ids.league1Id && ids.league2Id) {
      this.assignService.assignClubToLeague(clubId, ids).subscribe({
        next: () => {
          this.eventService.emitEvent('clubAssigned');
        },
        error: (error) => console.error('Failed to assign club', error),
      });
    }
  }
}