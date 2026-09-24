import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../leagueService';
import { League } from '../../../../../../shared/models/league';

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
        console.log(data);
        this.league = data;
        this.cdr.detectChanges();
      });
    }
  }

}
