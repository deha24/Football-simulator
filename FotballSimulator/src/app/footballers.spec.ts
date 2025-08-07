import { FootballersService } from './footballersService';
import { TestBed } from '@angular/core/testing';

describe('FootballersService', () => {
  let service: FootballersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
