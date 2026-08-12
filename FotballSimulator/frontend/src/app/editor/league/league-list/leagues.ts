import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../../../shared/services/EventServices';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table'; 
import { LeagueService } from '../leagueService';
import { League } from '../../../../shared/models/league';
import { LeaguesItem } from "./league-list-item/leagues-item";

@Component({
  selector: 'leagues',
  imports: [LeaguesItem, TableModule],
  templateUrl: './leagues.html',
  styleUrl: './leagues.css'
})
export class Leagues implements OnInit {

  leagues: League[] = [];

  loadLeagues(): void {
    this.leagueService.getLeagues().subscribe((data: League[]) => {
      this.leagues = data;
      this.cdr.detectChanges();
    });
  }

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private eventservice: EventService) {
    this.eventservice.getEvent('removedLeague', () => {
      this.loadLeagues();
    });
    this.eventservice.getEvent('updatedLeague', () => {
      this.loadLeagues();
    });
  }

  ngOnInit() {
    this.loadLeagues();
  }

}
