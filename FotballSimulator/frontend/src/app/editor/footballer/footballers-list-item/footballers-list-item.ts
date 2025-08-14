import { Component, Input} from '@angular/core';
import { Footballer } from '../../../../shared/models/footballer';
import { Router } from '@angular/router';
import { FootballerRemove } from './footballer-remove/footballer-remove';


@Component({
  selector: 'footballers-list-item',
  imports: [FootballerRemove],
  templateUrl: './footballers-list-item.html',
  styleUrl: './footballers-list-item.css'
})
export class FootballersListItem {

  @Input() footballer!: Footballer;

  constructor(private router: Router) {}

  detailsFootballer(id: number) {
    this.router.navigate(['/editor/footballers/details', id]);
  }
}
