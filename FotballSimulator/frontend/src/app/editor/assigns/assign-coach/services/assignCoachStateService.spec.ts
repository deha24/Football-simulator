import { TestBed } from '@angular/core/testing';

import { AssignCoachStateService } from './assignCoachStateService';

describe('AssignClubStateService', () => {
  let service: AssignCoachStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignCoachStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
