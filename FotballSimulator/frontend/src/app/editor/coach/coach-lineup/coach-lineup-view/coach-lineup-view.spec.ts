import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachLineupView } from './coach-lineup-view';

describe('CoachLineupView', () => {
  let component: CoachLineupView;
  let fixture: ComponentFixture<CoachLineupView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachLineupView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachLineupView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
