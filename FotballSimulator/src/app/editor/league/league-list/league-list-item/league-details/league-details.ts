import { ChangeDetectorRef, Component } from '@angular/core';
import { League } from '../../../../../../shared/models/league';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../leagueService';

@Component({
  selector: 'league-details',
  imports: [],
  templateUrl: './league-details.html',
  styleUrl: './league-details.css'
})
export class LeagueDetails {

  league!: League;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const leagueId = this.route.snapshot.paramMap.get('id');
    if (leagueId) {
      this.leagueService.getLeagueById(parseInt(leagueId)).subscribe((data: any) => {
        this.league = data[parseInt(leagueId)-1];
        this.cdr.detectChanges();
      });
    }
  }

}
