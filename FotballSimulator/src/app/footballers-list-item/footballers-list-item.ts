import { Component, Input} from '@angular/core';
import { Footballer } from '../../shared/models/footballer';
import eventService from '../../shared/services/EventServices';


@Component({
  selector: 'footballers-list-item',
  imports: [],
  templateUrl: './footballers-list-item.html',
  styleUrl: './footballers-list-item.css'
})
export class FootballersListItem {

  @Input() footballer!: Footballer;

  removeFootballer() {
    eventService.emitEvent('removeFootballer', this.footballer);
  }
}
