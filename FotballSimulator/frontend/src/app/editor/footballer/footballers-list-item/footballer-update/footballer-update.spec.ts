import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerUpdate } from './footballer-update';

describe('FootballerUpdate', () => {
  let component: FootballerUpdate;
  let fixture: ComponentFixture<FootballerUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
