import { Component, Output, EventEmitter} from '@angular/core';
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
import {EventService} from '../../../../shared/services/EventServices';
import { CreateCoachDTO, Coach, CoachLineupDTO } from '../../../../shared/models/coach';
import { CoachService } from '../coach-service';
import { CoachLineupForm } from '../coach-lineup/coach-lineup-form/coach-lineup-form';


interface CoachingStyles {
    label: string;
    value: string;
}

@Component({
  selector: 'coach-add',
  imports: [ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, FormsModule, InputGroupAddonModule, DatePickerModule, CardModule, ButtonModule, CoachLineupForm],
  templateUrl: './coach-add.html',
  styleUrl: './coach-add.css'
})
export class CoachAdd {

  @Output() addCoach = new EventEmitter<Coach>();

  selectedMidfieldStyle: string = '';
  selectedBalanceStyle: string = '';

  constructor(private coachService: CoachService, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvent('newCoachPositionsReply', (newCoachLineup: CoachLineupDTO) => {
      this.addNewCoach(newCoachLineup);
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
      this.eventService.emitEvent('newCoachPositionsRequest', {});
    } else{
      // Handle form errors if needed
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
      console.log('Dodawanie nowego trenera:', newCoach);
      this.coachService.addCoach(newCoach).subscribe(() => {
      this.addCoachform.reset();
      });   
  }
}
