import { Component, OnInit, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footballer } from '../shared/models/footballer';
import { FormsModule } from '@angular/forms';
import { FootballersList } from "./footballers-list/footballers-list";import { FootballersListItem } from './footballers-list-item/footballers-list-item';
import { EventService }  from '../shared/services/EventServices';
import { FootballersService } from './footballersService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FootballersList],
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
    this.footballersService.getFootballers().subscribe({
      next: (data: any) => {
        this.items = data;
      },
    });
  }

  protected readonly title = signal('FotballSimulator');

  addNewFootballer() {
      if (this.newFootballerName) {
      this.items.push(new Footballer(this.newFootballerName, ''));
      this.newFootballerName = '';
    }
  }
}
