import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsAssignClub } from './clubs-assign-club';

describe('ClubsAssignClub', () => {
  let component: ClubsAssignClub;
  let fixture: ComponentFixture<ClubsAssignClub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsAssignClub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsAssignClub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
