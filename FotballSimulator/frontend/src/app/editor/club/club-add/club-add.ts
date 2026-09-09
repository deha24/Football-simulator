import { Component, Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClubService } from '../clubService';
import { CreateClubDTO } from '../../../../shared/models/club';
import { Club } from '../../../../shared/models/club';

@Component({
  selector: 'app-club-add',
  imports: [ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, InputGroupAddonModule, DatePickerModule, CardModule, ButtonModule],
  templateUrl: './club-add.html',
  styleUrl: './club-add.css'
})
export class ClubAdd{

  @Output() addClub = new EventEmitter<Club>();

  constructor(private clubService: ClubService) {}

  addClubForm = new FormGroup({
    newClubName: new FormControl('', { validators: [Validators.required] }),
    newClubLocation: new FormControl('', { validators: [Validators.required] }),
    newClubFoundDate: new FormControl('', { validators: [Validators.required] }),
    newClubStadium: new FormControl('', { validators: [Validators.required] }),
    newClubStadiumCapacity: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(200000)] }),
  });

  addNewClub() {
    const clubName = this.addClubForm.value.newClubName;
    const clubLocation = this.addClubForm.value.newClubLocation;
    const foundDate = formatDate(this.addClubForm.value.newClubFoundDate!, 'yyyy-MM-dd', 'en-US');
    const clubStadium = this.addClubForm.value.newClubStadium;
    const clubStadiumCapacity = this.addClubForm.value.newClubStadiumCapacity;

    if (this.addClubForm.valid) {
      const newClub = new CreateClubDTO(clubName!, clubLocation!, foundDate!, clubStadium!, clubStadiumCapacity!);
      this.clubService.addClub(newClub).subscribe({
        next: () => {
          this.addClubForm.reset();
        },
        error: (err) => {
          console.error('Error adding club:', err);
        }
      });
    } else {
      // Handle form errors if needed
      console.error('Form is invalid', this.addClubForm.errors, clubName, clubLocation, foundDate, clubStadium, clubStadiumCapacity);
    }
  }

}
