import { ICommand } from "../../interfaces/icommand";
import { IObject } from "../../interfaces/iobject";
import { Editor } from "../editor";
import { SelectCommand } from "./select";

export class DeleteCommand implements ICommand {
    editor: Editor;
    element: IObject;

    constructor(element: IObject) {
        this.element = element;
    }

    execute() {
        const objIndex = this.editor.objects.indexOf(this.element);
        if (objIndex > -1) {
            // Remove the object from the array
            this.editor.objects.splice(objIndex, 1);
        }
        this.editor.canvas.remove(this.element.element);
        if (this.editor.objects.length > 0)
            this.editor.commands.exec(new SelectCommand(this.editor.objects[objIndex < this.editor.objects.length? objIndex : this.editor.objects.length - 1]), { addToHistory: false });
        this.editor.$objectsUpdated.next(this.editor.objects);
    }

    undo() {
        this.editor.objects.push(this.element);
        this.editor.$objectsUpdated.next(this.editor.objects);
    }

    redo() {
        this.execute();
    }
}