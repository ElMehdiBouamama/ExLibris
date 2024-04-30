import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { ICatalogItem } from '../shared/models/catalogItem.model';
import { EditorService } from './editor.service';
import { Editor } from './models/editor';


@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements AfterViewInit {
    public item: ICatalogItem;
    public editor: Editor;
    //fontFilterCtrl: FormControl = new FormControl();
    //filteredFonts: Observable<any[]> = null;
    //fontSelectIndex: number = 0;
    //fonts: any[] = null;

    constructor(private service: EditorService) {
        this.item = this.service.getItem();
        this.editor = this.service.getEditor();
    }

    ngAfterViewInit() {
        //this.canvasManager.fontUpdate$.subscribe((obj: fabric.IText) => {
        //    this._fontFamily = obj?.fontFamily;
        //    if (this.fonts) {
        //        this.fontSelectIndex = this.fonts.findIndex(font => font.family === obj?.fontFamily);
        //        this.viewPort.setRenderedRange({ start: this.fontSelectIndex - 2, end: this.fontSelectIndex + 2 });
        //        this.cdref.detectChanges();
        //    }
        //});
        //this.service.use(this.canvasManager);
        //});

        //this.service.getFonts('').subscribe(fonts => {
        //    // Loading fonts statically into an array
        //    this.fonts = fonts;

        //    // Loading font menu typography
        //    const loadedFonts: Set<number> = new Set<number>();
        //    this.viewPort.scrolledIndexChange.subscribe(() => {
        //        const fontRange = this.viewPort.getRenderedRange();
        //        this.fonts.slice(fontRange.start, fontRange.end).forEach((font, i) => {
        //            if (!loadedFonts.has(fontRange.start + i)) {
        //                const fontFace = new FontFace(font?.family + ' menu', 'url(' + font?.menu + ')');
        //                fontFace.load().then(() => {
        //                    document.fonts.add(fontFace);
        //                    loadedFonts.add(fontRange.start + i);
        //                    font['loaded'] = true;
        //                    this.cdref.detectChanges();
        //                });
        //            }
        //        });
        //    });


        //    // Loading all fonts to the menu
        //    this.filteredFonts = of(this.fonts);

        //    // Filtering fonts if the fontfilter value has changed
        //    this.fontFilterCtrl.valueChanges.pipe(
        //        debounceTime(300),
        //        distinctUntilChanged(),
        //        tap((filterValue: string) => {
        //            this.filteredFonts = of(this.fonts.filter(font => font.family.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1));
        //        })
        //    ).subscribe();
        //});
    }

    //get horizontalPosition() { return this.canvasManager?.selectedObject?.left }
    //set horizontalPosition(value: number) {
    //    const obj = this.canvasManager?.selectedObject;
    //    if (obj instanceof fabric.Object) {
    //        obj.left = value;
    //        this.canvasManager.fire("object:moving", obj);
    //    }
    //}

    //get verticalPosition() { return this.canvasManager?.selectedObject?.top }
    //set verticalPosition(value: number) {
    //    const obj = this.canvasManager?.selectedObject;
    //    if (obj instanceof fabric.Object) {
    //        obj.top = value;
    //        this.canvasManager.fire("object:moving", obj);
    //    }
    //}

    //get rotationAngle() { return this.canvasManager?.selectedObject?.angle }
    //set rotationAngle(value: number) {
    //    const obj = this.canvasManager?.selectedObject;
    //    if (obj instanceof fabric.Object) {
    //        obj.angle = value;
    //        this.canvasManager.renderAll();
    //        this.canvasManager.fireAll(obj);
    //    }
    //}

    //get fontSize() {
    //    const obj = this.canvasManager?.selectedObject as fabric.IText;
    //    return obj?.fontSize;
    //}
    //set fontSize(value: number) {
    //    const obj = this.canvasManager?.selectedObject;
    //    if (obj instanceof fabric.IText) {
    //        obj.fontSize = value;
    //        this.canvasManager.renderAll();
    //        this.canvasManager.fireAll(obj);
    //    }
    //}

    //private _fontFamily: string = null;
    //get fontFamily() {
    //    return this._fontFamily;
    //}
    //set fontFamily(value: string) {
    //    const obj = this.canvasManager?.selectedObject;

    //    if (this.fonts) {
    //        const res: any = this.fonts.find(font => font.family === value);
    //        if (res?.files?.regular && obj instanceof fabric.IText) {
    //            const font = new FontFace(res.family, 'url(' + res?.files?.regular + ')');
    //            font.load().then(() => {
    //                document.fonts.add(font);
    //                obj.fontFamily = res?.family;
    //                this.canvasManager.renderAll();
    //                this.canvasManager.fireAll(obj);
    //            });
    //        }
    //    }
    //}

    //get texts() { return this.service.getTexts() }

    //drop(event: CdkDragDrop<string[]>) {
    //    moveItemInArray(this.service.getTexts(), event.previousIndex, event.currentIndex);
    //}

    //deleteItem(item: any) {
    //    const index = this.service.getTexts().indexOf(item, 0);
    //    if (index > -1) {
    //        this.canvasManager.remove(item);
    //        this.service.getTexts().splice(index, 1);
    //    }
    //}

    //onFontStyleChanged(values: string[]) {
    //    const obj = this.canvasManager?.selectedObject;
    //    if (obj instanceof fabric.IText) {
    //        values.includes("bold") ? obj.fontWeight = 'bold' : obj.fontWeight = 'normal';
    //        values.includes('italic') ? obj.fontStyle = 'italic' : obj.fontStyle = 'normal';
    //        values.includes('reverted') ? obj.scaleX = -1 : obj.scaleX = 1;
    //        this.canvasManager.renderAll();
    //        this.canvasManager.fireAll(obj);
    //    }
    //}

    //onTextValueChanged(newValue: string, obj: fabric.Object) {
    //    (obj as fabric.IText).text = newValue;
    //    this.canvasManager.fireAll(obj);
    //}

    //updatefontSelectIndex(index: number): void {
    //    //this.fontSelectIndex = index;
    //}

    //onFontSelectOpen(isOpen: boolean): void {
    //    isOpen ? this.viewPort.scrollToIndex(this.fontSelectIndex) : this.canvasManager?.fontUpdate$.next(this.canvasManager?.selectedObject);
    //}
}