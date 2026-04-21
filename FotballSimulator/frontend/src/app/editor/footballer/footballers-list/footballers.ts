import { FootballersItem, } from '../footballers-list-item/footballers-item';
import { Component, ViewChild } from '@angular/core';
import { Footballer } from '../../../../shared/models/footballer';
import { ChangeDetectorRef } from '@angular/core';
import { FootballersService } from '../footballersService';
import { EventService } from '../../../../shared/services/EventServices';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'footballers',
  imports: [FootballersItem, TableModule],
  templateUrl: './footballers.html',
  styleUrl: './footballers.css'
})
export class Footballers {

  @ViewChild('dt') dt!: Table;
  footballers: Footballer[] = [];
  initialValue: Footballer[] = [];
  isSorted: boolean | null = null;

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

    onRowEditInit(footballer: Footballer) {
        //this.clonedFootballers[footballer.id as string] = { ...footballer };
    }

    onRowEditSave(footballer: Footballer) {
        //if (footballer.price > 0) {
        //    delete this.clonedFootballers[footballer.id as string];
        //} else {
        //    
        //}
    }

    onRowEditCancel(footballer: Footballer, index: number) {
        //this.footballers[index] = this.clonedFootballers[footballer.id as string];
        //delete this.clonedFootballers[footballer.id as string];
    }
}
