import { Injectable } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { ICatalog } from '../shared/models/catalog.model';
import { ICatalogBrand } from '../shared/models/catalogBrand.model';
import { ICatalogType } from '../shared/models/catalogType.model';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../shared/services/storage.service';
import { ICatalogItem } from '../shared/models/catalogItem.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CatalogService {
    private catalogUrl: string = '';
    private brandUrl: string = '';
    private typesUrl: string = '';

    constructor(private service: DataService, private configurationService: ConfigurationService, private storageService: StorageService) {
        if (this.configurationService.isReady) {
            this.catalogUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/items';
            this.brandUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/brands';
            this.typesUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/catalogtypes';
        } else {
            configurationService.settingsLoaded$.subscribe(_ => {
                this.catalogUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/items';
                this.brandUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/brands';
                this.typesUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/catalogtypes';
            })
        }
    }

    getCatalog(pageIndex: number, pageSize: number, brand: number, type: number): Observable<ICatalog> {
        let url = this.catalogUrl;

        if (type) {
            url = this.catalogUrl + '/type/' + type.toString() + '/brand/' + ((brand) ? brand.toString() : '');
        }
        else if (brand) {
            url = this.catalogUrl + '/type/all' + '/brand/' + ((brand) ? brand.toString() : '');
        }

        url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

        return this.service.get(url).pipe<ICatalog>(tap((response: any) => {
            return response;
        }));
    }

    getProduct(id: number): Observable<ICatalogItem> {
        let url = this.catalogUrl;

        if (environment.production) {
            return this.service.get(url).pipe<ICatalogItem>(tap((response: any) => {
                return response;
            }));
        }
        else {
            return new Observable<ICatalogItem>(observer => {
                observer.next({
                    catalogBrand: 'Trodat',
                    catalogBrandId: 1,
                    catalogType: 'Customized Stamp',
                    catalogTypeId: 1,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor phasellus tempus lobortis urna amet, vel id.',
                    id: 1,
                    name: 'Printy 4912',
                    pictureUri: '/assets/shop/Trodat_4912.png',
                    price: 140.00,
                    dimensions: [47, 18],
                    lines: 4,
                    units: 1
                });
                observer.complete();
            });
        }
    }

    getBrands(): Observable<ICatalogBrand[]> {
        return this.service.get(this.brandUrl).pipe<ICatalogBrand[]>(tap((response: any) => {
            return response;
        }));
    }

    getTypes(): Observable<ICatalogType[]> {
        return this.service.get(this.typesUrl).pipe<ICatalogType[]>(tap((response: any) => {
            return response;
        }));
    };
}
