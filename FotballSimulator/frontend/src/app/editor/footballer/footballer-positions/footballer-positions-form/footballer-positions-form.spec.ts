import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerPositions } from './footballer-positions';

describe('FootballerPositions', () => {
  let component: FootballerPositions;
  let fixture: ComponentFixture<FootballerPositions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerPositions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerPositions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
