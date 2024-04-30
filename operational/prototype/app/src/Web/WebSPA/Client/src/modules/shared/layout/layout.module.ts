import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopHeaderInfoComponent } from './top-header-info/top-header-info.component';
import { HeaderLeftMenuComponent } from './header-left-menu/header-left-menu.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        HeaderComponent,
        TopHeaderInfoComponent,
        HeaderLeftMenuComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule
    ],
    exports: [
        HeaderComponent,
        HeaderLeftMenuComponent
    ]
})
export class LayoutModule { }
