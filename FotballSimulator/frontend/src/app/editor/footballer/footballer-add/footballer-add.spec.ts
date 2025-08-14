import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerAdd } from './footballer-add';

describe('FootballerAdd', () => {
  let component: FootballerAdd;
  let fixture: ComponentFixture<FootballerAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
