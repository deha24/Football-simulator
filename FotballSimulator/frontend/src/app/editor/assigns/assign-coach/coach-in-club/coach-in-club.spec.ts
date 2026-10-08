import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachInClub } from './coach-in-club';

describe('CoachInClub', () => {
  let component: CoachInClub;
  let fixture: ComponentFixture<CoachInClub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachInClub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachInClub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
