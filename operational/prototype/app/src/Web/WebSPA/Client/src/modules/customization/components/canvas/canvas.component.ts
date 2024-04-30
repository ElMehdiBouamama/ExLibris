import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { EditorService } from '../../editor.service';
import { Editor } from '../../models/editor';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
    @Input('width') width: number;
    @Input('height') height: number;
    private editor: Editor;

    constructor(private service: EditorService, private zone: NgZone, private cdrf: ChangeDetectorRef) {
        this.editor = this.service.getEditor();
    }

    ngAfterViewInit(): void {
        this.editor.initCanva(this.zone);
        console.log('[' + this.constructor.name + '] All components initialized and ready to be used...');
    }
}
