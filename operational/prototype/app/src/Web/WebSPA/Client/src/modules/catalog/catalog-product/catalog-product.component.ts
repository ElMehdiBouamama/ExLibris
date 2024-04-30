import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICatalogItem } from '../../shared/models/catalogItem.model';

@Component({
    selector: 'app-catalog-product',
    templateUrl: './catalog-product.component.html',
    styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent {
    @Input() item: ICatalogItem;

    constructor(private router: Router) { }

    goToItem() {
        this.router.navigate(['/catalog/' + this.item.id]);
    }
}
