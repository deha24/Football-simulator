import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachService } from '../../../coachService';
import { Coach, CoachLineupDTO } from '../../../../../../shared/models/coach';
import { CoachLineupView } from '../../../coach-lineup/coach-lineup-view/coach-lineup-view';

@Component({
  selector: 'coach-details',
  imports: [CoachLineupView],
  templateUrl: './coach-details.html',
  styleUrl: './coach-details.css'
})
export class CoachDetails {

  coach!: Coach;
  coachLineup!: CoachLineupDTO;

  constructor(private coachesService: CoachService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.coachesService.getCoachById(parseInt(id)).subscribe((data: any) => {
      console.log('Coach data:', data);
      this.coach = data;
      this.coachLineup = data.lineup;
      console.log("Coach Lineup", this.coachLineup);
      this.cdr.detectChanges();
    });
  }
}
