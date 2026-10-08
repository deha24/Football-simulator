import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CoachLineupDTO } from '../../../../../shared/models/coach';

@Component({
  selector: 'coach-lineup-view',
  imports: [CardModule, PanelModule],
  templateUrl: './coach-lineup-view.html',
  styleUrl: './coach-lineup-view.css',
})
export class CoachLineupView{

  @Input() coachLineup!: CoachLineupDTO;

  isPositionActive(position: boolean){
    return this.coachLineup;
  }



}
