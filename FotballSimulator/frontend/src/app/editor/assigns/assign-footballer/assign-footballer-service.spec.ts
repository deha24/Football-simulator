import { TestBed } from '@angular/core/testing';

import { AssignFootballerService } from './assign-footballer-service';

describe('AssignFootballerService', () => {
  let service: AssignFootballerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignFootballerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
