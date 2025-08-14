import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersListItem } from './footballers-list-item';

describe('FootballersListItem', () => {
  let component: FootballersListItem;
  let fixture: ComponentFixture<FootballersListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballersListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballersListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
