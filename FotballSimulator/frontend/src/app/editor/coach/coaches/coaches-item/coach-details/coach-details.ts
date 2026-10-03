import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachService } from '../../../coachService';
import { CoachDetailsDTO, CoachLineupDTO } from '../../../../../../shared/models/coach';
import { CoachLineupView } from '../../../coach-lineup/coach-lineup-view/coach-lineup-view';

@Component({
  selector: 'coach-details',
  imports: [CoachLineupView],
  templateUrl: './coach-details.html',
  styleUrl: './coach-details.css'
})
export class CoachDetails {

  coach!: CoachDetailsDTO;
  coachLineup!: CoachLineupDTO;

  constructor(private coachesService: CoachService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.coachesService.getCoachById(parseInt(id)).subscribe((data: CoachDetailsDTO) => {
      this.coach = data;
      this.coachLineup = data.lineup;
      this.cdr.detectChanges();
    });
  }
}
