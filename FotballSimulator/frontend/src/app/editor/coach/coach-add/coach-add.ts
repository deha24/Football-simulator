import { Component, Output, EventEmitter, ViewChild} from '@angular/core';
import { formatDate } from '@angular/common';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../shared/formsImports';
import { EventService } from '../../../../shared/services/EventServices';
import { NotificationService } from '../../../../shared/services/NotificationService';
import { CoachService } from '../coachService';
import { CreateCoachDTO, Coach, CoachLineupDTO, MIDFIELD_STYLES, BALANCE_STYLES } from '../../../../shared/models/coach';
import { CoachLineupForm } from '../coach-lineup/coach-lineup-form/coach-lineup-form';


interface CoachingStyles {
    label: string;
    value: string;
}

@Component({
  selector: 'coach-add',
  imports: [ FORMS_IMPORTS, CoachLineupForm],
  templateUrl: './coach-add.html',
  styleUrl: './coach-add.css'
})
export class CoachAdd {

  @Output() addCoach = new EventEmitter<Coach>();
  @ViewChild(CoachLineupForm) lineupComponent!: CoachLineupForm;

  midfieldStyles = MIDFIELD_STYLES;
  balanceStyles = BALANCE_STYLES;

  constructor(private coachService: CoachService, private eventService: EventService, private notificationService: NotificationService) { }

  addCoachform = new FormGroup({
    newCoachFirstName: new FormControl('', { validators: [Validators.required] }),
    newCoachLastname: new FormControl('', { validators: [Validators.required] }),
    newCoachBirthDate: new FormControl('', { validators: [Validators.required] }),
    newCoachNationality: new FormControl('', { validators: [Validators.required] }),
    newCoachDefence: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    newCoachMidfield: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    newCoachAttack: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    newCoachMidfieldStyle: new FormControl('', { validators: [Validators.required] }),
    newCoachBalanceStyle: new FormControl('', { validators: [Validators.required] }),
  });

  validCoachForm(){
    if (this.addCoachform.valid) {
      const validLineup = this.lineupComponent.newCoachLineup()
      if(validLineup){
        this.addNewCoach(validLineup);
      }
    } else{
      // Handle form errors if needed
      this.notificationService.showError();
      console.error('Form is invalid');
      Object.keys(this.addCoachform.controls).forEach(key => {
        const control = this.addCoachform.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }

  addNewCoach(newCoachLineup: CoachLineupDTO) {
    const firstName = this.addCoachform.value.newCoachFirstName;
    const lastName = this.addCoachform.value.newCoachLastname;
    const birthDate = formatDate(this.addCoachform.value.newCoachBirthDate!, 'yyyy-MM-dd', 'en-US');
    const nationality = this.addCoachform.value.newCoachNationality;
    const defence = this.addCoachform.value.newCoachDefence;
    const midfield = this.addCoachform.value.newCoachMidfield;
    const attack = this.addCoachform.value.newCoachAttack;
    const midfieldStyle = this.addCoachform.value.newCoachMidfieldStyle;
    const balanceStyle = this.addCoachform.value.newCoachBalanceStyle;

    const newCoach = new CreateCoachDTO(firstName!, lastName!, birthDate!, nationality!, newCoachLineup!, defence!, midfield!, attack!, midfieldStyle!, balanceStyle!);
      this.coachService.addCoach(newCoach).subscribe(() => {
        this.notificationService.showSuccess('Coach Added');
        this.addCoachform.reset();
      });   
  }
}
