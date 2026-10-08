import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EventService } from '../../../../shared/services/EventServices';
import { LeagueService } from '../leagueService';
import { LeagueDTO } from '../../../../shared/models/league';
import { LeaguesItem } from "./leagues-item/leagues-item";

@Component({
  selector: 'leagues',
  imports: [TableModule, ToastModule, LeaguesItem],
  templateUrl: './leagues.html',
  styleUrl: './leagues.css'
})
export class Leagues implements OnInit {

  leagues: LeagueDTO[] = [];

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

  loadLeagues(): void {
    this.leagueService.getLeagues().subscribe((data: LeagueDTO[]) => {
      this.leagues = data;
      this.cdr.detectChanges();
    });
  }

}
