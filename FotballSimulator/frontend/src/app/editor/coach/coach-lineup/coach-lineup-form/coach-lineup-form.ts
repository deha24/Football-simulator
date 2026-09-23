import { Component, Input, OnInit} from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../../shared/formsImports';
import { EventService } from '../../../../../shared/services/EventServices';
import { CoachService } from '../../coachService';
import { exactElevenPositionsValidator } from '../coach-lineup-form-validators';
import { CoachLineupDTO } from '../../../../../shared/models/coach';

@Component({
  selector: 'coach-lineup-form',
  imports: [FORMS_IMPORTS],
  templateUrl: './coach-lineup-form.html',
  styleUrl: './coach-lineup-form.css',
})
export class CoachLineupForm implements OnInit{

  @Input() coachLineup!: CoachLineupDTO;
  coachId!: number;

  constructor(private CoachService: CoachService, private eventService: EventService) {}

  addCoachLineupForm = new FormGroup({
    newCoachLineupGK: new FormControl(<null | boolean> true, { }),
    newCoachLineupLB: new FormControl(<null | boolean> false, { }),
    newCoachLineupCB1: new FormControl(<null | boolean> false, { }),
    newCoachLineupCB2: new FormControl(<null | boolean> false, { }),
    newCoachLineupCB3: new FormControl(<null | boolean> false, { }),
    newCoachLineupRB: new FormControl(<null | boolean> false, { }),
    newCoachLineupLWB: new FormControl(<null | boolean> false, { }),
    newCoachLineupCDM1: new FormControl(<null | boolean> false, { }),
    newCoachLineupCDM2: new FormControl(<null | boolean> false, { }),
    newCoachLineupCDM3: new FormControl(<null | boolean> false, { }),
    newCoachLineupRWB: new FormControl(<null | boolean> false, { }),
    newCoachLineupLM: new FormControl(<null | boolean> false, { }),
    newCoachLineupCM1: new FormControl(<null | boolean> false, { }),
    newCoachLineupCM2: new FormControl(<null | boolean> false, { }),
    newCoachLineupCM3: new FormControl(<null | boolean> false, { }),
    newCoachLineupRM: new FormControl(<null | boolean> false, { }),
    newCoachLineupLW: new FormControl(<null | boolean> false, { }),
    newCoachLineupCAM1: new FormControl(<null | boolean> false, { }),
    newCoachLineupCAM2: new FormControl(<null | boolean> false, { }),
    newCoachLineupCAM3: new FormControl(<null | boolean> false, { }),
    newCoachLineupRW: new FormControl(<null | boolean> false, { }),
    newCoachLineupST1: new FormControl(<null | boolean> false, { }),
    newCoachLineupST2: new FormControl(<null | boolean> false, { }),
    newCoachLineupST3: new FormControl(<null | boolean> false, { }),
    },
    { validators: [exactElevenPositionsValidator()]},
  );

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
        newCoachLineupCB1: this.coachLineup.cb1,
        newCoachLineupCB2: this.coachLineup.cb2,
        newCoachLineupCB3: this.coachLineup.cb3,
        newCoachLineupRB: this.coachLineup.rb,
        newCoachLineupLWB: this.coachLineup.lwb,
        newCoachLineupCDM1: this.coachLineup.cdm1,
        newCoachLineupCDM2: this.coachLineup.cdm2,
        newCoachLineupCDM3: this.coachLineup.cdm3,
        newCoachLineupRWB: this.coachLineup.rwb,
        newCoachLineupLM: this.coachLineup.lm,
        newCoachLineupCM1: this.coachLineup.cm1,
        newCoachLineupCM2: this.coachLineup.cm2,
        newCoachLineupCM3: this.coachLineup.cm3,
        newCoachLineupRM: this.coachLineup.rm,
        newCoachLineupLW: this.coachLineup.lw,
        newCoachLineupCAM1: this.coachLineup.cam1,
        newCoachLineupCAM2: this.coachLineup.cam2,
        newCoachLineupCAM3: this.coachLineup.cam3,
        newCoachLineupRW: this.coachLineup.rw,
        newCoachLineupST1: this.coachLineup.st1,
        newCoachLineupST2: this.coachLineup.st2,
        newCoachLineupST3: this.coachLineup.st3,
      });
    }
  }

  newCoachLineup() {
    const lb = this.addCoachLineupForm.value.newCoachLineupLB;
    const cb1 = this.addCoachLineupForm.value.newCoachLineupCB1;
    const cb2 = this.addCoachLineupForm.value.newCoachLineupCB2;
    const cb3 = this.addCoachLineupForm.value.newCoachLineupCB3;
    const rb = this.addCoachLineupForm.value.newCoachLineupRB;
    const lwb = this.addCoachLineupForm.value.newCoachLineupLWB;
    const cdm1 = this.addCoachLineupForm.value.newCoachLineupCDM1;
    const cdm2 = this.addCoachLineupForm.value.newCoachLineupCDM2;
    const cdm3 = this.addCoachLineupForm.value.newCoachLineupCDM3;
    const rwb = this.addCoachLineupForm.value.newCoachLineupRWB;
    const lm = this.addCoachLineupForm.value.newCoachLineupLM;
    const cm1 = this.addCoachLineupForm.value.newCoachLineupCM1;
    const cm2 = this.addCoachLineupForm.value.newCoachLineupCM2;
    const cm3 = this.addCoachLineupForm.value.newCoachLineupCM3;
    const rm = this.addCoachLineupForm.value.newCoachLineupRM;
    const lw = this.addCoachLineupForm.value.newCoachLineupLW;
    const cam1 = this.addCoachLineupForm.value.newCoachLineupCAM1;
    const cam2 = this.addCoachLineupForm.value.newCoachLineupCAM2;
    const cam3 = this.addCoachLineupForm.value.newCoachLineupCAM3;
    const rw = this.addCoachLineupForm.value.newCoachLineupRW;
    const st1 = this.addCoachLineupForm.value.newCoachLineupST1;
    const st2 = this.addCoachLineupForm.value.newCoachLineupST2;
    const st3 = this.addCoachLineupForm.value.newCoachLineupST3;

    if (this.addCoachLineupForm.valid) {
      const newCoachLineup = new CoachLineupDTO(true, lb!, cb1!, cb2!, cb3!, rb!, lwb!, cdm1!, cdm2!, cdm3!, rwb!, lm!, cm1!, cm2!, cm3!, rm!, lw!, cam1!, cam2!, cam3!, rw!, st1!, st2!, st3!);
      console.log('Dodawanie nowej układu trenera:', newCoachLineup);
      this.eventService.emitEvent('newCoachLineupReply', newCoachLineup);
      this.addCoachLineupForm.reset();
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
