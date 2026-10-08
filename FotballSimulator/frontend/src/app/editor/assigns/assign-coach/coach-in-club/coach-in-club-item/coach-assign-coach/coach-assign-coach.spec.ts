import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAssignCoach } from './coach-assign-coach';

describe('CoachAssignCoach', () => {
  let component: CoachAssignCoach;
  let fixture: ComponentFixture<CoachAssignCoach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAssignCoach]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachAssignCoach);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
