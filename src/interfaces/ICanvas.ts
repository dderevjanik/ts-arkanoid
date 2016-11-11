import { ISize } from './ISize';

export interface ICanvas extends ISize {
    el: HTMLCanvasElement;
    g: CanvasRenderingContext2D;
}
