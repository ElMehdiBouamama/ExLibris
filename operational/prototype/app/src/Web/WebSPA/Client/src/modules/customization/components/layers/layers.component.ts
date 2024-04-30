import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component } from '@angular/core';
import { first, Observable, skipUntil, skipWhile, take, takeUntil } from 'rxjs';
import { EditorService } from '../../editor.service';
import { IObject } from '../../interfaces/iobject';
import { AddTextCommand } from '../../models/commands/addText';
import { DeleteCommand } from '../../models/commands/delete';
import { SelectCommand } from '../../models/commands/select';
import { UpdateViewCommand } from '../../models/commands/updateView';
import { Editor } from '../../models/editor';

@Component({
    selector: 'app-layers',
    templateUrl: './layers.component.html',
    styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements AfterViewInit {
    editor: Editor;
    $selectedItem: Observable<IObject>;
    $objects: Observable<IObject[]>;

    constructor(private service: EditorService) {
        this.editor = service.getEditor();
        this.$selectedItem = this.editor.$selectedItem;
        this.$objects = this.editor.$objectsUpdated;
    }

    ngAfterViewInit() {
        this.editor.commands.exec(new AddTextCommand());
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.editor.objects, event.previousIndex, event.currentIndex);
    }

    select(object: IObject) {
        this.editor.commands.exec(new SelectCommand(object), { addToHistory: false });
    }

    delete(item: IObject) {
        this.editor.commands.exec(new DeleteCommand(item));
    }
}
