import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerDetails } from './footballer-details';

describe('FootballerDetails', () => {
  let component: FootballerDetails;
  let fixture: ComponentFixture<FootballerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
