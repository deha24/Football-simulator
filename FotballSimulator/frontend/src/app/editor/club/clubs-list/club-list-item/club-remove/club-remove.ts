import { Component, Input } from '@angular/core';
import { EventService } from '../../../../../../shared/services/EventServices';
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

  constructor(private clubsService: ClubService, private eventService: EventService) { }

  removeClub() {
    this.clubsService.removeClub(this.clubId).subscribe({
      next: () => {
        this.eventService.emitEvent('removedClub');
      },
      error: (err) => {
        console.error('Error removing club:', err);
      }
    });
  }

}
