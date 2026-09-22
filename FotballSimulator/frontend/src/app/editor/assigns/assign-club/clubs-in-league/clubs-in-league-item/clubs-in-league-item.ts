import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Club } from '../../../../../../shared/models/club';

@Component({
  selector: '[clubs-in-league-item]',
  imports: [ TableModule, ButtonModule],
  templateUrl: './clubs-in-league-item.html',
  styleUrl: './clubs-in-league-item.css',
})
export class ClubsInLeagueItem {

  @Input() club!: Club;
}
