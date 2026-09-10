import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersAssignFootballer } from './footballers-assign-footballer';

describe('FootballersAssignFootballer', () => {
  let component: FootballersAssignFootballer;
  let fixture: ComponentFixture<FootballersAssignFootballer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballersAssignFootballer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballersAssignFootballer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
