import { Component, Input } from '@angular/core';
import { EventService } from './../../../../../../shared/services/EventServices';
import { NotificationService } from '../../../../../../shared/services/NotificationService';
import { LeagueService } from '../../../leagueService';

@Component({
  selector: 'league-remove',
  imports: [],
  templateUrl: './league-remove.html',
  styleUrl: './league-remove.css'
})
export class LeagueRemove {

  @Input() leagueId!: number;

  constructor(private leagueService: LeagueService, private eventService: EventService, private notificationService: NotificationService) {}

  removeLeague() {
    this.leagueService.removeLeague(this.leagueId).subscribe({
      next: () => {
        this.notificationService.showSuccess("League Removed");
        this.eventService.emitEvent('removedLeague');
      },
      error: (err: any) => {
        this.notificationService.showError();
        console.error('Error removing league:', err);
      }
    });
  }

}
