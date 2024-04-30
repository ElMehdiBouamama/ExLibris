import { fabric } from 'fabric';

export interface IObject {
    element: fabric.Object;
    isText(): boolean;
}
