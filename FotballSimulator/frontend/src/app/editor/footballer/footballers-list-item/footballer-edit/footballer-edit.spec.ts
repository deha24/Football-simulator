import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerEdit } from './footballer-edit';

describe('FootballerEdit', () => {
  let component: FootballerEdit;
  let fixture: ComponentFixture<FootballerEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
