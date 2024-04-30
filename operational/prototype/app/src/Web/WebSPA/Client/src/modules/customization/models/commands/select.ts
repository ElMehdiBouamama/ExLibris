import { ICommand } from "../../interfaces/icommand";
import { IObject } from "../../interfaces/iobject";
import { Editor } from "../editor";

export class SelectCommand implements ICommand {
    editor: Editor;
    selected: IObject;
    deselected: IObject;

    constructor(element: IObject) {
        this.selected = element;
    }

    execute() {
        if (this.selected) {
            this.deselected = this.editor.find(this.editor.canvas.getActiveObject());
            this.editor.canvas.setActiveObject(this.selected.element);
            this.editor.canvas.fire('selection:created', { selected: [this.selected.element] });
        }
    }

    undo() {
        if (this.deselected) {
            this.editor.canvas.setActiveObject(this.deselected.element);
            this.editor.canvas.fire('selection:created', { selected: [this.deselected.element] });
        }
    }

    redo() {
        this.execute();
    }
}
