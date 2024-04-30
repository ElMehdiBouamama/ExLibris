import { Title } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { SecurityService } from './shared/services/security.service';
import { ConfigurationService } from './shared/services/configuration.service';
import { SignalrService } from './shared/services/signalr.service';
import { ToastrService } from 'ngx-toastr';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'esh-app',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
    Authenticated: boolean = false;
    subscription: Subscription;
    showSplash: boolean = true; //Show or hide splash screen
    toggled = false;
    title = 'app';
    @ViewChild(MatSidenav) sideNavEl: MatSidenav;
    @ViewChild(MatSidenavContainer) sideNavContainerEl: MatSidenavContainer;
    @ViewChild("splashScreen") splashScreen: ElementRef;

    constructor(private titleService: Title,
        public router: Router,
        private securityService: SecurityService,
        private configurationService: ConfigurationService,
        private signalrService: SignalrService,
        private toastr: ToastrService,
        vcr: ViewContainerRef
    ) {
        // TODO: Set Taster Root (Overlay) container
        //this.toastr.setRootViewContainerRef(vcr);
        this.Authenticated = this.securityService.IsAuthorized;
    }

    ngOnInit() {
        this.subscription = this.securityService.authenticationChallenge$.subscribe(res => this.Authenticated = res);
        //Get configuration from server environment variables:
        this.configurationService.load();
    }

    ngAfterViewInit() {
        setTimeout(_ => this.showSplash = false, 1000);
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle('Exlibris');
    }

    public onMenuToggled() {
        this.sideNavEl.toggle();
    }
}