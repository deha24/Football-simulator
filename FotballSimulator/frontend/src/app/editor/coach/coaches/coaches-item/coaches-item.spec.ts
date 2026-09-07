import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesItem } from './coaches-item';

describe('CoachesItem', () => {
  let component: CoachesItem;
  let fixture: ComponentFixture<CoachesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachesItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachesItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
