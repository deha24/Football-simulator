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
    this.eventService.getEvent('newCoachLineupReply', (updatedLinueup: CoachLineupDTO) => {
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
      this.eventService.emitEvent('updateCoachLineupRequest');
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
        this.updateCoachForm.reset();
        this.eventService.emitEvent('updatedCoach');
      });
  }
}
