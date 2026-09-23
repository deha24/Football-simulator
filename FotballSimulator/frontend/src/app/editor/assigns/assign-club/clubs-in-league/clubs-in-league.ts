import { Component, Input, Output, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { EventService } from '../../../../../shared/services/EventServices';
import { AssignClubService } from '../services/assignClubService';
import { ClubsInLeagueItem } from './clubs-in-league-item/clubs-in-league-item';
import { Club } from '../../../../../shared/models/club';

@Component({
  selector: 'clubs-in-league',
  imports: [TableModule, ClubsInLeagueItem],
  templateUrl: './clubs-in-league.html',
  styleUrl: './clubs-in-league.css',
})
export class ClubsInLeague implements OnChanges{

  @Output() club!: Club;
  @Input() leagueId!: number | undefined;

  @ViewChild('dt') dt!: Table;
  clubs: Club[] = [];
  initialValue: Club[] = [];
  isSorted: boolean | null = null;

  constructor(private cdr: ChangeDetectorRef, private assignClubService: AssignClubService, private eventService: EventService) {
    this.eventService.getEvent('clubAssigned', () => {
      if(this.leagueId){
        this.loadClubsByLeagueId(this.leagueId);
      }
    });
  }

  ngOnChanges() {
    if(this.leagueId){
      this.loadClubsByLeagueId(this.leagueId);
    }
  }

  loadClubsByLeagueId(id: number): void {
    this.assignClubService.getClubsByLeagueId(this.leagueId!).subscribe((data: Club[]) => {
      this.clubs = data;
      this.initialValue = [...data];
      this.cdr.markForCheck();
    });
  }

  sortTableData(event: SortEvent) {
      if (!event.data) {
        console.error('No data to sort');
        return;
      }
      event.data.sort((data1, data2) => {
          let value1 = data1[event.field!];
          let value2 = data2[event.field!];
          let result = null;
          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
          else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

          return event.order! * result;
      });
  }
}