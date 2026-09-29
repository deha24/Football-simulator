import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup } from '../../../../shared/formsImports';
import { ClubService } from '../../club/clubService';
import { AssignCoachStateService } from './services/assignCoachStateService';
import { ClubDTO } from '../../../../shared/models/club';
import { ClubsIds } from '../../../../shared/models/assigns/assignPerson';
import { CoachInClub } from './coach-in-club/coach-in-club';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'assign-coach',
  imports: [FORMS_IMPORTS, CoachInClub],
  templateUrl: './assign-coach.html',
  styleUrl: './assign-coach.css',
  providers: [AssignCoachStateService, MessageService],
})
export class AssignCoach implements OnInit {

  clubs: ClubDTO[]= [];
  club: ClubDTO | undefined;
  club1: ClubDTO | undefined;
  club2: ClubDTO | undefined;
  tmpClub: ClubDTO | undefined;
  currentClubsIds: ClubsIds = { club1Id: 0, club2Id: 0 };
  private messageService = inject(MessageService);
  private stateService = inject(AssignCoachStateService);

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef){ }

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
        this.clubService.getClubById(clubId).subscribe((data: ClubDTO) => {
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
        this.clubService.getClubById(clubId).subscribe((data: ClubDTO) => {
          this.club2 = data;
          this.cdr.markForCheck();
        });
      }
    });
  }
}