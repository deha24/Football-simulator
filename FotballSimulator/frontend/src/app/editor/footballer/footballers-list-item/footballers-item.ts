import { Component, Input} from '@angular/core';
import { Footballer } from '../../../../shared/models/footballer';
import { Router } from '@angular/router';
import { FootballerRemove } from './footballer-remove/footballer-remove';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'footballers-item',
  imports: [FootballerRemove, TableModule],
  templateUrl: './footballers-item.html',
  styleUrl: './footballers-item.css'
})
export class FootballersItem {

  @Input() footballer!: Footballer;

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
