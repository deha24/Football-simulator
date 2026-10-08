import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubUpdate } from './club-update';

describe('ClubUpdate', () => {
  let component: ClubUpdate;
  let fixture: ComponentFixture<ClubUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
