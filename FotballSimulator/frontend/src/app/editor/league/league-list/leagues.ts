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
export class Leagues implements OnInit {

  loadLeagues(): void {
    this.leagueService.getLeagues().subscribe((data: League[]) => {
      this.leagues = data;
      this.cdr.detectChanges();
    });
  }

  leagues: League[] = [];

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private eventservice: EventService) {
    this.eventservice.getEvent('removedLeague', () => {
      this.loadLeagues();
    });
  }

  ngOnInit() {
    this.loadLeagues();
  }

}
