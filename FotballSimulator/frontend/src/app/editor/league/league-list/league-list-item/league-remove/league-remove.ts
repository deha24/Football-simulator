import { EventService } from './../../../../../../shared/services/EventServices';
import { Component, Input } from '@angular/core';
import { LeagueService } from '../../../leagueService';

@Component({
  selector: 'league-remove',
  imports: [],
  templateUrl: './league-remove.html',
  styleUrl: './league-remove.css'
})
export class LeagueRemove {

  @Input() leagueId!: number;

  constructor(private leagueService: LeagueService, private eventService: EventService) {}

  removeLeague() {
    this.leagueService.removeLeague(this.leagueId).subscribe({
      next: () => {
        this.eventService.emitEvent('removedLeague');
      },
      error: (err: any) => {
        console.error('Error removing league:', err);
      }
    });
  }

}
