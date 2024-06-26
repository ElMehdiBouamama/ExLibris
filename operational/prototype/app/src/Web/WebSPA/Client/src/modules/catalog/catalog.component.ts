﻿import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CatalogService } from './catalog.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { ICatalog } from '../shared/models/catalog.model';
import { ICatalogItem } from '../shared/models/catalogItem.model';
import { ICatalogType } from '../shared/models/catalogType.model';
import { ICatalogBrand } from '../shared/models/catalogBrand.model';
import { IPager } from '../shared/models/pager.model';
import { BasketWrapperService } from '../shared/services/basket.wrapper.service';
import { SecurityService } from '../shared/services/security.service';
import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeInUp } from 'ng-animate';

@Component({
    selector: 'esh-catalog .esh-catalog .mb-5',
    styleUrls: ['./catalog.component.scss'],
    templateUrl: './catalog.component.html',
    animations: [
        trigger('stagger', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0 }),
                    stagger(50, [
                        useAnimation(fadeInUp, { params: { timing: .3, fromOpacity: 0, toOpacity: 1, a: '10px', b: '0px' } })
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class CatalogComponent implements OnInit {
    brands: ICatalogBrand[];
    types: ICatalogType[];
    catalog: ICatalog;
    brandSelected: number;
    typeSelected: number;
    paginationInfo: IPager;
    authenticated: boolean = false;
    authSubscription: Subscription;
    errorReceived: boolean;

    constructor(private service: CatalogService, private basketService: BasketWrapperService, private configurationService: ConfigurationService, private securityService: SecurityService) {
        this.authenticated = securityService.IsAuthorized;
        this.catalog = {
            count: 1,
            data: Array(20).fill('').map(() =>
            ({
                catalogBrand: 'Trodat',
                catalogBrandId: 1,
                catalogType: 'Customized Stamp',
                catalogTypeId: 1,
                description: 'Tampon à plaque texte',
                id: 1,
                name: 'Printy 4912',
                pictureUri: '/assets/shop/Trodat_4912.png',
                price: 140.00,
                dimensions: [47, 18],
                lines: 4,
                units: 1
            })
            ),
            pageIndex: 0,
            pageSize: 1
        }
    }

    ngOnInit() {
        // Configuration Settings:
        if (this.configurationService.isReady)
            this.loadData();
        else
            this.configurationService.settingsLoaded$.subscribe(x => this.loadData());

        // Subscribe to login and logout observable
        this.authSubscription = this.securityService.authenticationChallenge$.subscribe(res => {
            this.authenticated = res;
        });
    }

    loadData() {
        this.getBrands();
        //this.getCatalog(12, 0);
        //this.getTypes();
    }

    onFilterApplied(event: any) {
        event.preventDefault();

        this.brandSelected = this.brandSelected && this.brandSelected.toString() != "null" ? this.brandSelected : null;
        this.typeSelected = this.typeSelected && this.typeSelected.toString() != "null" ? this.typeSelected : null;
        this.paginationInfo.actualPage = 0;
        this.getCatalog(this.paginationInfo.itemsPage, this.paginationInfo.actualPage, this.brandSelected, this.typeSelected);
    }

    onBrandFilterChanged(event: any, value: number) {
        event.preventDefault();
        this.brandSelected = value;
    }

    onTypeFilterChanged(event: any, value: number) {
        event.preventDefault();
        this.typeSelected = value;
    }

    onPageChanged(value: any) {
        console.log('catalog pager event fired' + value);
        event.preventDefault();
        this.paginationInfo.actualPage = value;
        this.getCatalog(this.paginationInfo.itemsPage, value);
    }

    addToCart(item: ICatalogItem) {
        if (!this.authenticated) {
            return;
        }
        this.basketService.addItemToBasket(item);
    }

    getCatalog(pageSize: number, pageIndex: number, brand?: number, type?: number) {
        this.errorReceived = false;
        this.service.getCatalog(pageIndex, pageSize, brand, type)
            .pipe(catchError((err) => this.handleError(err)))
            .subscribe(catalog => {
                this.catalog = catalog;
                this.paginationInfo = {
                    actualPage: catalog.pageIndex,
                    itemsPage: catalog.pageSize,
                    totalItems: catalog.count,
                    totalPages: Math.ceil(catalog.count / catalog.pageSize),
                    items: catalog.pageSize
                };
            });
    }

    getTypes() {
        this.service.getTypes().subscribe(types => {
            this.types = types;
            let alltypes = { id: null, type: 'All' };
            this.types.unshift(alltypes);
        });
    }

    getBrands() {
        this.service.getBrands().subscribe(brands => {
            this.brands = brands;
            let allBrands = { id: null, name: 'All' };
            this.brands.unshift(allBrands);
        });
    }

    private handleError(error: any) {
        this.errorReceived = true;
        return throwError(() => new Error(error));
    }
}

