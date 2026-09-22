import { TestBed } from '@angular/core/testing';

import { AssignFootballerStateService } from './assignFootballerStateService';

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
