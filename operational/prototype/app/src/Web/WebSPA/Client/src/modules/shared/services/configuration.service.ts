import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from "../../../environments/environment";
import { IConfiguration } from '../models/configuration.model';
import { StorageService } from './storage.service';


@Injectable()
export class ConfigurationService {
    serverSettings: IConfiguration;
    // observable that is fired when settings are loaded from server
    private settingsLoadedSource = new Subject <IConfiguration>();
    settingsLoaded$ = this.settingsLoadedSource.asObservable();
    isReady: boolean = false;

    constructor(private http: HttpClient, private storageService: StorageService) { }
    
    load() {
        const baseURI = (!environment.production) ? environment.serverURI : document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        let url = `${baseURI}Home/Configuration`;
        this.http.get(url).subscribe((response: IConfiguration) => {
            this.serverSettings = {
                purchaseUrl: response.purchaseUrl.replace("host.docker.internal", "localhost"),
                identityUrl: response.identityUrl.replace("host.docker.internal", "localhost"),
                signalrHubUrl: response.signalrHubUrl.replace("host.docker.internal", "localhost"),
                activateCampaignDetailFunction: response.activateCampaignDetailFunction
            }
            this.storageService.store('identityUrl', this.serverSettings.identityUrl);
            this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
            this.storageService.store('signalrHubUrl', this.serverSettings.signalrHubUrl);
            this.storageService.store('activateCampaignDetailFunction', this.serverSettings.activateCampaignDetailFunction);
            this.isReady = true;
            this.settingsLoadedSource.next(this.serverSettings);
        });
    }
}
