import { IRect } from './IRect';

export interface IBlock extends IRect {
    readonly blockType: number;
};
