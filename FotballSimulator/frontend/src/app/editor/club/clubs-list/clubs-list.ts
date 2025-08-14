import { ChangeDetectorRef, Component } from '@angular/core';
import { Club } from '../../../../shared/models/club';
import { ClubService } from '../clubService';
import { ClubListItem } from './club-list-item/club-list-item';
import { EventService } from '../../../../shared/services/EventServices';

@Component({
  selector: 'clubs-list',
  imports: [ClubListItem],
  templateUrl: './clubs-list.html',
  styleUrl: './clubs-list.css'
})
export class ClubsList {

  clubs: Club[] = [];

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef, private eventService: EventService) {
    this.eventService.getEvent('removeClub', (club: Club) => {
        this.clubs = this.clubs.filter(item => item !== club);
    });

  }

  ngOnInit() {
    this.clubService.getClubs().subscribe((data) => {
      this.clubs = data;
      this.cdr.detectChanges();
    });

  }
}
