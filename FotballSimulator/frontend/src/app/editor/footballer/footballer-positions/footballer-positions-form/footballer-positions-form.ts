import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../../shared/formsImports';
import { EventService } from '../../../../../shared/services/EventServices';
import { FootballerPositionsDTO } from '../../../../../shared/models/footballer';

@Component({
  selector: 'footballer-positions-form',
  imports: [FORMS_IMPORTS],
  templateUrl: './footballer-positions-form.html',
  styleUrl: './footballer-positions-form.css',
})
export class FootballerPositionsForm implements OnInit, OnChanges{

  @Input() footballerPositions!: FootballerPositionsDTO;
  footballerId!: number;

  duplicatedControls = [
    'newFootballerPositionST',
    'newFootballerPositionCAM',
    'newFootballerPositionCM',
    'newFootballerPositionCDM',
    'newFootballerPositionCB'
  ];

  constructor() { }

  addfootballerPositionsForm = new FormGroup({
    newFootballerPositionGK: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLB: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCB: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRB: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLWB: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCDM: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRWB: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLM: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCM: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRM: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionLW: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionCAM: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionRW: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    newFootballerPositionST: new FormControl(<null | number> null, { validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
  });

  ngOnInit() {

    this.duplicatedControls.forEach(controlName => {
      this.addfootballerPositionsForm.get(controlName)?.valueChanges.subscribe(value => {
        this.addfootballerPositionsForm.get(controlName)?.patchValue(value, { emitEvent: false });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.footballerPositions) {
      this.addfootballerPositionsForm.patchValue({
        newFootballerPositionGK: this.footballerPositions.gk,
        newFootballerPositionLB: this.footballerPositions.lb,
        newFootballerPositionCB: this.footballerPositions.cb,
        newFootballerPositionRB: this.footballerPositions.rb,
        newFootballerPositionLWB: this.footballerPositions.lwb,
        newFootballerPositionCDM: this.footballerPositions.cdm,
        newFootballerPositionRWB: this.footballerPositions.rwb,
        newFootballerPositionLM: this.footballerPositions.lm,
        newFootballerPositionCM: this.footballerPositions.cm,
        newFootballerPositionRM: this.footballerPositions.rm,
        newFootballerPositionLW: this.footballerPositions.lw,
        newFootballerPositionCAM: this.footballerPositions.cam,
        newFootballerPositionRW: this.footballerPositions.rw,
        newFootballerPositionST: this.footballerPositions.st,
      });
    }
    console.log("otrzymane pozcyje: ", this.footballerPositions)
  }



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
      return newFootballerPositions;
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
      return null;
    }
  }
}
