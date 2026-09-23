import { Component, Input ,Output, EventEmitter, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../../../shared/formsImports';
import { ClubService } from '../../../clubService';
import { EventService } from '../../../../../../shared/services/EventServices';
import { Club } from '../../../../../../shared/models/club';

@Component({
  selector: 'club-update',
  imports: [FORMS_IMPORTS],
  templateUrl: './club-update.html',
  styleUrl: './club-update.css'
})
export class ClubUpdate implements OnInit{

  @Input() club!: Club;
  @Output() addClub = new EventEmitter<Club>();
  updateClubForm!: FormGroup;

  constructor(private clubService: ClubService, private eventService: EventService) { }

  ngOnInit() {
    this.updateClubForm = new FormGroup({
    newClubName: new FormControl(this.club.name, { validators: [Validators.required] }),
    newClubLocation: new FormControl(this.club.location, { validators: [Validators.required] }),
    newClubFoundDate: new FormControl(this.club.found_date, { validators: [Validators.required] }),
    newClubStadium: new FormControl(this.club.stadium_name, { validators: [Validators.required] }),
    newClubStadiumCapacity: new FormControl(this.club.stadium_capacity, { validators: [Validators.required, Validators.min(1), Validators.max(200000)] }),
    });
  }

  updateClub() {

    const data: any = {};
    const clubName = this.updateClubForm.value.newClubName;
    const clubLocation = this.updateClubForm.value.newClubLocation;
    const foundDate = formatDate(this.updateClubForm.value.newClubFoundDate!, 'yyyy-MM-dd', 'en-US');
    const clubStadium = this.updateClubForm.value.newClubStadium;
    const clubStadiumCapacity = this.updateClubForm.value.newClubStadiumCapacity;

    if (this.updateClubForm.valid) {

      Object.keys(this.updateClubForm.controls).forEach(key => {
        const control = this.updateClubForm.get(key);
        if (control && control.dirty) {
          if (key === 'newClubName') data.name = clubName;
          if (key === 'newClubLocation') data.location = clubLocation;
          if (key === 'newClubFoundDate') data.found_date = foundDate;
          if (key === 'newClubStadium') data.stadium_name = clubStadium;
          if (key === 'newClubStadiumCapacity') data.stadium_capacity = clubStadiumCapacity;
        }
      });

      this.clubService.updateClub(this.club.id, data).subscribe(() => {
        this.updateClubForm.reset();
        this.eventService.emitEvent('updatedClub');
      });

    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.updateClubForm.controls).forEach(key => {
        const control = this.updateClubForm.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }
}