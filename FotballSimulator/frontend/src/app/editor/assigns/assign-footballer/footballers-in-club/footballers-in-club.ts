import { Component, Input, Output, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { EventService } from '../../../../../shared/services/EventServices';
import { AssignFootballerService } from '../services/assignFootballerService';
import { FootballersDTO } from '../../../../../shared/models/footballer';
import { FootballersInClubItem } from './footballers-in-club-item/footballers-in-club-item';

@Component({
  selector: 'footballers-in-club',
  imports: [TableModule, FootballersInClubItem],
  templateUrl: './footballers-in-club.html',
  styleUrl: './footballers-in-club.css',
})
export class FootballersInClub implements OnChanges{

  @Output() footballer!: FootballersDTO;
  @Input() clubId!: number | undefined;

  @ViewChild('dt') dt!: Table;
  footballers: FootballersDTO[] = [];
  initialValue: FootballersDTO[] = [];
  isSorted: boolean | null = null;

  constructor(private cdr: ChangeDetectorRef, private assignFootballerService: AssignFootballerService, private eventService: EventService) {
    this.eventService.getEvent('footballerAssigned', () => {
      if(this.clubId){
        this.loadFootballersByClubId(this.clubId);
      }
    });
  }

  ngOnChanges() {
    if(this.clubId){
      this.loadFootballersByClubId(this.clubId);
    }
  }

  loadFootballersByClubId(id: number): void {
    this.assignFootballerService.getFootballersByClubId(this.clubId!).subscribe((data: FootballersDTO[]) => {
      this.footballers = data;
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