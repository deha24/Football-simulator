import { Component, ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../../../shared/formsImports';
import { EventService } from '../../../../../../shared/services/EventServices';
import { LeagueService } from '../../../leagueService';
import { multipleFirstLeagueLevel } from '../../../league-form-validators';
import { League } from '../../../../../../shared/models/league';

@Component({
  selector: 'league-update',
  imports: [FORMS_IMPORTS],
  templateUrl: './league-update.html',
  styleUrl: './league-update.css',
})
export class LeagueUpdate implements OnInit {
  
  @Input() league!: League;
  @Output() addLeague = new EventEmitter<League>();
  multipleLowerLeaguesLevel: boolean = false;

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private eventService: EventService) {}

  updateLeagueForm!: FormGroup;

  ngOnInit() {
    this.updateLeagueForm = new FormGroup({
      newLeagueName: new FormControl(this.league.name, Validators.required),
      newLeagueLocation: new FormControl(this.league.country, Validators.required),
      newLeagueLevel: new FormControl(this.league.level, Validators.required)
    },
    { asyncValidators: [ multipleFirstLeagueLevel(this.leagueService, this.eventService)] });
  }

  updateLeague() {

    const data: any = {};
    const LeagueName = this.updateLeagueForm.get('newLeagueName')?.value;
    const LeagueLocation = this.updateLeagueForm.get('newLeagueLocation')?.value;
    const LeagueLevel = this.updateLeagueForm.get('newLeagueLevel')?.value;

    if (this.updateLeagueForm.valid) {

      Object.keys(this.updateLeagueForm.controls).forEach(key => {
        const control = this.updateLeagueForm.get(key);
        if (control && control.dirty) {
          if (key === 'newLeagueName') data.name = LeagueName;
          if (key === 'newLeagueLocation') data.country = LeagueLocation;
          if (key === 'newLeagueLevel') data.level = LeagueLevel;
        }
      });

      this.leagueService.updateLeague(this.league.id, data).subscribe(() => {
        this.updateLeagueForm.reset();
        this.eventService.emitEvent('updatedLeague');
      });

    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.updateLeagueForm.controls).forEach(key => {
        const control = this.updateLeagueForm.get(key);
        // if the control is invalid, log the errors
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }
}
