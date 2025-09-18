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

  constructor(private cdr: ChangeDetectorRef, private footballersService: FootballersService, private eventService: EventService) {
    this.eventService.getEvent('removeFootballer', (footballer: Footballer) => {
      this.footballers = this.footballers.filter(item => item !== footballer);
    });
  }

  ngOnInit() {
    this.footballersService.getFootballers().subscribe((data: any) => {
      this.footballers = data
      this.cdr.detectChanges();
      console.log('Footballers loaded:', this.footballers);
    });
  }

}
