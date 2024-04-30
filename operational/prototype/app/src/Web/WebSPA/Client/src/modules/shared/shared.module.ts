import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from './layout/layout.module';

// Services
import { DataService } from './services/data.service';
import { BasketWrapperService } from './services/basket.wrapper.service';
import { SecurityService } from './services/security.service';
import { ConfigurationService } from './services/configuration.service';
import { StorageService } from './services/storage.service';
import { SignalrService } from './services/signalr.service';

// Components:
import { Pager } from './components/pager/pager';
import { Header } from './components/header/header';
import { Identity } from './components/identity/identity';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Pipes:
import { UppercasePipe } from './pipes/uppercase.pipe';
import { safeHTMLPipe } from './pipes/safeHTML.pipe';
import { RatingChoiceComponent } from './components/rating-choice/rating-choice.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        // No need to export as these modules don't expose any components/directive etc'
        HttpClientModule,
        HttpClientJsonpModule,
        LayoutModule,
        MaterialModule,
        NgbRatingModule
    ],
    declarations: [
        Pager,
        Header,
        Identity,
        PageNotFoundComponent,
        UppercasePipe,
        safeHTMLPipe,
        RatingChoiceComponent
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        // Providers, Components, directive, pipes
        Pager,
        Header,
        Identity,
        PageNotFoundComponent,
        RatingChoiceComponent,
        UppercasePipe,
        safeHTMLPipe,
        MaterialModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers
                DataService,
                BasketWrapperService,
                SecurityService,
                ConfigurationService,
                StorageService,
                SignalrService
            ]
        };
    }
}
