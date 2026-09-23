import { Component, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { EventService } from '../../../../../shared/services/EventServices';
import { AssignCoachService } from '../services/assignCoachService';
import { Coach } from '../../../../../shared/models/coach';
import { CoachInClubItem } from './coach-in-club-item/coach-in-club-item';

@Component({
  selector: 'coach-in-club',
  imports: [TableModule, CoachInClubItem],
  templateUrl: './coach-in-club.html',
  styleUrl: './coach-in-club.css'
})
export class CoachInClub {

  @Output() coach!: Coach;
  @Input() clubId!: number | undefined;

  @ViewChild('dt') dt!: Table;
  coaches: Coach[] = [];
  initialValue: Coach[] = [];
  isSorted: boolean | null = null;

  constructor(private cdr: ChangeDetectorRef, private assignCoachService: AssignCoachService, private eventService: EventService) {
    this.eventService.getEvent('coachAssigned', () => {
      if(this.clubId){
        this.loadCoachesByClubId(this.clubId);
      }
    });
  }

  ngOnChanges() {
    if(this.clubId){
      this.loadCoachesByClubId(this.clubId);
    }
  }

  loadCoachesByClubId(id: number): void {
    this.assignCoachService.getCoachesByClubId(this.clubId!).subscribe((data: Coach[]) => {
      this.coaches = data;
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
