import { Injectable, signal, inject} from '@angular/core';
import { EventService } from '../../../../shared/services/EventServices';
import { AssignFootballerService } from './assignFootballerService';
import { ClubsIds } from '../../../../shared/models/assigns/assignFootballer';

@Injectable()
export class AssignFootballerStateService {
  private assignService = inject(AssignFootballerService);

  readonly club1Id = signal<number>(0);
  readonly club2Id = signal<number>(0);

  constructor(private eventService: EventService) { }

  setClub1(id: number){ 
    this.club1Id.set(id); 
  }

  setClub2(id: number){ 
    this.club2Id.set(id);
  }

  assignFootballer(footballerId: number) {
    const ids: ClubsIds = {
      club1Id: this.club1Id(),
      club2Id: this.club2Id()
    };

    if (ids.club1Id && ids.club2Id) {
      this.assignService.assignFootballerToClub(footballerId, ids).subscribe({
        next: () => {
          this.eventService.emitEvent('footballerAssigned');
        },
        error: (error) => console.error('Failed to assign footballer', error),
      });
    }
  }
}