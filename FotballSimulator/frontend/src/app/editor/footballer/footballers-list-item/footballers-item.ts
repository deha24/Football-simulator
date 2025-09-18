import { Component, Input} from '@angular/core';
import { Footballer } from '../../../../shared/models/footballer';
import { Router } from '@angular/router';
import { FootballerRemove } from './footballer-remove/footballer-remove';


@Component({
  selector: 'footballers-item',
  imports: [FootballerRemove],
  templateUrl: './footballers-item.html',
  styleUrl: './footballers-item.css'
})
export class FootballersItem {

  @Input() footballer!: Footballer;

  constructor(private router: Router) {}

  detailsFootballer(id: number) {
    this.router.navigate(['/editor/footballers/details', id]);
  }
}
