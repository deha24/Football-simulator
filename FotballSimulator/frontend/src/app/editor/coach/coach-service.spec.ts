import { TestBed } from '@angular/core/testing';

import { CoachService } from './coachService';

describe('CoachService', () => {
  let service: CoachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
