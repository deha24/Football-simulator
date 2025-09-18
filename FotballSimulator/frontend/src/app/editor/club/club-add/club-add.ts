import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClubService } from '../clubService';
import { Club, } from '../../../../shared/models/club';
import { League } from '../../../../shared/models/league';
import { LeagueService } from '../../league/leagueService';

@Component({
  selector: 'app-club-add',
  imports: [ReactiveFormsModule],
  templateUrl: './club-add.html',
  styleUrl: './club-add.css'
})
export class ClubAdd implements OnInit {

  constructor(private clubService: ClubService, protected leagueService: LeagueService, private cdr: ChangeDetectorRef) {}

  leagues: League[] = [];

  ngOnInit() {
    this.leagueService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
      this.cdr.detectChanges();
    });
  }

  addclubform = new FormGroup({
    newClubName: new FormControl('', { validators: [Validators.required] }),
    newClubLocation: new FormControl('', { validators: [Validators.required] }),
    newClubLeague: new FormControl('', { validators: [Validators.required] })
  });

  addNewClub() {
    const clubName = this.addclubform.value.newClubName;
    const clubLocation = this.addclubform.value.newClubLocation;
    const clubLeague = this.addclubform.value.newClubLeague;

    if (this.addclubform.valid) {
      const newClub = new Club(clubName!, clubLocation!, 1888, "Some Stadium", 60000, [], undefined);
      this.clubService.addClub(newClub).subscribe({
        next: () => {
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
