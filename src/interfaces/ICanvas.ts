import { ISize } from './ISize';

export interface ICanvas extends ISize {
    readonly el: HTMLCanvasElement|any;
    readonly g: CanvasRenderingContext2D|any;
};
