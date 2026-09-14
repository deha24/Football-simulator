import { TestBed } from '@angular/core/testing';

import { AssignFootballerStateService } from './assign-footballer-state-service';

describe('AssignFootballerStateService', () => {
  let service: AssignFootballerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignFootballerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
