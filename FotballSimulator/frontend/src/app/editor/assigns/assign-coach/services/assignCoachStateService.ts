import { Injectable, signal, inject} from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventService } from '../../../../../shared/services/EventServices';
import { AssignCoachService } from './assignCoachService';
import { ClubsIds } from '../../../../../shared/models/assigns/assignPerson';

@Injectable()
export class AssignCoachStateService {
  private messageService = inject(MessageService)
  private assignService = inject(AssignCoachService);

  readonly club1Id = signal<number>(0);
  readonly club2Id = signal<number>(0);

  constructor(private eventService: EventService) { }

  setClub1(id: number){ 
    this.club1Id.set(id); 
  }

  setClub2(id: number){ 
    this.club2Id.set(id);
  }

  assignCoach(coachId: number) {
    const ids: ClubsIds = {
      club1Id: this.club1Id(),
      club2Id: this.club2Id()
    };

    if (ids.club1Id && ids.club2Id) {
      this.assignService.assignCoachToClub(coachId, ids).subscribe({
        next: () => {
          this.eventService.emitEvent('coachAssigned');
        },
        error: (err) => this.showError('Failed to assign Coach', err.error.detail),
      });
    }
  }

  showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: detail });
  }
}