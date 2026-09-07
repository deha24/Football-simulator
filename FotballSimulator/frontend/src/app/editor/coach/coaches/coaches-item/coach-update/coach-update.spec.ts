import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachUpdate } from './coach-update';

describe('CoachUpdate', () => {
  let component: CoachUpdate;
  let fixture: ComponentFixture<CoachUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
