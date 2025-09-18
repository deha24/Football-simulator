import { Component, ChangeDetectorRef, input, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { LeagueService } from '../leagueService';
import { League } from '../../../../shared/models/league';
import { multipleFirstLeagueLevel } from '../league-form-validators';
import { EventService } from '../../../../shared/services/EventServices';

@Component({
  selector: 'app-league-add',
  imports: [ReactiveFormsModule],
  templateUrl: './league-add.html',
  styleUrl: './league-add.css'
})
export class LeagueAdd {

  multipleLowerLeaguesLevel: boolean = false;

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private eventService: EventService) {
  }

  checkForMultipleLowerLeaguesLevel() {
    const level = this.addLeagueForm.get('newLeagueLevel')?.value;
    const country = this.addLeagueForm.get('newLeagueLocation')?.value;

    this.leagueService.getLeaguesByCountryByLevel(country, level).subscribe(leagues => {
      if (leagues.length > 0 && level > 1) {
        this.multipleLowerLeaguesLevel = true;
        this.cdr.markForCheck();
      }
    });
  }

  addLeagueForm!: FormGroup;

  ngOnInit() {
    this.addLeagueForm = new FormGroup({
    newLeagueName: new FormControl('', Validators.required),
    newLeagueLocation: new FormControl('', Validators.required),
    newLeagueLevel: new FormControl(null, Validators.required)
  }, { asyncValidators: [ multipleFirstLeagueLevel(this.leagueService, this.eventService)] });
}


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
