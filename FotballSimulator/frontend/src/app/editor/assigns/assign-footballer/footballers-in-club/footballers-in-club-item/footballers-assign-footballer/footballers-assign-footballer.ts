import { Component, Input, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AssignFootballerStateService } from '../../../assign-footballer-state-service';

@Component({
  selector: 'footballers-assign-footballer',
  imports: [ButtonModule],
  templateUrl: './footballers-assign-footballer.html',
  styleUrl: './footballers-assign-footballer.css',
})
export class FootballersAssignFootballer {

  @Input() footballerId!: number;

  private stateService = inject(AssignFootballerStateService);

  constructor(){ }

  assignNewClub(){
    this.stateService.assignFootballer(this.footballerId);
  }

}
