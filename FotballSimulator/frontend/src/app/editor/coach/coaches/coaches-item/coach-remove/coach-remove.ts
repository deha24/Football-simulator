import { Component, Input } from '@angular/core';
import { EventService } from '../../../../../../shared/services/EventServices';
import { CoachService } from '../../../coachService';
import { Coach } from '../../../../../../shared/models/coach';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'coach-remove',
  imports: [ButtonModule],
  templateUrl: './coach-remove.html',
  styleUrl: './coach-remove.css'
})
export class CoachRemove {

  @Input() coachId!: number;

  constructor(private eventService: EventService, private coachService: CoachService) {}

  removeCoach() {
    this.coachService.deleteCoach(this.coachId).subscribe({
      next: () => {
        this.eventService.emitEvent('removedCoach')
      },
      error: (err: any) => {
        console.error('Error removing coach:', err);
      }
    });
  }

}
