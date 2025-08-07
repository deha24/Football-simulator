import { FootballersListItem } from './../footballers-list-item/footballers-list-item';
import { Component, Input } from '@angular/core';
import { Footballer } from '../../shared/models/footballer';

@Component({
  selector: 'footballers-list',
  imports: [FootballersListItem],
  templateUrl: './footballers-list.html',
  styleUrl: './footballers-list.css'
})
export class FootballersList {

  @Input() footballers: Footballer[] = [];

}
