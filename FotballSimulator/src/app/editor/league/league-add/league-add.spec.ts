import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueAdd } from './league-add';

describe('LeagueAdd', () => {
  let component: LeagueAdd;
  let fixture: ComponentFixture<LeagueAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
