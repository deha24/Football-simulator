import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from "primeng/dialog";
import { EventService } from '../../../../../shared/services/EventServices';
import { Coach } from '../../../../../shared/models/coach';
import { CoachRemove } from './coach-remove/coach-remove';
import { CoachUpdate } from './coach-update/coach-update';


@Component({
  selector: '[coaches-item]',
  imports: [CoachRemove, CoachUpdate, DialogModule, TableModule, ButtonModule],
  templateUrl: './coaches-item.html',
  styleUrl: './coaches-item.css'
})
export class CoachesItem {

  @Input() coach!: Coach;
  @Input() rowIndex!: number;

  displayEditDialog: boolean = false;
  

  constructor(private router: Router, private eventService: EventService) {}

  openEditDialog(id: number) {
    this.displayEditDialog = true;
  }

  detailsCoach(id: number) {
    this.router.navigate(['/editor/coaches/details', id]);
  }

}
