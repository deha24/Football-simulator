import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRemove } from './coach-remove';

describe('CoachRemove', () => {
  let component: CoachRemove;
  let fixture: ComponentFixture<CoachRemove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachRemove]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachRemove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
