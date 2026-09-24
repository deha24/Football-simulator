import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerPositionsShow } from './footballer-positions-view';

describe('FootballerPositionsShow', () => {
  let component: FootballerPositionsShow;
  let fixture: ComponentFixture<FootballerPositionsShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerPositionsShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerPositionsShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
