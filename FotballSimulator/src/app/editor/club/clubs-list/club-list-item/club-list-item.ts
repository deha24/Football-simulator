import { Component, Input } from '@angular/core';
import { Club } from '../../../../../shared/models/club';
import { Router } from '@angular/router';
import { ClubRemove } from './club-remove/club-remove';

@Component({
  selector: 'club-list-item',
  imports: [ClubRemove],
  templateUrl: './club-list-item.html',
  styleUrl: './club-list-item.css'
})
export class ClubListItem {

  @Input() club!: Club;

  constructor(private router: Router) {}

  detailsClub(id: number) {
    this.router.navigate(['editor/clubs/details', id]);
  }

}
