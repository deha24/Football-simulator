import { ChangeDetectorRef, Component } from '@angular/core';
import { Club } from '../../../../shared/models/club';
import { ClubService } from '../clubService';
import { ClubsItem } from './club-list-item/clubs-item';
import { EventService } from '../../../../shared/services/EventServices';

@Component({
  selector: 'clubs',
  imports: [ClubsItem],
  templateUrl: './clubs.html',
  styleUrl: './clubs.css'
})
export class Clubs {

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
