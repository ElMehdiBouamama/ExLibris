import { CdkDrag, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { } from "css-font-loading-module";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedModule } from '../shared/shared.module';
import { CanvasComponent } from './components/canvas/canvas.component';
import { FactoryComponent } from './components/factory/factory.component';
import { LayersComponent } from './components/layers/layers.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CommonModule,
        BrowserAnimationsModule,
        CdkDropList,
        NgFor,
        CdkDrag,
        CdkDragPlaceholder,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatRippleModule,
        MatDividerModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatSliderModule,
        ScrollingModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        EditorComponent,
        CanvasComponent,
        FactoryComponent,
        LayersComponent,
        PropertiesComponent
    ],
    providers: [EditorService]
})
export class EditorModule { }
