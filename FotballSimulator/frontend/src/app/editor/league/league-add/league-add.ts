import { Component, ChangeDetectorRef } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { LeagueService } from '../leagueService';
import { League } from '../../../../shared/models/league';
import { multipleLeaguesLevel } from '../league-form-validators';

@Component({
  selector: 'app-league-add',
  imports: [ReactiveFormsModule],
  templateUrl: './league-add.html',
  styleUrl: './league-add.css'
})
export class LeagueAdd {

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef) { }

  firstdivisionexists: boolean = false;
  lowerdivisionexists: boolean = false;

  addLeagueForm = new FormGroup({
    newLeagueName: new FormControl('', Validators.required),
    newLeagueLocation: new FormControl('', Validators.required),
    newLeagueLevel: new FormControl(null, [Validators.required,])
  });

  addNewLeague() {
    const newLeagueName = this.addLeagueForm.get('newLeagueName')?.value;
    const newLeagueLocation = this.addLeagueForm.get('newLeagueLocation')?.value;
    const newLeagueLevel = this.addLeagueForm.get('newLeagueLevel')?.value;
    if (this.addLeagueForm.valid) {
      const newLeague = new League(4, newLeagueName!, newLeagueLocation!, newLeagueLevel!, []);
      this.leagueService.addLeague(newLeague).subscribe(() => {
        this.addLeagueForm.reset();
      });
    }
  }

}
