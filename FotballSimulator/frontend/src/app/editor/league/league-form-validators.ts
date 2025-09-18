import { EventService } from './../../../shared/services/EventServices';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { LeagueService } from "./leagueService";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { League } from '../../../shared/models/league';

export function multipleFirstLeagueLevel(leagueService: LeagueService, EventService: EventService): AsyncValidatorFn  {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const country = control.get('newLeagueLocation')?.value;
    const level = control.get('newLeagueLevel')?.value;

    if (!country || !level) {
      return of(null);
    }
    console.log('Checking for multiple leagues at level:', level, 'in country:', country);
    return leagueService.getLeaguesByCountryByLevel(country, level).pipe(
      map(leagues => {
        if (leagues.length > 0 && level === 1) {
          return { multipleLeaguesLevel: true };
        }
        return null;
      })
    );
  };
}


