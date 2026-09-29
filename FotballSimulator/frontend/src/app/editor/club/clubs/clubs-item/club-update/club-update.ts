import { Component, Input ,Output, EventEmitter, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../../../shared/formsImports';
import { EventService } from '../../../../../../shared/services/EventServices';
import { NotificationService } from '../../../../../../shared/services/NotificationService';
import { ClubService } from '../../../clubService';
import { ClubDTO } from '../../../../../../shared/models/club';

@Component({
  selector: 'club-update',
  imports: [FORMS_IMPORTS],
  templateUrl: './club-update.html',
  styleUrl: './club-update.css'
})
export class ClubUpdate implements OnInit{

  @Input() club!: ClubDTO;
  @Output() addClub = new EventEmitter<ClubDTO>();
  updateClubForm!: FormGroup;

  constructor(private clubService: ClubService, private eventService: EventService, private notificationService: NotificationService) { }

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
        this.notificationService.showSuccess('Club Updated');
        this.eventService.emitEvent('updatedClub');
        this.updateClubForm.reset();
      });

    } else {
      // Handle form errors if needed
      this.notificationService.showError();
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