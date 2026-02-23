import { FootballersItem, } from '../footballers-list-item/footballers-item';
import { Component, Input } from '@angular/core';
import { Footballer } from '../../../../shared/models/footballer';
import { ChangeDetectorRef } from '@angular/core';
import { FootballersService } from '../footballersService';
import { EventService } from '../../../../shared/services/EventServices';
@Component({
  selector: 'footballers',
  imports: [FootballersItem],
  templateUrl: './footballers.html',
  styleUrl: './footballers.css'
})
export class Footballers {

  footballers: Footballer[] = [];

  loadFootballers(): void {
    this.footballersService.getFootballers().subscribe((data: Footballer[]) => {
      this.footballers = data;
      this.cdr.detectChanges();
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

}
