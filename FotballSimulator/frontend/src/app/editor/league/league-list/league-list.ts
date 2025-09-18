import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LeagueService } from '../leagueService';
import { League } from '../../../../shared/models/league';
import { EventService } from '../../../../shared/services/EventServices';
import { LeaguesItem } from "./league-list-item/leagues-item";

@Component({
  selector: 'leagues',
  imports: [LeaguesItem],
  templateUrl: './leagues.html',
  styleUrl: './leagues.css'
})
export class LeagueList implements OnInit {

  leagues: League[] = [];

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private eventservice: EventService) {
    this.eventservice.getEvent('removeLeague', (league: League) => {
      this.leagues = this.leagues.filter(item => item !== league);
    });
  }

  ngOnInit() {
    this.leagueService.getLeagues().subscribe((data: League[]) => {
      this.leagues = data;
      this.cdr.detectChanges();
    });
  }

}
