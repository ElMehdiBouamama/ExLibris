import { Observable } from "rxjs";
import { ICommand } from "../../interfaces/icommand";
import { IObject } from "../../interfaces/iobject";
import { Editor } from "../editor";
import { Text } from "../objects";
import { CreateCommand } from "./create";
import { DeleteCommand } from "./delete";
import { UpdateViewCommand } from "./updateView";

export class AddTextCommand implements ICommand {
    editor: Editor;
    object: IObject;
    text?: string;
    command: ICommand;

    constructor(text: string = 'ExLibris') {
        this.text = text;
    }

    execute() {
        this.command = new CreateCommand(Text, { text: this.text });
        this.editor.commands.exec(this.command);
    }

    undo() {
        this.editor.commands.undo(this.command);
    }

    redo() {
        this.execute();
    }
}
