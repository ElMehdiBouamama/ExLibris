import { ICommand } from "../../interfaces/icommand";
import { IObject } from "../../interfaces/iobject";
import { Editor } from "../editor";
import { Rectangle } from "../objects";
import { CreateCommand } from "./create";

export class AddRectangleCommand implements ICommand {
    editor: Editor;
    object: IObject;
    command: ICommand;

    constructor() {
    }

    execute() {
        this.command = new CreateCommand(Rectangle);
        this.editor.commands.exec(this.command);
    }

    undo() {
        this.editor.commands.undo(this.command);
    }

    redo() {
        this.execute();
    }
}
