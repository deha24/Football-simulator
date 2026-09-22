import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsInLeague } from './clubs-in-league';

describe('ClubsInLeague', () => {
  let component: ClubsInLeague;
  let fixture: ComponentFixture<ClubsInLeague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsInLeague]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsInLeague);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
