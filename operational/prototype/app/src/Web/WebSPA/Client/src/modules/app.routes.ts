import { Routes, RouterModule } from '@angular/router';

import { BasketComponent } from './basket/basket.component';
import { CatalogComponent } from './catalog/catalog.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { OrdersNewComponent } from './orders/orders-new/orders-new.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './catalog/product-detail/product-detail.component';
import { EditorComponent } from './customization/editor.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'catalog/:id', component: ProductDetailComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/:id', component: OrdersDetailComponent },
    { path: 'order', component: OrdersNewComponent }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: false });
