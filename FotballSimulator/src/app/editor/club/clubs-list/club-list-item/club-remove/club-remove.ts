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

  @Input() club!: Club;

  constructor(private clubsService: ClubService, private eventService: EventService) {

  }

  removeClub() {
    if (this.club) {
      this.clubsService.removeClub(this.club.id).subscribe(() => {
      });
      this.eventService.emitEvent('removeClub', this.club);
    }
  }

}
