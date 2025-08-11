import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueListItem } from './league-list-item';

describe('LeagueListItem', () => {
  let component: LeagueListItem;
  let fixture: ComponentFixture<LeagueListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
