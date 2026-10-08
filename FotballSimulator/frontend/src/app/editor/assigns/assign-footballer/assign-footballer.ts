import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup } from '../../../../shared/formsImports';
import { ClubService } from '../../club/clubService';
import { AssignFootballerStateService } from './services/assignFootballerStateService';
import { ClubDTO } from '../../../../shared/models/club';
import { ClubsIds } from '../../../../shared/models/assigns/assignPerson';
import { FootballersInClub } from './footballers-in-club/footballers-in-club';

@Component({
  selector: 'assign-footballer',
  imports: [FORMS_IMPORTS, FootballersInClub],
  templateUrl: './assign-footballer.html',
  styleUrl: './assign-footballer.css',
  providers: [AssignFootballerStateService],
})

export class AssignFootballer implements OnInit {

  clubs: ClubDTO[]= [];
  club: ClubDTO | undefined;
  club1: ClubDTO | undefined;
  club2: ClubDTO | undefined;
  tmpClub: ClubDTO | undefined;
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