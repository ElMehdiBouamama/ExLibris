import { Editor } from "../models/editor";

export interface ICommand {
    editor: Editor;

    execute();
    undo();
    redo();
}
