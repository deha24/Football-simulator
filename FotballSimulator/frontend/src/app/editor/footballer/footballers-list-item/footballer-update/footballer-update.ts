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
import { CreateFootballerDTO, Footballer } from '../../../../../shared/models/footballer';
import { FootballersService } from '../../footballersService';
import { EventService } from '../../../../../shared/services/EventServices';
import { FootballerPositionsDTO } from '../../../../../shared/models/footballer';
import { FootballerPositions } from '../../footballer-positions/footballer-positions';

@Component({
  selector: 'footballer-update',
  imports: [ButtonModule, ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, FormsModule, InputGroupAddonModule, DatePickerModule, CardModule, FootballerPositions ],
  templateUrl: './footballer-update.html',
  styleUrl: './footballer-update.css',
})
export class FootballerUpdate {

  @Input() footballer!: Footballer;
  @Output() updateFootballerEvent = new EventEmitter<Footballer>();
  
  constructor(private footballersService: FootballersService, private eventService: EventService) {}

  updateFootballerForm!: FormGroup;
  footballerPositions!: FootballerPositionsDTO;

  ngOnInit() {
    this.updateFootballerForm = new FormGroup({
      newFootballerFirstName: new FormControl(this.footballer.first_name, {validators: [Validators.required]}),
      newFootballerLastname: new FormControl(this.footballer.last_name, {validators: [Validators.required]}),
      newFootballerBirthDate: new FormControl(this.footballer.birth_date, {validators: [Validators.required]}),
      newFootballerNationality: new FormControl(this.footballer.nationality, {validators: [Validators.required]}),
      newFootballerGoalkeeping: new FormControl(this.footballer.goalkeeping, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      newFootballerDefence: new FormControl(this.footballer.defence, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      newFootballerMidfield: new FormControl(this.footballer.midfield, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
      newFootballerAttack: new FormControl(this.footballer.attack, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    });

    this.footballerPositions = this.footballer.position;
    this.eventService.emitEvent('updateFootballerPositionsShowRequest');
    this.eventService.getEvent('newFootballerPositionsReply', (updatedPositions: FootballerPositionsDTO) => {
      this.updateFootballer(updatedPositions);
    });
  }

  validUpdateFootballerForm() {
    if (this.updateFootballerForm.valid) {
      this.eventService.emitEvent('updateFootballerPositionsRequest');
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.updateFootballerForm.controls).forEach(key => {
        const control = this.updateFootballerForm.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }

  updateFootballer(updatedPositions: FootballerPositionsDTO) {

    const data: any = {};
    const firstName = this.updateFootballerForm.value.newFootballerFirstName;
    const lastName = this.updateFootballerForm.value.newFootballerLastname;
    const birthDate = formatDate(this.updateFootballerForm.value.newFootballerBirthDate!, 'yyyy-MM-dd', 'en-US');
    const nationality = this.updateFootballerForm.value.newFootballerNationality;
    const goalkeeping = this.updateFootballerForm.value.newFootballerGoalkeeping;
    const defence = this.updateFootballerForm.value.newFootballerDefence;
    const midfield = this.updateFootballerForm.value.newFootballerMidfield;
    const attack = this.updateFootballerForm.value.newFootballerAttack;

    Object.keys(this.updateFootballerForm.controls).forEach(key => {
        const control = this.updateFootballerForm.get(key);
        if (control && control.dirty) {
          if (key === 'newFootballerFirstName') data.first_name = firstName;
          if (key === 'newFootballerLastname') data.last_name = lastName;
          if (key === 'newFootballerBirthDate') data.birth_date = birthDate;
          if (key === 'newFootballerNationality') data.nationality = nationality;
          if (key === 'newFootballerGoalkeeping') data.goalkeeping = goalkeeping;
          if (key === 'newFootballerDefence') data.defence = defence;
          if (key === 'newFootballerMidfield') data.midfield = midfield;
          if (key === 'newFootballerAttack') data.attack = attack;
          if (updatedPositions) data.position = updatedPositions;
        }
      });

      this.footballersService.updateFootballer(data, this.footballer.id).subscribe(() => {
        this.updateFootballerForm.reset();
        this.eventService.emitEvent('updatedFootballer');
      });
  }
}
