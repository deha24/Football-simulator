import { CoachesItem, } from './coaches-item/coaches-item';
import { Component, Output, ViewChild } from '@angular/core';
import { Coach } from '../../../../shared/models/coach';
import { ChangeDetectorRef } from '@angular/core';
import { CoachService } from '../coachService';
import { EventService } from '../../../../shared/services/EventServices';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'coaches',
  imports: [CoachesItem, TableModule],
  templateUrl: './coaches.html',
  styleUrl: './coaches.css'
})
export class Coaches {

  @ViewChild('dt') dt!: Table;
  coaches: Coach[] = [];
  initialValue: Coach[] = [];
  isSorted: boolean | null = null;

  @Output() coach!: Coach;

  loadCoaches(): void {
    this.coachService.getCoaches().subscribe((data: Coach[]) => {
      this.coaches = data;
      this.cdr.detectChanges();
      this.initialValue = [...data];
    });
  }

  constructor(private cdr: ChangeDetectorRef, private coachService: CoachService, private eventService: EventService) {
    this.eventService.getEvent('removedCoach', () => {
      this.loadCoaches();
    });
    this.eventService.getEvent('updatedCoach', () => {
      this.loadCoaches();
    });
  }

  ngOnInit() {
    this.loadCoaches();
  }

  customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.coaches = [...this.initialValue];
            this.dt.reset();
        }
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
