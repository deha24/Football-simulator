import { Component, Input} from '@angular/core';
import { Footballer } from '../../shared/models/footballer';
import { EventService } from '../../shared/services/EventServices';


@Component({
  selector: 'footballers-list-item',
  imports: [],
  templateUrl: './footballers-list-item.html',
  styleUrl: './footballers-list-item.css'
})
export class FootballersListItem {

  @Input() footballer!: Footballer;

  removeFootballer() {
    this.EventService.emitEvent('removeFootballer', this.footballer);
  }
}
