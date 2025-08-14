import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubRemove } from './club-remove';

describe('ClubRemove', () => {
  let component: ClubRemove;
  let fixture: ComponentFixture<ClubRemove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubRemove]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubRemove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
