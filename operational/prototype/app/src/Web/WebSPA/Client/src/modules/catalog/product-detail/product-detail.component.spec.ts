import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, it } from 'node:test';

import { ProductDetailComponent } from './product-detail.component';

describe('CatalogProductDetailsComponent', () => {
  let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ProductDetailComponent]
    });
      fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
