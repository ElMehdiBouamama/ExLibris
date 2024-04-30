import { ChangeDetectorRef, inject, NgZone } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IObject } from "../interfaces/iobject";
import { CommandManager } from "./command.manager";
import { UpdateViewCommand } from "./commands/updateView";
import { CustomCanvas } from "./custom.canvas";

export class Editor {
    private cdrf: ChangeDetectorRef = inject(ChangeDetectorRef);
    public canvas: fabric.Canvas;
    public $isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public $selectedItem: Subject<IObject> = new Subject<IObject>();
    public $updateView: Subject<void> = new Subject<void>();
    public readonly $objectsUpdated: BehaviorSubject<IObject[]> = new BehaviorSubject<IObject[]>([]);
    public readonly objects: IObject[] = [];
    public commands: CommandManager;

    constructor() {
        console.log('[' + this.constructor.name + '] Initializing modules:');
        this.commands = new CommandManager(this);
        this.$objectsUpdated.subscribe((objects: IObject[]) => {
            this.commands.exec(new UpdateViewCommand(true, true));
        })
    }

    initCanva(zone: NgZone): void {
        CustomCanvas.init(this, zone);
        this.$isReady.next(true);
    }

    find(element: fabric.Object) {
        return this.objects.find(obj => obj.element === element);
    }

    updateAngularView() {
        this.cdrf.detectChanges();
    }

    updateCanvasView() {
        this.canvas.requestRenderAll();
    }
}
