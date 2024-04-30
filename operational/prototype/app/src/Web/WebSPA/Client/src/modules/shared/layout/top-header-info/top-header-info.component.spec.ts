import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderInfoComponent } from './top-header-info.component';

describe('TopNavInfoComponent', () => {
  let component: TopHeaderInfoComponent;
  let fixture: ComponentFixture<TopHeaderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopHeaderInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
