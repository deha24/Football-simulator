import { TestBed } from '@angular/core/testing';

import { AssignClubService } from './assign-club-service';

describe('AssignClubService', () => {
  let service: AssignClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
