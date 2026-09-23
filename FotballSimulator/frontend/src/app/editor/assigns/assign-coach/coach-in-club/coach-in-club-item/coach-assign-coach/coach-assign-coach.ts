import { Component, Input, inject} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AssignCoachStateService } from '../../../services/assignCoachStateService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'coach-assign-coach',
  imports: [ButtonModule, ToastModule],
  templateUrl: './coach-assign-coach.html',
  styleUrl: './coach-assign-coach.css',
  providers: [MessageService]
})
export class CoachAssignCoach {

  @Input() coachId!: number;

  private stateService = inject(AssignCoachStateService);

  constructor(){ }

  assignNewClub(){
    this.stateService.assignCoach(this.coachId);
  }

}
