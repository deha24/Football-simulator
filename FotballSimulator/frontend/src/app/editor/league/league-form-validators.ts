import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { League } from '../../../shared/models/league';
import { LeagueService } from "./leagueService";

export function multipleLeaguesLevel(country: string): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const level = control.value
    return level ? { multipleLeaguesLevel: true } : null;
  };
}
