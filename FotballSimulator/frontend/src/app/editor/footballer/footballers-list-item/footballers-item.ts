import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Footballer } from '../../../../shared/models/footballer';
import { FootballerRemove } from './footballer-remove/footballer-remove';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: '[footballers-item]',
  imports: [FootballerRemove, TableModule, SelectModule, InputNumberModule, TagModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './footballers-item.html',
  styleUrl: './footballers-item.css'
})
export class FootballersItem {

  @Input() footballer!: Footballer;
  @Input() editing!: boolean;
  @Input() rowIndex!: number;

  constructor(private router: Router) {}

  detailsFootballer(id: number) {
    this.router.navigate(['/editor/footballers/details', id]);
  }

  onRowEditInit(footballer: Footballer) {
        //this.clonedFootballers[footballer.id as string] = { ...footballer };
    }

    onRowEditSave(footballer: Footballer) {
        //if (footballer.price > 0) {
        //    delete this.clonedFootballers[footballer.id as string];
        //} else {
        //    
        //}
    }

    onRowEditCancel(footballer: Footballer, index: number) {
        //this.footballers[index] = this.clonedFootballers[footballer.id as string];
        //delete this.clonedFootballers[footballer.id as string];
    }
}
