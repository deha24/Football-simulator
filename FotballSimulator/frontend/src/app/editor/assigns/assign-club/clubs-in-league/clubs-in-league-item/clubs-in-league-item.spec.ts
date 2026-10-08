import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsInLeagueItem } from './clubs-in-league-item';

describe('ClubsInLeagueItem', () => {
  let component: ClubsInLeagueItem;
  let fixture: ComponentFixture<ClubsInLeagueItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsInLeagueItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsInLeagueItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
