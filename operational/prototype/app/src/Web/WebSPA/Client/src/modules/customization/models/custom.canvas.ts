import { NgZone } from "@angular/core";
import { fabric } from "fabric";
import configs from "../configs/config.json";
import { GridDrawTypes } from "../interfaces/grid-draw-types";
import { UpdateViewCommand } from "./commands/updateView";
import { Editor } from "./editor";
import { Grid } from "./objects";

export abstract class CustomCanvas {
    private static editor: Editor;
    private static _canvas?: fabric.Canvas;

    public static init(editor: Editor, zone: NgZone): void {
        this.editor = editor;
        this.initCanvas(zone);
        this.InitCanvasProperties();
        this.InitGrid();
        this.InitEventHandlers();
        this.editor.canvas = this._canvas;
    }

    private static initCanvas(zone: NgZone) {
        zone.runOutsideAngular(() => this._canvas = new fabric.Canvas(configs.canvas.id));
        console.log('[' + this.prototype.constructor.name + ']  - Initialized Canvas: ' + configs.canvas.id + ' ...');
    }

    private static InitCanvasProperties(): void {
        // Initialize canvas properties
        this._canvas.selection = false;
        this._canvas.setDimensions({
            "width": this._canvas.getWidth(),
            "height": this._canvas.getHeight()
        });
        console.log('[' + this.prototype.constructor.name + ']  - Initialized Global Fabric Properties...');
    }

    public static getCanvas(): fabric.Canvas {
        return this._canvas;
    }

    private static InitGrid(): void {
        // Deactivate rendering when adding or removing elements
        this._canvas.renderOnAddRemove = false;
        // Create the grid and draw the grid
        new Grid().draw(GridDrawTypes.all);
        // Export the grid data to an image object and set it as background
        const img = this._canvas.toDataURL();
        this._canvas.remove(...this._canvas.getObjects());
        this._canvas.setBackgroundImage(img, this._canvas.renderAll.bind(this._canvas));
        // Reactivate rendering when adding or removing elements
        this._canvas.renderOnAddRemove = true;
        console.log('[' + this.prototype.constructor.name + ']  - Initialized Grid...');
    }

    private static InitEventHandlers(): void {
        this._canvas.on('object:modified', this.onModified);
        this._canvas.on("text:changed", this.onTextChanged);
        this._canvas.on('object:moving', this.onMoving);
        this._canvas.on('object:rotating', this.onMoving);
        this._canvas.on('object:scaling', this.onScaling);
        //this._canvas.on('object:resizing', Object.onResize);
        this._canvas.on('selection:created', this.onSelect);
        this._canvas.on('selection:updated', this.onSelect);
        this._canvas.on('selection:cleared', this.onDeselect);
        console.log('[' + this.prototype.constructor.name + ']  - Initialized Event Handlers...');
    }


    static clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
    };

    static onMoving(evt: fabric.IEvent) {
        const obj = evt.target;
        const boundingBox = obj.getBoundingRect();
        obj.set({
            top: CustomCanvas.clamp(obj.top, Grid.boundary.top + (boundingBox.height + Grid.container.strokeWidth) / 2 - 1, Grid.boundary.height + Grid.boundary.top - boundingBox.height / 2),
            left: CustomCanvas.clamp(obj.left, Grid.boundary.left + (boundingBox.width + Grid.container.strokeWidth) / 2 - 1, Grid.boundary.width + Grid.boundary.left - boundingBox.width / 2),
        });
        obj.setCoords();
    }

    static onScaling(evt: fabric.IEvent) {
        const obj = evt.target;
        const scaleX = obj.getScaledWidth() > Grid.boundary.width ? (Grid.boundary.width - Grid.container.strokeWidth / 2 - 1.25) / obj.width : CustomCanvas.clamp(obj.scaleX, 1, obj.scaleX);
        const scaleY = obj.getScaledHeight() > Grid.boundary.height ? (Grid.boundary.height - Grid.boundary.top / 2 + Grid.container.strokeWidth + 2.25) / obj.height : CustomCanvas.clamp(obj.scaleY, 1, obj.scaleY);
        obj.scale(Math.min(scaleX, scaleY));
        obj.canvas.fire('object:moving', { target: obj });
    }

    static onResize(evt: fabric.IEvent) {
        if (evt.target instanceof fabric.IText) CustomCanvas.onTextChanged(evt)
        else CustomCanvas.onScaling(evt);
    }

    static onSelect(evt: fabric.IEvent) {
        const obj = evt.selected?.at(0) ?? CustomCanvas._canvas._objects[0];
        obj.canvas._objects.forEach(element => element !== obj ? element.set({ "opacity": 0.3 }) : element.set({ "opacity": 1 }));
        CustomCanvas.editor.$selectedItem.next(CustomCanvas.editor.find(obj));
        CustomCanvas.editor.commands.exec(new UpdateViewCommand(true, true));
    }

    static onDeselect(evt: fabric.IEvent) {
        const obj = evt.deselected?.at(0) ?? CustomCanvas._canvas._objects[0];
        if(obj) obj.canvas._objects.forEach(element => element.set({ "opacity": 1 }));
    }

    static onModified(evt: fabric.IEvent) {
        evt.target.dirty = true;
        CustomCanvas.editor.commands.exec(new UpdateViewCommand(true, true));
    }

    static onTextChanged(evt: fabric.IEvent) {
        const obj = evt.target as fabric.IText;
        var textLinesMaxWidth = obj.textLines.reduce((max, _, i) => Math.max(max, obj.getLineWidth(i)), 0);
        while (textLinesMaxWidth > Grid.boundary.width) {
            obj.fontSize -= 1;
            obj.render(obj.canvas.getContext());
            textLinesMaxWidth = obj.textLines.reduce((max, _, i) => Math.max(max, obj.getLineWidth(i)), 0);
        }
        obj.set({ "width": Math.min(textLinesMaxWidth, Grid.boundary.width) });
        obj.canvas.fire('object:moving', { target: obj });
        CustomCanvas.editor.commands.exec(new UpdateViewCommand(true, true));
    }
}