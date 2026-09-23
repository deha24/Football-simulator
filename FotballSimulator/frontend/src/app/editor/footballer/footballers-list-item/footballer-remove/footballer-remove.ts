import { Component, Input } from '@angular/core';
import {ButtonModule} from "primeng/button";
import { EventService } from '../../../../../shared/services/EventServices';
import { FootballersService } from '../../footballersService';

@Component({
  selector: 'footballer-remove',
  imports: [ButtonModule],
  templateUrl: './footballer-remove.html',
  styleUrl: './footballer-remove.css'
})
export class FootballerRemove {

  @Input() footballerId!: number;

  constructor(private eventService: EventService, private footballersService: FootballersService) {}

  removeFootballer() {
    this.footballersService.deleteFootballer(this.footballerId).subscribe({
      next: () => {
        this.eventService.emitEvent('removedFootballer')
      },
      error: (err: any) => {
        console.error('Error removing footballer:', err);
      }
    });
  }

}
