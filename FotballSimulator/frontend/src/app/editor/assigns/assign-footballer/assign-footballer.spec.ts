import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFootballer } from './assign-footballer';

describe('AssignFootballer', () => {
  let component: AssignFootballer;
  let fixture: ComponentFixture<AssignFootballer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignFootballer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFootballer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
