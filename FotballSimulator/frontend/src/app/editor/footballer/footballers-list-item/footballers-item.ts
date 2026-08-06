import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import {DialogModule} from "primeng/dialog";
import { Footballer } from '../../../../shared/models/footballer';
import { FootballerRemove } from './footballer-remove/footballer-remove';
import { FootballerUpdate } from './footballer-update/footballer-update';


@Component({
  selector: '[footballers-item]',
  imports: [FootballerRemove, FootballerUpdate, DialogModule, TableModule, SelectModule, InputNumberModule, TagModule, ButtonModule, InputTextModule, FormsModule, DatePickerModule],
  templateUrl: './footballers-item.html',
  styleUrl: './footballers-item.css'
})
export class FootballersItem {

  @Input() footballer!: Footballer;
  @Input() rowIndex!: number;

  displayEditDialog: boolean = false;
  

  constructor(private router: Router) {}

  openEditDialog() {
    this.displayEditDialog = true;
  }

  detailsFootballer(id: number) {
    this.router.navigate(['/editor/footballers/details', id]);
  }

}
