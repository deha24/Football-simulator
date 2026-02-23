import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerRemove } from './footballer-remove';

describe('FootballerRemove', () => {
  let component: FootballerRemove;
  let fixture: ComponentFixture<FootballerRemove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerRemove]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerRemove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
