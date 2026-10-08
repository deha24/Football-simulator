import { Component, Input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { EventService } from '../../../../../../shared/services/EventServices';
import { NotificationService } from '../../../../../../shared/services/NotificationService';
import { CoachService } from '../../../coachService';

@Component({
  selector: 'coach-remove',
  imports: [ButtonModule],
  templateUrl: './coach-remove.html',
  styleUrl: './coach-remove.css'
})
export class CoachRemove {

  @Input() coachId!: number;

  constructor(private eventService: EventService, private coachService: CoachService, private notificationService: NotificationService) {}

  removeCoach() {
    this.coachService.deleteCoach(this.coachId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Coach Removed');
        this.eventService.emitEvent('removedCoach')
      },
      error: (err: any) => {
        this.notificationService.showError();
        console.error('Error removing coach:', err);
      }
    });
  }

}
