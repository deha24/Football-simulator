import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { EventService } from '../../../../../shared/services/EventServices';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { CoachLineupDTO } from '../../../../../shared/models/coach';
import { CoachService } from '../../coach-service';

@Component({
  selector: 'coach-lineup-form',
  imports: [PanelModule, CardModule, InputNumberModule, InputTextModule, InputGroupModule, ReactiveFormsModule, FormsModule],
  templateUrl: './coach-lineup-form.html',
  styleUrl: './coach-lineup-form.css',
})
export class CoachLineupForm implements OnInit{

  @Input() coachLineup!: CoachLineupDTO;
  footballerId!: number;

  constructor(private CoachService: CoachService, private eventService: EventService) {}

  addCoachLineupForm = new FormGroup({
    newCoachLineupGK: new FormControl(<null | boolean> null, { validators: [Validators.required] }),
    newCoachLineupLB: new FormControl(<null | boolean> null, { }),
    newCoachLineupCB: new FormControl(<null | boolean> null, { }),
    newCoachLineupRB: new FormControl(<null | boolean> null, { }),
    newCoachLineupLWB: new FormControl(<null | boolean> null, { }),
    newCoachLineupCDM: new FormControl(<null | boolean> null, { }),
    newCoachLineupRWB: new FormControl(<null | boolean> null, { }),
    newCoachLineupLM: new FormControl(<null | boolean> null, { }),
    newCoachLineupCM: new FormControl(<null | boolean> null, { }),
    newCoachLineupRM: new FormControl(<null | boolean> null, { }),
    newCoachLineupLW: new FormControl(<null | boolean> null, { }),
    newCoachLineupCAM: new FormControl(<null | boolean> null, { }),
    newCoachLineupRW: new FormControl(<null | boolean> null, { }),
    newCoachLineupST: new FormControl(<null | boolean> null, { }),
  });

  ngOnInit() {

    this.eventService.getEvent('newCoachLineupRequest', () => { 
      this.newCoachLineup(); 
    });

    this.eventService.getEvent('updateCoachLineupRequest', () => {
      this.newCoachLineup();
    });

    if (this.coachLineup) {
      this.addCoachLineupForm.patchValue({
        newCoachLineupGK: this.coachLineup.gk,
        newCoachLineupLB: this.coachLineup.lb,
        newCoachLineupCB: this.coachLineup.cb,
        newCoachLineupRB: this.coachLineup.rb,
        newCoachLineupLWB: this.coachLineup.lwb,
        newCoachLineupCDM: this.coachLineup.cdm,
        newCoachLineupRWB: this.coachLineup.rwb,
        newCoachLineupLM: this.coachLineup.lm,
        newCoachLineupCM: this.coachLineup.cm,
        newCoachLineupRM: this.coachLineup.rm,
        newCoachLineupLW: this.coachLineup.lw,
        newCoachLineupCAM: this.coachLineup.cam,
        newCoachLineupRW: this.coachLineup.rw,
        newCoachLineupST: this.coachLineup.st,
      });
    }
  }

  newCoachLineup() {
    const gk = this.addCoachLineupForm.value.newCoachLineupGK;
    const lb = this.addCoachLineupForm.value.newCoachLineupLB;
    const cb = this.addCoachLineupForm.value.newCoachLineupCB;
    const rb = this.addCoachLineupForm.value.newCoachLineupRB;
    const lwb = this.addCoachLineupForm.value.newCoachLineupLWB;
    const cdm = this.addCoachLineupForm.value.newCoachLineupCDM;
    const rwb = this.addCoachLineupForm.value.newCoachLineupRWB;
    const lm = this.addCoachLineupForm.value.newCoachLineupLM;
    const cm = this.addCoachLineupForm.value.newCoachLineupCM;
    const rm = this.addCoachLineupForm.value.newCoachLineupRM;
    const lw = this.addCoachLineupForm.value.newCoachLineupLW;
    const cam = this.addCoachLineupForm.value.newCoachLineupCAM;
    const rw = this.addCoachLineupForm.value.newCoachLineupRW;
    const st = this.addCoachLineupForm.value.newCoachLineupST;

    if (this.addCoachLineupForm.valid) {
      const newCoachLineup = new CoachLineupDTO(gk!, lb!, cb!, rb!, lwb!, cdm!, rwb!, lm!, cm!, rm!, lw!, cam!, rw!, st!);
      console.log('Dodawanie nowej układu trenera:', newCoachLineup);
      this.eventService.emitEvent('newCoachLineupReply', newCoachLineup);
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.addCoachLineupForm.controls).forEach(key => {
        const control = this.addCoachLineupForm.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }
}
