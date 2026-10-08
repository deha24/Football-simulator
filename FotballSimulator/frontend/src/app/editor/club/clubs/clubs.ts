import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast'
import { EventService } from '../../../../shared/services/EventServices';
import { ClubService } from '../clubService';
import { ClubDTO } from '../../../../shared/models/club';
import { ClubsItem } from './clubs-item/clubs-item';

@Component({
  selector: 'clubs',
  imports: [TableModule, ToastModule, ClubsItem],
  templateUrl: './clubs.html',
  styleUrl: './clubs.css'
})

export class Clubs {

  @Output() club!: ClubDTO;
  clubs: ClubDTO[] = [];

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef, private eventService: EventService) {
    this.eventService.getEvent('removedClub', () => {
        this.loadClubs();
    });
    this.eventService.getEvent('updatedClub', () => {
        this.loadClubs();
    });

  }

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs() {
    this.clubService.getClubs().subscribe((data) => {
      this.clubs = data;
      this.cdr.detectChanges();
    });
  }
}
