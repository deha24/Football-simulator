import { TestBed } from '@angular/core/testing';

import { AssignCoachService } from './assignCoachService';

describe('AssignCoachService', () => {
  let service: AssignCoachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignCoachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
