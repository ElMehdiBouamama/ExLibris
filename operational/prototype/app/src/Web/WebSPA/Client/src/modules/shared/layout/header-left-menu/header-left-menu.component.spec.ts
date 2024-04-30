import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLeftMenuComponent } from './header-left-menu.component';

describe('HeaderLeftMenuComponent', () => {
  let component: HeaderLeftMenuComponent;
  let fixture: ComponentFixture<HeaderLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
