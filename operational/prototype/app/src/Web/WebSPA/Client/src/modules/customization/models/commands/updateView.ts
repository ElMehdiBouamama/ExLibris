import { ICommand } from "../../interfaces/icommand";
import { Editor } from "../editor";

export class UpdateViewCommand implements ICommand{
    editor: Editor;
    isAngularView: boolean;
    isCanvasView: boolean

    constructor(isAngularView: boolean = false, isCanvasView: boolean = false) {
        this.isAngularView = isAngularView;
        this.isCanvasView = isCanvasView;
    }

    execute() {
        if (this.isAngularView) {
            this.editor.updateAngularView();
        }
        if (this.isCanvasView) {
            this.editor.updateCanvasView();
        }
    }

    undo() { }

    redo() { }
}
