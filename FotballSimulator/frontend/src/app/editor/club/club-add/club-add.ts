import { Component, Output, EventEmitter} from '@angular/core';
import { formatDate } from '@angular/common';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../shared/formsImports';
import { ClubService } from '../clubService';
import { Club, CreateClubDTO } from '../../../../shared/models/club';

@Component({
  selector: 'app-club-add',
  imports: [FORMS_IMPORTS],
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
