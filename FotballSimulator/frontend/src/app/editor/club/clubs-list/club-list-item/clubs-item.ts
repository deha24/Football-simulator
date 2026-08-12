import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Club } from '../../../../../shared/models/club';
import { ClubRemove } from './club-remove/club-remove';
import { ClubUpdate } from './club-update/club-update';


@Component({
  selector: '[clubs-item]',
  imports: [DialogModule, ButtonModule, ClubRemove, ClubUpdate],
  templateUrl: './clubs-item.html',
  styleUrl: './clubs-item.css'
})
export class ClubsItem {

  @Input() club!: Club;
  @Input() rowIndex!: number;
  displayEditDialog: boolean = false;

  constructor(private router: Router) {}

  openEditDialog() {
    this.displayEditDialog = true;
  }

  detailsClub(id: number) {
    this.router.navigate(['editor/clubs/details', id]);
  }

}
