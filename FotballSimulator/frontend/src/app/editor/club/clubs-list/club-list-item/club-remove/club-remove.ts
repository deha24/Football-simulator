import { Component, Input } from '@angular/core';
import { ClubService } from '../../../clubService';
import { Club } from '../../../../../../shared/models/club';
import { EventService } from '../../../../../../shared/services/EventServices';

@Component({
  selector: 'club-remove',
  imports: [],
  templateUrl: './club-remove.html',
  styleUrl: './club-remove.css'
})
export class ClubRemove {

  @Input() clubId!: number;

  constructor(private clubsService: ClubService, private eventService: EventService) {

  }

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
