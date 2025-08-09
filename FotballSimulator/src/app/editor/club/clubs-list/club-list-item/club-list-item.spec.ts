import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubListItem } from './club-list-item';

describe('ClubListItem', () => {
  let component: ClubListItem;
  let fixture: ComponentFixture<ClubListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
