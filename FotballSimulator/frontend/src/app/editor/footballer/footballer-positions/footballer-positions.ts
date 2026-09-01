import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { EventService } from '../../../../shared/services/EventServices';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { FootballerPositionsDTO } from '../../../../shared/models/footballer';
import { FootballersService } from '../footballersService';

@Component({
  selector: 'footballer-positions',
  imports: [PanelModule, CardModule, InputNumberModule, InputTextModule, InputGroupModule, ReactiveFormsModule, FormsModule],
  templateUrl: './footballer-positions.html',
  styleUrl: './footballer-positions.css',
})
export class FootballerPositions implements OnInit{

  constructor(private footballersService: FootballersService, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvent('newFootballerPositionsRequest', () => { 
      this.addNewFootballerPositions(); 
    });
  }

  addfootballerPositionsForm = new FormGroup({
    newFootballerPositionGK: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLB: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCB: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRB: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLWB: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCDM: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRWB: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLM: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCM: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRM: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLW: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCAM: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRW: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionST: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
  });

  addNewFootballerPositions() {
    const gk = this.addfootballerPositionsForm.value.newFootballerPositionGK;
    const lb = this.addfootballerPositionsForm.value.newFootballerPositionLB;
    const cb = this.addfootballerPositionsForm.value.newFootballerPositionCB;
    const rb = this.addfootballerPositionsForm.value.newFootballerPositionRB;
    const lwb = this.addfootballerPositionsForm.value.newFootballerPositionLWB;
    const cdm = this.addfootballerPositionsForm.value.newFootballerPositionCDM;
    const rwb = this.addfootballerPositionsForm.value.newFootballerPositionRWB;
    const lm = this.addfootballerPositionsForm.value.newFootballerPositionLM;
    const cm = this.addfootballerPositionsForm.value.newFootballerPositionCM;
    const rm = this.addfootballerPositionsForm.value.newFootballerPositionRM;
    const lw = this.addfootballerPositionsForm.value.newFootballerPositionLW;
    const cam = this.addfootballerPositionsForm.value.newFootballerPositionCAM;
    const rw = this.addfootballerPositionsForm.value.newFootballerPositionRW;
    const st = this.addfootballerPositionsForm.value.newFootballerPositionST;

    if (this.addfootballerPositionsForm.valid) {
      const newFootballerPositions = new FootballerPositionsDTO(gk!, lb!, cb!, rb!, lwb!, cdm!, rwb!, lm!, cm!, rm!, lw!, cam!, rw!, st!);
      console.log('Dodawanie Pozycji nowego piłkarza:', newFootballerPositions);
      this.eventService.emitEvent('newFootballerpositionsReply', newFootballerPositions);
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.addfootballerPositionsForm.controls).forEach(key => {
        const control = this.addfootballerPositionsForm.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }
}
