import { Component, Input } from '@angular/core';
import { EventService } from '../../../../../shared/services/EventServices';
import { FootballersService } from '../../footballersService';
import { Footballer } from '../../../../../shared/models/footballer';

@Component({
  selector: 'footballer-remove',
  imports: [],
  templateUrl: './footballer-remove.html',
  styleUrl: './footballer-remove.css'
})
export class FootballerRemove {

  @Input() footballer!: Footballer;

  constructor(private eventService: EventService, private footballersService: FootballersService) {}

  removeFootballer() {
    this.footballersService.deleteFootballer(this.footballer.id).subscribe({
      next: () => {
        this.eventService.emitEvent('removedFootballer')
      },
      error: (err: any) => {
        console.error('Error removing footballer:', err);
      }
    });
  }

}
