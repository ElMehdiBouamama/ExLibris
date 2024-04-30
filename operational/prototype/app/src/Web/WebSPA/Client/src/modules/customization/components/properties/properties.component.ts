import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, flatMap, last, lastValueFrom, map, mapTo, merge, mergeMap, Observable, of, reduce, skipWhile, switchMap, take, takeUntil } from 'rxjs';
import { EditorService } from '../../editor.service';
import { IObject } from '../../interfaces/iobject';
import { UpdateViewCommand } from '../../models/commands/updateView';
import { Editor } from '../../models/editor';
import { Text } from '../../models/objects';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements AfterViewInit, OnDestroy {
    private editor: Editor;
    public $filteredFonts: Observable<any> = new Observable();
    public fontFilterCtrl: FormControl = new FormControl();
    public $selectedItem: Observable<IObject> = new Observable();
    @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport;
    @ViewChild(MatSelect, { static: false }) matSelect: MatSelect;
    private fontIndex: number;


    constructor(private service: EditorService) {
        this.editor = service.getEditor();
        const $availableFonts = this.service.getFonts();
        this.$filteredFonts = merge(
            $availableFonts.pipe(
                takeUntil(this.fontFilterCtrl.valueChanges)
            ),
            this.fontFilterCtrl.valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(filterValue =>
                    $availableFonts.pipe(
                        map(fonts => fonts.filter(font => font.family.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1))
                    )
                )
            )
        );
        this.$selectedItem = this.editor.$selectedItem;
        this.$selectedItem.subscribe(item => {
            if (item instanceof Text) {
                this.$filteredFonts.subscribe(async fonts => {
                    this.fontIndex = fonts.findIndex(font => font.family === item.element.fontFamily);
                    this.viewPort?.scrollToIndex(this.fontIndex, 'auto');
                });
            }
        })
    }

    async ngAfterViewInit() {
        this.viewPort?.scrolledIndexChange.subscribe(async () => {
            const fontRange = this.viewPort.getRenderedRange();
            const fonts = await lastValueFrom(this.$filteredFonts);
            const loadedFonts: Set<number> = new Set<number>();
            fonts.slice(fontRange.start, fontRange.end).forEach((font, i) => {
                if (!loadedFonts.has(fontRange.start + i)) {
                    const fontFace = new FontFace(font?.family + ' menu', 'url(' + font?.menu + ')');
                    fontFace.load().then(() => {
                        document.fonts.add(fontFace);
                        loadedFonts.add(fontRange.start + i);
                        font['loaded'] = true;
                    });
                }
            });
        });
    }

    onFontSelectOpen(isOpen: boolean) {
        this.viewPort?.scrollToIndex(this.fontIndex, 'auto');
    }

    ngOnDestroy() {
    }

}
