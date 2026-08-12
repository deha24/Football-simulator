import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { League } from '../../../../../shared/models/league';
import { LeagueRemove } from "./league-remove/league-remove";
import { LeagueUpdate } from "./league-update/league-update";

@Component({
  selector: '[leagues-item]',
  imports: [LeagueRemove, DialogModule, ButtonModule, LeagueUpdate],
  templateUrl: './leagues-item.html',
  styleUrl: './leagues-item.css'
})
export class LeaguesItem {

  @Input() league!: League;
  @Input() rowIndex!: number;

  displayEditDialog: boolean = false;

  constructor(private router: Router) {}

  leagueDetails(id: number) {
    this.router.navigate(['/editor/leagues/details', id]);
  }

  openEditDialog() {
    this.displayEditDialog = true;
  }

}
