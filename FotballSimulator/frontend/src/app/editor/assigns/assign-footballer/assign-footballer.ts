import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { FootballersInClub } from './footballers-in-club/footballers-in-club';
import { ClubService } from '../../club/clubService';
import { AssignFootballerStateService } from '../assign-footballer/assign-footballer-state-service';
import { Club } from '../../../../shared/models/club';
import { ClubsIds } from '../../../../shared/models/assigns/assignFootballer';

@Component({
  selector: 'assign-footballer',
  imports: [ReactiveFormsModule, FormsModule, CardModule, SelectModule, FootballersInClub],
  templateUrl: './assign-footballer.html',
  styleUrl: './assign-footballer.css',
  providers: [AssignFootballerStateService],
})
export class AssignFootballer implements OnInit {

  clubs: Club[]= [];
  club: Club | undefined;
  club1: Club | undefined;
  club2: Club | undefined;
  tmpClub: Club | undefined;
  currentClubsIds: ClubsIds = { club1Id: 0, club2Id: 0 };

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef, private stateService: AssignFootballerStateService){ }

  ngOnInit(): void {
      this.loadClubs();
      this.club1Listener();
      this.club2Listener();
  }

  pickClub1form = new FormGroup({
    club1Id: new FormControl(2, { }),
  });

  pickClub2form = new FormGroup({
    club2Id: new FormControl(2, { }),
  });

  loadClubs() {
    this.clubService.getClubs().subscribe((data) => {
      this.clubs = data;
      this.cdr.markForCheck();
    });
  }

  club1Listener(){
    this.pickClub1form.get('club1Id')?.valueChanges.subscribe(clubId => {
      if(clubId !== null){
        this.stateService.setClub1(clubId);
        this.clubService.getClubById(clubId).subscribe((data: Club) => {
          this.club1 = data;
          this.cdr.markForCheck();
        });
      }
    });
  }

  club2Listener(){
    this.pickClub2form.get('club2Id')?.valueChanges.subscribe(clubId => {
      if(clubId !== null){
        this.stateService.setClub2(clubId);
        this.clubService.getClubById(clubId).subscribe((data: Club) => {
          this.club2 = data;
          this.cdr.markForCheck();
        });
      }
    });
  }
}