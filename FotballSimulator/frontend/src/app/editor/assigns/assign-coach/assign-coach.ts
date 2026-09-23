import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ClubService } from '../../club/clubService';
import { AssignCoachStateService } from './services/assignCoachStateService';
import { Club } from '../../../../shared/models/club';
import { ClubsIds } from '../../../../shared/models/assigns/assignPerson';
import { CoachInClub } from './coach-in-club/coach-in-club';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'assign-coach',
  imports: [ReactiveFormsModule, FormsModule, CardModule, SelectModule, CoachInClub, ToastModule],
  templateUrl: './assign-coach.html',
  styleUrl: './assign-coach.css',
  providers: [AssignCoachStateService, MessageService],
})
export class AssignCoach implements OnInit {

  clubs: Club[]= [];
  club: Club | undefined;
  club1: Club | undefined;
  club2: Club | undefined;
  tmpClub: Club | undefined;
  currentClubsIds: ClubsIds = { club1Id: 0, club2Id: 0 };
  private messageService = inject(MessageService);
  private stateService = inject(AssignCoachStateService);

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
      this.loadClubs();
      this.club1Listener();
      this.club2Listener();
      this.showError();
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

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: 'We couldn’t complete the action. Please try again.' });
  }
}