import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup } from '../../../../shared/formsImports';
import { LeagueService } from '../../league/leagueService';
import { AssignClubStateService } from './services/assignClubStateService';
import { ClubsInLeague } from './clubs-in-league/clubs-in-league';
import { League } from '../../../../shared/models/league';
import { LeaguesIds } from '../../../../shared/models/assigns/assignClub';

@Component({
  selector: 'assign-club',
  imports: [FORMS_IMPORTS, ClubsInLeague],
  templateUrl: './assign-club.html',
  styleUrl: './assign-club.css',
  providers: [AssignClubStateService],
})
export class AssignClub implements OnInit {

  leagues: League[]= [];
  league: League | undefined;
  league1: League | undefined;
  league2: League | undefined;
  tmpleague: League | undefined;
  currentleaguesIds: LeaguesIds = { league1Id: 0, league2Id: 0 };

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private stateService: AssignClubStateService){ }

  ngOnInit(): void {
      this.loadLeagues();
      this.league1Listener();
      this.league2Listener();
  }

  pickLeague1form = new FormGroup({
    league1Id: new FormControl(2, { }),
  });

  pickLeague2form = new FormGroup({
    league2Id: new FormControl(2, { }),
  });

  loadLeagues() {
    this.leagueService.getLeagues().subscribe((data) => {
      this.leagues = data;
      this.cdr.markForCheck();
    });
  }

  league1Listener(){
    this.pickLeague1form.get('league1Id')?.valueChanges.subscribe(leagueId => {
      if(leagueId !== null){
        this.stateService.setLeague1(leagueId);
        this.leagueService.getLeagueById(leagueId).subscribe((data: League) => {
          this.league1 = data;
          this.cdr.markForCheck();
        });
      }
    });
  }

  league2Listener(){
    this.pickLeague2form.get('league2Id')?.valueChanges.subscribe(leagueId => {
      if(leagueId !== null){
        this.stateService.setLeague2(leagueId);
        this.leagueService.getLeagueById(leagueId).subscribe((data: League) => {
          this.league2 = data;
          this.cdr.markForCheck();
        });
      }
    });
  }
}