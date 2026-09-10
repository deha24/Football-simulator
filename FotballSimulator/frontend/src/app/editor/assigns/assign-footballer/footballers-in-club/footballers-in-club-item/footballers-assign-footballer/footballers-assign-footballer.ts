import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EventService } from '../../../../../../../shared/services/EventServices';
import { AssignFootballerService } from '../../../assignFootballerService';
import { ClubsIds } from '../../../../../../../shared/models/assigns/assignFootballer';
import { Footballer } from '../../../../../../../shared/models/footballer';

@Component({
  selector: 'footballers-assign-footballer',
  imports: [ButtonModule],
  templateUrl: './footballers-assign-footballer.html',
  styleUrl: './footballers-assign-footballer.css',
})
export class FootballersAssignFootballer {

  @Input() footballerId!: number;
  clubsIds!: ClubsIds;

  constructor(private assignFootballerService: AssignFootballerService, private eventService: EventService, private cdr: ChangeDetectorRef){ 

    this.eventService.getEvent('ClubsIdReply', (payload: { club1Id: number, club2Id: number }) => {
      this.clubsIds.club1Id = payload.club1Id;
      this.clubsIds.club2Id = payload.club2Id;
      this.cdr.markForCheck;
    });
  }

  assignNewClub(){
    this.eventService.emitEvent("ClubsIdRequest");

    if(this.clubsIds){
      this.assignFootballerService.assignFootballerToClub(this.footballerId, this.clubsIds);
    }
  }
}
