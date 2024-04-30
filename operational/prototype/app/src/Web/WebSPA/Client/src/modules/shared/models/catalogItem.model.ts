export interface ICatalogItem {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUri: string;
    catalogBrandId: number;
    catalogBrand: string;
    catalogTypeId: number;
    catalogType: string;
    lines: number;
    dimensions: number[];
    units: number;
}
