import { ISize } from './ISize';

export interface ICanvas extends ISize {
    el: HTMLCanvasElement|any;
    g: CanvasRenderingContext2D|any;
}
