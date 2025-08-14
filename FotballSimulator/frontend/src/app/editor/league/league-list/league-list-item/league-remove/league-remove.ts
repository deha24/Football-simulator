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

  constructor(private leagueService: LeagueService) {}

  removeLeague() {
    this.leagueService.removeLeague(this.leagueId).subscribe(() => {
      // Handle successful removal
    });
  }

}
