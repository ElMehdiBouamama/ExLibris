import { enableProdMode, ɵresetCompiledComponents } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './modules/app.module';
import { environment } from './environments/environment';

console.log("[environment] Production:", environment.production);
if (environment.production) {
    enableProdMode();
}

declare var module: any;
if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => ɵresetCompiledComponents());
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));