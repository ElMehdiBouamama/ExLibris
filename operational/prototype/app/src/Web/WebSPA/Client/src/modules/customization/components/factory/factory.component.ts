import { Component } from '@angular/core';
import { EditorService } from '../../editor.service';
import { AddRectangleCommand } from '../../models/commands/addRectangle';
import { AddTextCommand } from '../../models/commands/addText';
import { Editor } from '../../models/editor';

@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.scss']
})
export class FactoryComponent {
    private editor: Editor;

    constructor(private service: EditorService) {
        this.editor = this.service.getEditor();
    }

    addText() {
        this.editor.commands.exec(new AddTextCommand());
    }

    addRectangle() {
        this.editor.commands.exec(new AddRectangleCommand());
    }

}
