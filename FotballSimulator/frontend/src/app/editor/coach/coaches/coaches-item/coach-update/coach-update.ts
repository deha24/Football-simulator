import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CoachLineupForm } from '../../../coach-lineup/coach-lineup-form/coach-lineup-form';
import { CreateCoachDTO, Coach, CoachLineupDTO } from '../../../../../../shared/models/coach';
import { CoachService } from '../../../coachService';
import { EventService } from '../../../../../../shared/services/EventServices';

interface CoachingStyles {
    label: string;
    value: string;
}

@Component({
  selector: 'coach-update',
  imports: [ButtonModule, ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, FormsModule, InputGroupAddonModule, DatePickerModule, CardModule, CoachLineupForm],
  templateUrl: './coach-update.html',
  styleUrl: './coach-update.css',
})
export class CoachUpdate {

  @Input() coach!: Coach;
  @Output() updateCoachEvent = new EventEmitter<Coach>();
  
  constructor(private coachService: CoachService, private eventService: EventService) {}

  updateCoachForm!: FormGroup;
  coachLineup!: CoachLineupDTO;

  ngOnInit() {

    this.updateCoachForm = new FormGroup({
      CoachFirstName: new FormControl(this.coach.first_name, {validators: [Validators.required]}),
      CoachLastname: new FormControl(this.coach.last_name, {validators: [Validators.required]}),
      CoachBirthDate: new FormControl(this.coach.birth_date, {validators: [Validators.required]}),
      CoachNationality: new FormControl(this.coach.nationality, {validators: [Validators.required]}),
      CoachDefence: new FormControl(this.coach.defence, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      CoachMidfield: new FormControl(this.coach.midfield, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      CoachAttack: new FormControl(this.coach.attack, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      CoachMidfieldStyle: new FormControl(this.coach.midfield_style, {validators: [Validators.required]}),
      CoachBalanceStyle: new FormControl(this.coach.balance_style, {validators: [Validators.required]}),
    });

    this.coachLineup = this.coach.lineup;
    this.eventService.getEvent('newcoachLineupReply', (updatedLinueup: CoachLineupDTO) => {
      this.updateCoach(updatedLinueup);
    });
  }

    midfieldStyles: CoachingStyles[] = [
    { label: 'Long Possesions', value: 'longPossesions' },
    { label: 'Balanced', value: 'balanced' },
    { label: 'Counter Attacks', value: 'counterAttacks' }
  ];

  balanceStyles: CoachingStyles[] = [
    { label: 'Attacking', value: 'attacking' },
    { label: 'Balanced', value: 'balanced' },
    { label: 'Defensive', value: 'defensive' }
  ];


  validUpdateCoachForm() {
    if (this.updateCoachForm.valid) {
      this.eventService.emitEvent('updateCoachPositionsRequest');
    } else {
      // Handle form errors if needed
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
    const firstName = this.updateCoachForm.value.newCoachFirstName;
    const lastName = this.updateCoachForm.value.newCoachLastname;
    const birthDate = formatDate(this.updateCoachForm.value.newCoachBirthDate!, 'yyyy-MM-dd', 'en-US');
    const nationality = this.updateCoachForm.value.newCoachNationality;
    const goalkeeping = this.updateCoachForm.value.newCoachGoalkeeping;
    const defence = this.updateCoachForm.value.newCoachDefence;
    const midfield = this.updateCoachForm.value.newCoachMidfield;
    const attack = this.updateCoachForm.value.newCoachAttack;

    Object.keys(this.updateCoachForm.controls).forEach(key => {
        const control = this.updateCoachForm.get(key);
        if (control && control.dirty) {
          if (key === 'CoachFirstName') data.first_name = firstName;
          if (key === 'CoachLastname') data.last_name = lastName;
          if (key === 'CoachBirthDate') data.birth_date = birthDate;
          if (key === 'CoachNationality') data.nationality = nationality;
          if (key === 'CoachDefence') data.defence = defence;
          if (key === 'CoachMidfield') data.midfield = midfield;
          if (key === 'CoachAttack') data.attack = attack;
          if (key === 'CoachMidfieldStyle') data.midfield_style = this.updateCoachForm.value.newCoachMidfieldStyle;
          if (key === 'CoachBalanceStyle') data.balance_style = this.updateCoachForm.value.newCoachBalanceStyle;
          if (updatedLinueup) data.lineup = updatedLinueup;
        }
      });

      this.coachService.updateCoach(data, this.coach.id).subscribe(() => {
        this.updateCoachForm.reset();
        this.eventService.emitEvent('updatedCoach');
      });
  }
}
