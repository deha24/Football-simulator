
import { Component, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SortEvent } from 'primeng/api';
import { FootballersService } from '../footballersService';
import { EventService } from '../../../../shared/services/EventServices';
import { Footballer } from '../../../../shared/models/footballer';
import { FootballersItem } from '../footballers-list-item/footballers-item';


@Component({
  selector: 'footballers',
  imports: [TableModule, ToastModule, FootballersItem],
  templateUrl: './footballers.html',
  styleUrl: './footballers.css'
})
export class Footballers implements OnInit{

  @ViewChild('dt') dt!: Table;
  footballers: Footballer[] = [];
  initialValue: Footballer[] = [];
  isSorted: boolean | null = null;

  @Output() footballer!: Footballer;

  loadFootballers(): void {
    this.footballersService.getFootballers().subscribe((data: Footballer[]) => {
      this.footballers = data;
      this.cdr.detectChanges();
      this.initialValue = [...data];
    });
  }

  constructor(private cdr: ChangeDetectorRef, private footballersService: FootballersService, private eventService: EventService) {
    this.eventService.getEvent('removedFootballer', () => {
      this.loadFootballers();
    });
    this.eventService.getEvent('updatedFootballer', () => {
      this.loadFootballers();
    });
  }

  ngOnInit() {
    this.loadFootballers();
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
            this.footballers = [...this.initialValue];
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
