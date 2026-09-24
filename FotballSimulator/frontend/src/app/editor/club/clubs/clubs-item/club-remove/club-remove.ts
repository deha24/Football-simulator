import { Component, Input } from '@angular/core';
import { EventService } from '../../../../../../shared/services/EventServices';
import { NotificationService } from '../../../../../../shared/services/NotificationService';
import { ClubService } from '../../../clubService';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'club-remove',
  imports: [ButtonModule],
  templateUrl: './club-remove.html',
  styleUrl: './club-remove.css'
})
export class ClubRemove {

  @Input() clubId!: number;

  constructor(private clubsService: ClubService, private eventService: EventService, private notificationService: NotificationService) { }

  removeClub() {
    this.clubsService.removeClub(this.clubId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Club Removed');
        this.eventService.emitEvent('removedClub');
      },
      error: (err) => {
        this.notificationService.showError();
        console.error('Error removing club:', err);
      }
    });
  }

}
