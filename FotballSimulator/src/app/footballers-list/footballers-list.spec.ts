import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersList } from './footballers-list';

describe('FootballersList', () => {
  let component: FootballersList;
  let fixture: ComponentFixture<FootballersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
