import { ICommand } from "../../interfaces/icommand";
import { IObject } from "../../interfaces/iobject";
import { Editor } from "../editor";
import { SelectCommand } from "./select";

type Constructor<T extends IObject = IObject> = new (...params: any[]) => T

export class CreateCommand<T extends Constructor<any>> implements ICommand {
    editor: Editor;
    type: T;
    params: ConstructorParameters<T>;
    element: InstanceType<T>;

    constructor(type: T, ...params: ConstructorParameters<T>) {
        this.type = type;
        this.params = params ?? undefined;
    }

    execute() {
        this.element = new this.type(...this.params);
        // Store the object with the other objects in an array
        this.editor.objects.push(this.element);
        // notify all element that an object has been updated
        this.editor.$objectsUpdated.next(this.editor.objects);
        if (this.editor.objects.length === 1)
            this.editor.commands.exec(new SelectCommand(this.element), { addToHistory: false });
        // Returns the element created
        return this.element;
    }

    undo() {
        this.editor.objects.splice(this.editor.objects.indexOf(this.element), 1);
        // notify all element that an object has been updated
        this.editor.$objectsUpdated.next(this.editor.objects);
    }

    redo() {
        this.execute();
    }


}
