import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAdd } from './club-add';

describe('ClubAdd', () => {
  let component: ClubAdd;
  let fixture: ComponentFixture<ClubAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
