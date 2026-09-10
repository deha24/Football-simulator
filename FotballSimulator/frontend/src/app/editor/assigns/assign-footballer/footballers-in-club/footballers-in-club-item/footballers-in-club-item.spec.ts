import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersInClubItem } from './footballers-in-club-item';

describe('FootballersInClubItem', () => {
  let component: FootballersInClubItem;
  let fixture: ComponentFixture<FootballersInClubItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballersInClubItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballersInClubItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
