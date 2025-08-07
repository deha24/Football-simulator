import { Footballer } from './../shared/models/footballer';
import { Component, OnInit, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FootballersList } from "./editor/footballer/footballers-list/footballers-list";import { FootballersListItem } from './editor/footballer/footballers-list-item/footballers-list-item';
import { EventService }  from '../shared/services/EventServices';
import { FootballersService } from './editor/footballer/footballersService';
import { HttpClient } from '@angular/common/http';
import { FootballerAdd } from "./editor/footballer/footballer-add/footballer-add";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FootballersList, FootballerAdd],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  newFootballerName: string = '';

  items: Footballer[] = [];

  @Output()
  footballersList = signal<Footballer[]>([]);

  constructor(private eventService: EventService, private footballersService: FootballersService) {
    this.eventService.getEvent('removeFootballer', (footballer: Footballer) => {
      this.items = this.items.filter(item => item !== footballer);
    });
  }

  ngOnInit(): void {
    this.footballersService.getFootballers().subscribe((data : any) => {
      this.items = data;
    })
  }

  protected readonly title = signal('FotballSimulator');

  addNewFootballer() {
      if (this.newFootballerName) {
      this.items.push(new Footballer(this.newFootballerName, ''));
      this.newFootballerName = '';
    }
  }
}
