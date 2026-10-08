import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAdd } from './coach-add';

describe('CoachAdd', () => {
  let component: CoachAdd;
  let fixture: ComponentFixture<CoachAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
