import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachLineupForm } from './coach-lineup-form';

describe('CoachLineupForm', () => {
  let component: CoachLineupForm;
  let fixture: ComponentFixture<CoachLineupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachLineupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachLineupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
