import { Component, Input ,Output, EventEmitter, OnInit} from '@angular/core';
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
import { ClubService } from '../../../clubService';
import { CreateClubDTO } from '../../../../../../shared/models/club';
import { Club } from '../../../../../../shared/models/club';
import { EventService } from '../../../../../../shared/services/EventServices';

@Component({
  selector: 'club-update',
  imports: [ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, InputGroupAddonModule, DatePickerModule, CardModule, ButtonModule],
  templateUrl: './club-update.html',
  styleUrl: './club-update.css'
})
export class ClubUpdate implements OnInit{

  @Input() club!: Club;
  @Output() addClub = new EventEmitter<Club>();

  constructor(private clubService: ClubService, private eventService: EventService) {}

  updateClubForm!: FormGroup;
  

  ngOnInit() {
    this.updateClubForm = new FormGroup({
    newClubName: new FormControl(this.club.name, { validators: [Validators.required] }),
    newClubLocation: new FormControl(this.club.location, { validators: [Validators.required] }),
    newClubFoundDate: new FormControl(this.club.foundDate, { validators: [Validators.required] }),
    newClubStadium: new FormControl(this.club.stadium, { validators: [Validators.required] }),
    newClubStadiumCapacity: new FormControl(this.club.capacity, { validators: [Validators.required, Validators.min(1)] }),
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
          if (key === 'newClubStadium') data.stadium = clubStadium;
          if (key === 'newClubStadiumCapacity') data.stadium_capacity = clubStadiumCapacity;
        }
      });

      this.clubService.updateClub(data, this.club.id).subscribe(() => {
        console.log('Club updated successfully', data);
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