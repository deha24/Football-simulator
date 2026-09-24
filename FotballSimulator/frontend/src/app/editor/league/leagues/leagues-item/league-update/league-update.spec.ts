import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueUpdate } from './league-update';

describe('LeagueUpdate', () => {
  let component: LeagueUpdate;
  let fixture: ComponentFixture<LeagueUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
