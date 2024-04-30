import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFiltersComponent } from './catalog-filters.component';

describe('CatalogFiltersComponent', () => {
  let component: CatalogFiltersComponent;
  let fixture: ComponentFixture<CatalogFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogFiltersComponent]
    });
    fixture = TestBed.createComponent(CatalogFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
