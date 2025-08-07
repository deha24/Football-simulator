import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footballer } from '../shared/models/footballer';
import { FormsModule } from '@angular/forms';
import { FootballersList } from "./footballers-list/footballers-list";
import { FootballersListItem } from './footballers-list-item/footballers-list-item';
import { EventService }  from '../shared/services/EventServices';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FootballersList,FootballersListItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  newFootballerName: string = '';

  items: Footballer[] = [
    new Footballer('Lionel', 'Messi'),
    new Footballer('Cristiano', 'Ronaldo'),
    new Footballer('Neymar', 'Jr'),
    new Footballer('Kylian', 'Mbappé'),
    new Footballer('Kevin', 'De Bruyne')
  ]

  constructor(private eventService: EventService) {
    this.eventService.getEvent('removeFootballer', (footballer: Footballer) => {
      this.items = this.items.filter(item => item !== footballer);
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
