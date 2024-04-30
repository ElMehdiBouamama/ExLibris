import { NgModule, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { routing } from './app.routes';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
import { BasketModule } from './basket/basket.module';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './home/home.module';
import { MaterialModule } from './shared/material/material.module';
import { LayoutModule } from './shared/layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EditorModule } from './customization/editor.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HammerModule,
        ToastrModule.forRoot(),
        routing,
        HttpClientModule,
        // Only module that app module loads
        SharedModule.forRoot(),
        CatalogModule,
        EditorModule,
        OrdersModule,
        BasketModule,
        HomeModule,
        MaterialModule,
        LayoutModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        AppService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
