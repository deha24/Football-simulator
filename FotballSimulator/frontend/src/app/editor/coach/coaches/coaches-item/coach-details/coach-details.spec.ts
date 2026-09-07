import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachDetails } from './coach-details';

describe('CoachDetails', () => {
  let component: CoachDetails;
  let fixture: ComponentFixture<CoachDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
