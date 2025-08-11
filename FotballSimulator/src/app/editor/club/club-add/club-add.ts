import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClubService } from '../clubService';
import { Club } from '../../../../shared/models/club';``
@Component({
  selector: 'app-club-add',
  imports: [ReactiveFormsModule],
  templateUrl: './club-add.html',
  styleUrl: './club-add.css'
})
export class ClubAdd {

  constructor(private clubService: ClubService) {}

  addclubform = new FormGroup({
    newClubName: new FormControl('', { validators: [Validators.required] }),
    newClubLocation: new FormControl('', { validators: [Validators.required] }),
  });

  addNewClub() {
    const clubName = this.addclubform.value.newClubName;
    const clubLocation = this.addclubform.value.newClubLocation;

    if (this.addclubform.valid) {
      const newClub = new Club(12, clubName!, clubLocation!, 1888, "Some Stadium", 60000, []);
      this.clubService.addClub(newClub).subscribe({
        next: () => {
          console.log(`New Club Added: ${clubName}, Location: ${clubLocation}`);
          this.addclubform.reset();
        },
        error: (err) => {
          console.error('Error adding club:', err);
        }
      });
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
    }
  }

}
