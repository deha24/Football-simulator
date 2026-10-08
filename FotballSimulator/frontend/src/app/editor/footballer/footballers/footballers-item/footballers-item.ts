import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from "primeng/dialog";
import { FootballersDTO } from '../../../../../shared/models/footballer';
import { FootballerRemove } from './footballer-remove/footballer-remove';
import { FootballerUpdate } from './footballer-update/footballer-update';


@Component({
  selector: '[footballers-item]',
  imports: [DialogModule, TableModule, ButtonModule, FootballerRemove, FootballerUpdate],
  templateUrl: './footballers-item.html',
  styleUrl: './footballers-item.css'
})
export class FootballersItem {

  @Input() footballer!: FootballersDTO;
  @Input() rowIndex!: number;

  displayEditDialog: boolean = false;
  

  constructor(private router: Router) {}

  openEditDialog(id: number) {
    this.displayEditDialog = true;
  }

  detailsFootballer(id: number) {
    this.router.navigate(['/editor/footballers/details', id]);
  }

}
