import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersInClub } from './footballers-in-club';

describe('FootballersInClub', () => {
  let component: FootballersInClub;
  let fixture: ComponentFixture<FootballersInClub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballersInClub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballersInClub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
