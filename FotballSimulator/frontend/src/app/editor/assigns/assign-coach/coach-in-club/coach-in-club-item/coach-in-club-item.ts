import { Component, Input } from '@angular/core';
import { Coach } from '../../../../../../shared/models/coach';
import { CoachAssignCoach } from './coach-assign-coach/coach-assign-coach';

@Component({
  selector: '[coach-in-club-item]',
  imports: [CoachAssignCoach],
  templateUrl: './coach-in-club-item.html',
  styleUrl: './coach-in-club-item.css',
})
export class CoachInClubItem {

  @Input() coach!: Coach;

  constructor() {}

}
