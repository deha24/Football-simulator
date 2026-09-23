import { Component, ChangeDetectorRef } from '@angular/core';
import { FORMS_IMPORTS, FormControl, FormGroup, Validators } from '../../../../shared/formsImports';
import { EventService } from '../../../../shared/services/EventServices';
import { LeagueService } from '../leagueService';
import { NotificationService } from '../../../../shared/services/NotificationService';
import { CreateLeagueDTO } from '../../../../shared/models/league';
import { multipleFirstLeagueLevel } from '../league-form-validators';

@Component({
  selector: 'app-league-add',
  imports: [FORMS_IMPORTS],                           
  templateUrl: './league-add.html',
  styleUrl: './league-add.css'
})
export class LeagueAdd {

  multipleLowerLeaguesLevel: boolean = false;

  constructor(private leagueService: LeagueService, private cdr: ChangeDetectorRef, private eventService: EventService, private notificationService: NotificationService) {
  }

  checkForMultipleLowerLeaguesLevel() {
    const level = this.addLeagueForm.get('newLeagueLevel')?.value;
    const country = this.addLeagueForm.get('newLeagueLocation')?.value;

    this.leagueService.getLeaguesByCountryByLevel(country, level).subscribe(leagues => {
      if (leagues.length > 0 && level > 1) {
        this.multipleLowerLeaguesLevel = true;
        this.cdr.markForCheck();
      }else {
        this.multipleLowerLeaguesLevel = false;
        this.cdr.markForCheck();
      }
    });
  }

  addLeagueForm!: FormGroup;

  ngOnInit() {
      this.addLeagueForm = new FormGroup({
        newLeagueName: new FormControl('', Validators.required),
        newLeagueLocation: new FormControl('', Validators.required),
        newLeagueLevel: new FormControl(null, Validators.required,)
      },
      { asyncValidators: [ multipleFirstLeagueLevel(this.leagueService, this.eventService)] });
  }

  addNewLeague() {
    const newLeagueName = this.addLeagueForm.get('newLeagueName')?.value;
    const newLeagueLocation = this.addLeagueForm.get('newLeagueLocation')?.value;
    const newLeagueLevel = this.addLeagueForm.get('newLeagueLevel')?.value;

    if (this.addLeagueForm.valid) {
      const newLeague = new CreateLeagueDTO(newLeagueName!, newLeagueLocation!, newLeagueLevel!);

      this.leagueService.addLeague(newLeague).subscribe(() => {
        this.notificationService.showSuccess('League Added');
        this.addLeagueForm.reset();
      });
    }else{
      this.notificationService.showError();
    }
  }
}
