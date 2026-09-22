import { TestBed } from '@angular/core/testing';

import { AssignClubStateService } from './assignClubStateService';

describe('AssignClubStateService', () => {
  let service: AssignClubStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignClubStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
