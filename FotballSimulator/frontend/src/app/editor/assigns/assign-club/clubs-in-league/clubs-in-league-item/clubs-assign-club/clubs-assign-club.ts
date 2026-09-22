import { Component, Input, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AssignClubStateService } from '../../../services/assignClubStateService';

@Component({
  selector: 'clubs-assign-club',
  imports: [],
  templateUrl: './clubs-assign-club.html',
  styleUrl: './clubs-assign-club.css',
})
export class ClubsAssignClub {

  @Input() clubId!: number;

  private stateService = inject(AssignClubStateService);

  constructor(){ }

  assignNewLeague(){
    this.stateService.assignClub(this.clubId);
  }
}
