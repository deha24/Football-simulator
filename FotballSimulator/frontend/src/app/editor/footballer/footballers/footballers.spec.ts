import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footballers } from './footballers';

describe('Footballers', () => {
  let component: Footballers;
  let fixture: ComponentFixture<Footballers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footballers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footballers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
