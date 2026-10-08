import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueRemove } from './league-remove';

describe('LeagueRemove', () => {
  let component: LeagueRemove;
  let fixture: ComponentFixture<LeagueRemove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueRemove]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueRemove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
