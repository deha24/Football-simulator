import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClub } from './assign-club';

describe('AssignClub', () => {
  let component: AssignClub;
  let fixture: ComponentFixture<AssignClub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignClub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignClub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
