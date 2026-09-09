import { ChangeDetectorRef, Component, ViewChild, Output } from '@angular/core';
import { EventService } from '../../../../shared/services/EventServices';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table'; 
import { Club } from '../../../../shared/models/club';
import { ClubService } from '../clubService';
import { ClubsItem } from './club-list-item/clubs-item';

@Component({
  selector: 'clubs',
  imports: [ClubsItem, TableModule],
  templateUrl: './clubs.html',
  styleUrl: './clubs.css'
})

export class Clubs {

  @Output() club!: Club;
  clubs: Club[] = [];

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
