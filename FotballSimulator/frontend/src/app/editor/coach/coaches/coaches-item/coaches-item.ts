import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from "primeng/dialog";
import { EventService } from '../../../../../shared/services/EventServices';
import { CoachesDTO } from '../../../../../shared/models/coach';
import { CoachRemove } from './coach-remove/coach-remove';
import { CoachUpdate } from './coach-update/coach-update';


@Component({
  selector: '[coaches-item]',
  imports: [DialogModule, TableModule, ButtonModule, CoachRemove, CoachUpdate],
  templateUrl: './coaches-item.html',
  styleUrl: './coaches-item.css'
})
export class CoachesItem {

  @Input() coach!: CoachesDTO;
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
