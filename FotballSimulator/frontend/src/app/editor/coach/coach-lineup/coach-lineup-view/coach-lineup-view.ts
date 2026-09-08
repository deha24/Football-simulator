import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CoachLineupDTO } from '../../../../../shared/models/coach';

@Component({
  selector: 'coach-lineup-view',
  imports: [CardModule, PanelModule],
  templateUrl: './coach-lineup-view.html',
  styleUrl: './coach-lineup-view.css',
})
export class CoachLineupView implements OnInit{

  @Input() coachLineup!: CoachLineupDTO;

  ngOnInit(): void {
      console.log("Lienup: ", this.coachLineup)
  }

  isPositionActive(position: boolean){
    return this.coachLineup;
  }



}
