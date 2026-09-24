import { Component, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FORMS_IMPORTS, FormGroup, FormControl, Validators} from '../../../../shared/formsImports';
import { EventService } from '../../../../shared/services/EventServices';
import { NotificationService } from '../../../../shared/services/NotificationService';
import { CreateFootballerDTO, FootballerPositionsDTO } from '../../../../shared/models/footballer';
import { FootballersService } from '../footballersService';
import { FootballerPositionsForm } from '../footballer-positions/footballer-positions-form/footballer-positions-form';

@Component({
  selector: 'footballer-add',
  imports: [FORMS_IMPORTS, FootballerPositionsForm],
  templateUrl: './footballer-add.html',
  styleUrl: './footballer-add.css'
})
export class FootballerAdd {

  @Output() addFootballer = new EventEmitter<CreateFootballerDTO>();

  constructor(private footballersService: FootballersService, private eventService: EventService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.eventService.getEvent('newFootballerPositionsReply', (newFootballerPositions: FootballerPositionsDTO) => {
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

  validFootballerForm(){
    if (this.addfootballerform.valid) {
      this.eventService.emitEvent('newFootballerPositionsRequest', {});
    } else{
      // Handle form errors if needed
      console.error('Form is invalid');
      this.notificationService.showError('Error', 'Form is invalid');
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
      this.notificationService.showSuccess('Footballer Added');
      this.footballersService.addFootballer(newFootballer).subscribe(() => {
      this.addfootballerform.reset();
      });   
  }
}
