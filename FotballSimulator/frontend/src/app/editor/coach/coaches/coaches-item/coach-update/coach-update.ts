import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../../../shared/formsImports';
import { EventService } from '../../../../../../shared/services/EventServices';
import { NotificationService } from '../../../../../../shared/services/NotificationService';
import { CoachService } from '../../../coachService';
import { CoachLineupForm } from '../../../coach-lineup/coach-lineup-form/coach-lineup-form';
import { Coach, CoachLineupDTO, MIDFIELD_STYLES, BALANCE_STYLES } from '../../../../../../shared/models/coach';

@Component({
  selector: 'coach-update',
  imports: [FORMS_IMPORTS, CoachLineupForm],
  templateUrl: './coach-update.html',
  styleUrl: './coach-update.css',
})
export class CoachUpdate {

  @Input() coach!: Coach;
  @Output() updateCoachEvent = new EventEmitter<Coach>();
  midfieldStyles = MIDFIELD_STYLES;
  balanceStyles = BALANCE_STYLES;
  
  constructor(private coachService: CoachService, private eventService: EventService, private notificationService: NotificationService) {
    this.eventService.getEvent('newCoachLineupReply', (updatedLinueup: CoachLineupDTO) => {
      this.updateCoach(updatedLinueup);
    });
  }

  updateCoachForm!: FormGroup;
  coachLineup!: CoachLineupDTO;

  ngOnInit() {

    this.updateCoachForm = new FormGroup({
      coachFirstName: new FormControl(this.coach.first_name, {validators: [Validators.required]}),
      coachLastname: new FormControl(this.coach.last_name, {validators: [Validators.required]}),
      coachBirthDate: new FormControl(this.coach.birth_date, {validators: [Validators.required]}),
      coachNationality: new FormControl(this.coach.nationality, {validators: [Validators.required]}),
      coachDefence: new FormControl(this.coach.defence, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      coachMidfield: new FormControl(this.coach.midfield, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      coachAttack: new FormControl(this.coach.attack, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      coachMidfieldStyle: new FormControl(this.coach.midfield_style, {validators: [Validators.required]}),
      coachBalanceStyle: new FormControl(this.coach.balance_style, {validators: [Validators.required]}),
    });

    this.coachLineup = this.coach.lineup;
  }

  validUpdateCoachForm() {
    if (this.updateCoachForm.valid) {
      this.eventService.emitEvent('updateCoachLineupRequest');
    } else {
      // Handle form errors if needed
      this.notificationService.showError();
      console.error('Form is invalid');
      Object.keys(this.updateCoachForm.controls).forEach(key => {
        const control = this.updateCoachForm.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }

  updateCoach(updatedLinueup: CoachLineupDTO) {

    const data: any = {};
    const firstName = this.updateCoachForm.value.coachFirstName;
    const lastName = this.updateCoachForm.value.coachLastname;
    const birthDate = formatDate(this.updateCoachForm.value.coachBirthDate!, 'yyyy-MM-dd', 'en-US');
    const nationality = this.updateCoachForm.value.coachNationality;
    const goalkeeping = this.updateCoachForm.value.coachGoalkeeping;
    const defence = this.updateCoachForm.value.coachDefence;
    const midfield = this.updateCoachForm.value.coachMidfield;
    const attack = this.updateCoachForm.value.coachAttack;
    const midfield_style = this.updateCoachForm.value.coachMidfieldStyle;
    const balance_style = this.updateCoachForm.value.coachBalanceStyle;

    Object.keys(this.updateCoachForm.controls).forEach(key => {
        const control = this.updateCoachForm.get(key);
        if (control && control.dirty) {
          if (key === 'coachFirstName') data.first_name = firstName;
          if (key === 'coachLastname') data.last_name = lastName;
          if (key === 'coachBirthDate') data.birth_date = birthDate;
          if (key === 'coachNationality') data.nationality = nationality;
          if (key === 'coachDefence') data.defence = defence;
          if (key === 'coachMidfield') data.midfield = midfield;
          if (key === 'coachAttack') data.attack = attack;
          if (key === 'coachMidfieldStyle') data.midfield_style = midfield_style;
          if (key === 'coachBalanceStyle') data.balance_style = balance_style;
          if (updatedLinueup) data.lineup = updatedLinueup;
        }
      });

      this.coachService.updateCoach(data, this.coach.id).subscribe(() => {
        this.notificationService.showSuccess('Coach Updated');
        this.eventService.emitEvent('updatedCoach');
        this.updateCoachForm.reset();
      });
  }
}
