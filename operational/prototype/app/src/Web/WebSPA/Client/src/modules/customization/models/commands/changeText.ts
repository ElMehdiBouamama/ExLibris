import { Editor } from "../editor";
import { Text } from "../objects";
import { UpdateViewCommand } from "./updateView";

export class ChangeTextCommand {
    editor: Editor;
    obj: Text;
    newtext: string;
    oldText: string;

    constructor(element: Text, text: string) {
        this.obj = element;
        this.newtext = text;
        this.oldText = this.obj.element.text;
    }

    async execute() {
        this.obj.element.text = this.newtext;
        this.obj.element._splitText();
        this.editor.canvas.fire('text:changed', { target: this.obj.element });
        this.editor.commands.exec(new UpdateViewCommand(true, true));
    }

    undo() {
        this.obj.element.text = this.oldText;
        this.editor.canvas.fire('text:changed', { target: this.obj.element });
        this.editor.commands.exec(new UpdateViewCommand(true, true));
    }

    redo() {
        this.execute();
    }
}
