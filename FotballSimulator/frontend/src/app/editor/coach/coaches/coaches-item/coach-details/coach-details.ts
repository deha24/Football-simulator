import { Component } from '@angular/core';
import { Coach, CoachLineupDTO } from '../../../../../../shared/models/coach';
import { CoachService } from '../../../coachService';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
//import { FootballerPositionsShow } from '../../footballer-positions-show/footballer-positions-show';

@Component({
  selector: 'coach-details',
  imports: [],
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
      this.cdr.detectChanges();
    });
  }
}
