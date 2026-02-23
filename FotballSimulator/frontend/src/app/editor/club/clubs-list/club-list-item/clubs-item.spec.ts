import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsItem } from './clubs-item';

describe('ClubsItem', () => {
  let component: ClubsItem;
  let fixture: ComponentFixture<ClubsItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
