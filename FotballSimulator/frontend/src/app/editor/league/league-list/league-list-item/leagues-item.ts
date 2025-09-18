import { Component, Input } from '@angular/core';
import { League } from '../../../../../shared/models/league';
import { Router } from '@angular/router';
import { LeagueRemove } from "./league-remove/league-remove";

@Component({
  selector: 'leagues-item',
  imports: [LeagueRemove],
  templateUrl: './leagues-item.html',
  styleUrl: './leagues-item.css'
})
export class LeaguesItem {

  @Input() leagues!: League[];

  constructor(private router: Router) {}

  leagueDetails(id: number) {
    this.router.navigate(['/editor/leagues/details', id]);
  }

}
