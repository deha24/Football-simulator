import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCoach } from './assign-coach';

describe('AssignCoach', () => {
  let component: AssignCoach;
  let fixture: ComponentFixture<AssignCoach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCoach]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCoach);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
