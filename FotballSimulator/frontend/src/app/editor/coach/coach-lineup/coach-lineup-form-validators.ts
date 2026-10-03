import { EventService } from './../../../../shared/services/EventServices';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CoachService } from "./../coachService";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

export function exactElevenPositionsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const values = Object.values(control.value);
    const selectedCount = values.filter(value => value === true).length;

    if (selectedCount !== 11) {
      return { exactElevenPositions: { currentCount: selectedCount } };
    }

    return null;
  };
}


