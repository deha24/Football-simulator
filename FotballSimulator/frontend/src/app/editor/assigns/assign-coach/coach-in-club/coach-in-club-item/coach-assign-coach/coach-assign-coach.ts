import { Component, Input, inject} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AssignCoachStateService } from '../../../services/assignCoachStateService';

@Component({
  selector: 'coach-assign-coach',
  imports: [ButtonModule],
  templateUrl: './coach-assign-coach.html',
  styleUrl: './coach-assign-coach.css',
})
export class CoachAssignCoach {

  @Input() coachId!: number;

  private stateService = inject(AssignCoachStateService);

  constructor(){ }

  assignNewClub(){
    this.stateService.assignCoach(this.coachId);
  }

}
