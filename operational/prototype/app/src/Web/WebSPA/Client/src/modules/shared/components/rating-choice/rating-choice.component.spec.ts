import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingChoiceComponent } from './rating-choice.component';

describe('RatingChoiceComponent', () => {
  let component: RatingChoiceComponent;
  let fixture: ComponentFixture<RatingChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingChoiceComponent]
    });
    fixture = TestBed.createComponent(RatingChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
