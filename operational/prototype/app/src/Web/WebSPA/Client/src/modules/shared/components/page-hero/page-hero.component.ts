import { Component, Input, OnInit } from '@angular/core';
import { ICatalogPageHeroImg } from '../../models/catalogPageHero.model';

@Component({
    selector: 'app-page-hero',
    templateUrl: './page-hero.component.html',
    styleUrls: ['./page-hero.component.scss']
})
export class PageHeroComponent implements OnInit {
    @Input() title: string = '';
    @Input() content: string = '';
    @Input() img: ICatalogPageHeroImg = { src: '', alt: '' };
    @Input() btn: string = '';

    ngOnInit() {
    }
}
