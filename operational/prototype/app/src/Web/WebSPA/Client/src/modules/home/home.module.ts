import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgOptimizedImage } from '@angular/common'

@NgModule({
    declarations: [HomeComponent],
    imports: [
        BrowserModule,
        SharedModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        DragScrollModule,
        NgOptimizedImage
    ]
})
export class HomeModule { }
