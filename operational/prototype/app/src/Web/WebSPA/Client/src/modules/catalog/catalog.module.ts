import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';

@NgModule({
    imports: [BrowserModule, SharedModule, CommonModule, BrowserAnimationsModule],
    declarations: [CatalogComponent, CatalogFiltersComponent, CatalogProductComponent, ProductDetailComponent],
    providers: [CatalogService]
})
export class CatalogModule { }
