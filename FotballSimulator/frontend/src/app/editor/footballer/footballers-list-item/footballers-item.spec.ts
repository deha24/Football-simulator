import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersItem } from './footballers-item';

describe('FootballersItem', () => {
  let component: FootballersItem;
  let fixture: ComponentFixture<FootballersItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballersItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballersItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
