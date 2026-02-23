import { Component, Input } from '@angular/core';
import { Club } from '../../../../../shared/models/club';
import { Router } from '@angular/router';
import { ClubRemove } from './club-remove/club-remove';

@Component({
  selector: 'clubs-item',
  imports: [ClubRemove],
  templateUrl: './clubs-item.html',
  styleUrl: './clubs-item.css'
})
export class ClubsItem {

  @Input() club!: Club;

  constructor(private router: Router) {}

  detailsClub(id: number) {
    this.router.navigate(['editor/clubs/details', id]);
  }

}
