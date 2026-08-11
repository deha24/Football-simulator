import { ChangeDetectorRef, Component, ViewChild, Output } from '@angular/core';
import { Club } from '../../../../shared/models/club';
import { ClubService } from '../clubService';
import { ClubsItem } from './club-list-item/clubs-item';
import { EventService } from '../../../../shared/services/EventServices';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';  

@Component({
  selector: 'clubs',
  imports: [ClubsItem, TableModule],
  templateUrl: './clubs.html',
  styleUrl: './clubs.css'
})

export class Clubs {

  @Output() club!: Club;

  @ViewChild('dt') dt!: Table;
  initialValue: Club[] = [];
  clubs: Club[] = [];

  loadClubs() {
    this.clubService.getClubs().subscribe((data) => {
      this.clubs = data;
      this.cdr.detectChanges();
    });
  }

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef, private eventService: EventService) {
    this.eventService.getEvent('removedClub', () => {
        this.loadClubs();
    });

  }

  ngOnInit() {
    this.loadClubs();
  }
}
