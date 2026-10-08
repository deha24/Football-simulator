import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachInClubItem } from './coach-in-club-item';

describe('CoachInClubItem', () => {
  let component: CoachInClubItem;
  let fixture: ComponentFixture<CoachInClubItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachInClubItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachInClubItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
