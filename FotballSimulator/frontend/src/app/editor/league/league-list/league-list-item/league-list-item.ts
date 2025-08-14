import { Component, Input } from '@angular/core';
import { League } from '../../../../../shared/models/league';
import { Router } from '@angular/router';
import { LeagueRemove } from "./league-remove/league-remove";

@Component({
  selector: 'league-list-item',
  imports: [LeagueRemove],
  templateUrl: './league-list-item.html',
  styleUrl: './league-list-item.css'
})
export class LeagueListItem {

  @Input() leagues!: League[];

  constructor(private router: Router) {}

  leagueDetails(id: number) {
    this.router.navigate(['/editor/leagues/details', id]);
  }

}
