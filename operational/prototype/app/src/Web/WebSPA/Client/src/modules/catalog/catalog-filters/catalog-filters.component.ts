import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog-filters',
  templateUrl: './catalog-filters.component.html',
  styleUrls: ['./catalog-filters.component.scss']
})
export class CatalogFiltersComponent {
    filters: { name: string, selected: boolean }[];

    activeChips: boolean[];

    constructor() {
        this.filters = [
            { name: "Trodat", selected: false},
            { name: "Colop", selected: false},
            { name: "Shiny", selected: false}
        ]
    }

}
