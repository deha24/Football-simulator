import { Component, Input} from '@angular/core';
import { Footballer } from '../../../../shared/models/footballer';
import { EventService } from '../../../../shared/services/EventServices';
import { FootballersService } from '../footballersService';
import { Router } from '@angular/router';


@Component({
  selector: 'footballers-list-item',
  imports: [],
  templateUrl: './footballers-list-item.html',
  styleUrl: './footballers-list-item.css'
})
export class FootballersListItem {

  @Input() footballer!: Footballer;

  constructor(private eventService: EventService, private footballersService: FootballersService, private router: Router) {}

  removeFootballer() {
    this.eventService.emitEvent('removeFootballer', this.footballer);
    this.footballersService.deleteFootballer(this.footballer.id).subscribe();
  }

  detailsFootballer(id: number) {
    this.router.navigate(['/editor/footballers/details', id]);
  }
}
