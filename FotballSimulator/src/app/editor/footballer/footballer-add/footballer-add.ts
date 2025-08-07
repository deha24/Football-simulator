import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footballer } from '../../../../shared/models/footballer';

@Component({
  selector: 'footballer-add',
  imports: [ReactiveFormsModule],
  templateUrl: './footballer-add.html',
  styleUrl: './footballer-add.css'
})
export class FootballerAdd {

  @Output() addFootballer = new EventEmitter<Footballer>();

  constructor() {}

  addfootballerform = new FormGroup({
    newFootballerFirstName: new FormControl('', { validators: [Validators.required] }),
    newFootballerLastname: new FormControl('', { validators: [Validators.required] }),
  });

  addNewFootballer() {
    const firstName = this.addfootballerform.value.newFootballerFirstName;
    const lastName = this.addfootballerform.value.newFootballerLastname;

    if (this.addfootballerform.valid) {
      const newFootballer = new Footballer(firstName!, lastName!);
      this.addFootballer.emit(newFootballer);
      this.addfootballerform.reset();
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
    }
  }
}
