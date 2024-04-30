import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICatalogItem } from '../../shared/models/catalogItem.model';
import { CatalogService } from '../catalog.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    item$: Observable<ICatalogItem>;
    stampColor: string = "Flamered";
    public get stampURL(): SafeResourceUrl {
        let url = "http://360grad.trodat.net/360G_Content/Printy_360G_Images/Printy_Textstamp/4912_Printy_360G/NM_4912_Printy_360G_" + this.stampColor + "/NM_4912_Printy_360G_" + this.stampColor + ".html";
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    inkColor: string;

    constructor(private route: ActivatedRoute, private service: CatalogService, public sanitizer: DomSanitizer) { }

    ngOnInit() {
        const itemId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.item$ = this.service.getProduct(itemId);
        this.item$.subscribe();
    }
}
