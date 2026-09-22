import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ClubService } from '../../club/clubService';
import { AssignCoachStateService } from './services/assignCoachStateService';
import { EventService } from '../../../../shared/services/EventServices';
import { Club } from '../../../../shared/models/club';
import { ClubsIds } from '../../../../shared/models/assigns/assignPerson';
import { CoachInClub } from './coach-in-club/coach-in-club';

@Component({
  selector: 'assign-coach',
  imports: [ReactiveFormsModule, FormsModule, CardModule, SelectModule, CoachInClub],
  templateUrl: './assign-coach.html',
  styleUrl: './assign-coach.css',
  providers: [AssignCoachStateService],
})
export class AssignCoach implements OnInit {

  clubs: Club[]= [];
  club: Club | undefined;
  club1: Club | undefined;
  club2: Club | undefined;
  tmpClub: Club | undefined;
  currentClubsIds: ClubsIds = { club1Id: 0, club2Id: 0 };

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef, private stateService: AssignCoachStateService, private eventService: EventService){ }

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