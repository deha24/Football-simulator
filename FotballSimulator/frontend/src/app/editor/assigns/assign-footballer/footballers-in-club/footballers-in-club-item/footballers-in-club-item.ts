import { Component, Input} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EventService } from '../../../../../../shared/services/EventServices';
import { Footballer } from '../../../../../../shared/models/footballer';
import { FootballersAssignFootballer } from './footballers-assign-footballer/footballers-assign-footballer';

@Component({
  selector: '[footballers-in-club-item]',
  imports: [TableModule, ButtonModule, FootballersAssignFootballer],
  templateUrl: './footballers-in-club-item.html',
  styleUrl: './footballers-in-club-item.css',
})
export class FootballersInClubItem {

  @Input() footballer!: Footballer;

  constructor(private eventService: EventService) { }

}
