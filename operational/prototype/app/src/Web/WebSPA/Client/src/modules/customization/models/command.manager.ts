import { ICommand } from "../interfaces/icommand";
import { Editor } from "./editor";


export class CommandManager {
    private history: ICommand[] = [];
    private undoHistory: ICommand[] = [];
    private editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    public exec(command: ICommand, options: { addToHistory: boolean } = { addToHistory: true }) {
        this.editor.$isReady.subscribe((isReady) => {
            if (isReady) {
                command.editor = this.editor;
                command.execute();
                if (options.addToHistory) this.history.push(command);
            }
        });
    }

    public undo(command?: ICommand) {
        this.editor.$isReady.subscribe((isReady) => {
            if (isReady) {
                if (!command) {
                    const command = this.history.pop();
                    command.undo();
                    this.undoHistory.push(command);
                } else {
                    this.history.splice(this.history.indexOf(command), 1);
                    command.undo();
                }
            }
        });
    }

    public redo() {
        this.editor.$isReady.subscribe(() => {
            const command = this.undoHistory.pop();
            command.redo();
            this.history.push(command);
        });
    }
}