import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footballer } from '../../../../shared/models/footballer';
import { FootballersService } from '../footballersService';

@Component({
  selector: 'footballer-add',
  imports: [ReactiveFormsModule],
  templateUrl: './footballer-add.html',
  styleUrl: './footballer-add.css'
})
export class FootballerAdd {

  @Output() addFootballer = new EventEmitter<Footballer>();

  constructor(private footballersService: FootballersService) {}

  addfootballerform = new FormGroup({
    newFootballerFirstName: new FormControl('', { validators: [Validators.required] }),
    newFootballerLastname: new FormControl('', { validators: [Validators.required] }),
  });

  addNewFootballer() {
    const firstName = this.addfootballerform.value.newFootballerFirstName;
    const lastName = this.addfootballerform.value.newFootballerLastname;

    if (this.addfootballerform.valid) {
      const newFootballer = new Footballer(6,firstName!, lastName!, "cam");
      this.footballersService.addFootballer(newFootballer).subscribe(() => {
      this.addFootballer.emit(newFootballer);
      this.addfootballerform.reset();
      });
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
    }
  }
}
