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
import { CreateFootballerDTO, Footballer, FootballerPositionsDTO } from '../../../../shared/models/footballer';
import { FootballersService } from '../footballersService';
import { FootballerPositions } from '../footballer-positions/footballer-positions';

@Component({
  selector: 'footballer-add',
  imports: [ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, FormsModule, InputGroupAddonModule, DatePickerModule, CardModule, ButtonModule, FootballerPositions],
  templateUrl: './footballer-add.html',
  styleUrl: './footballer-add.css'
})
export class FootballerAdd {

  @Output() addFootballer = new EventEmitter<Footballer>();

  constructor(private footballersService: FootballersService, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvent('newFootballerPositionReply', (newFootballerPositions: FootballerPositionsDTO) => {
      this.addNewFootballer(newFootballerPositions);
    });
  }

  addfootballerform = new FormGroup({
    newFootballerFirstName: new FormControl('', { validators: [Validators.required] }),
    newFootballerLastname: new FormControl('', { validators: [Validators.required] }),
    newFootballerBirthDate: new FormControl('', { validators: [Validators.required] }),
    newFootballerNationality: new FormControl('', { validators: [Validators.required] }),
    newFootballerGoalkeeping: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    newFootballerDefence: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    newFootballerMidfield: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    newFootballerAttack: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
  });

  validFootballer(){
    if (this.addfootballerform.valid) {
      this.eventService.emitEvent('newFootballerPositionsRequest', {});
    } else{
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.addfootballerform.controls).forEach(key => {
        const control = this.addfootballerform.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }

  addNewFootballer(newFootballerPositions: FootballerPositionsDTO) {
    const firstName = this.addfootballerform.value.newFootballerFirstName;
    const lastName = this.addfootballerform.value.newFootballerLastname;
    const birthDate = formatDate(this.addfootballerform.value.newFootballerBirthDate!, 'yyyy-MM-dd', 'en-US');
    const nationality = this.addfootballerform.value.newFootballerNationality;
    const goalkeeping = this.addfootballerform.value.newFootballerGoalkeeping;
    const defence = this.addfootballerform.value.newFootballerDefence;
    const midfield = this.addfootballerform.value.newFootballerMidfield;
    const attack = this.addfootballerform.value.newFootballerAttack;

    const newFootballer = new CreateFootballerDTO(firstName!, lastName!, birthDate!, nationality!, newFootballerPositions!, goalkeeping!, defence!, midfield!, attack!);
      console.log('Dodawanie nowego piłkarza:', newFootballer);
      this.footballersService.addFootballer(newFootballer).subscribe(() => {
      this.addfootballerform.reset();
      });   
  }
}
