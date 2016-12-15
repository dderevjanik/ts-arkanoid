import { IRect } from './IRect';
import { IPowerUp } from './IPowerUp';
import { EPowerUp } from './../enums/EPowerUp';

export interface IPlayer extends IRect {
    readonly ew: number;
    readonly v: number;
    readonly powerUps: {
        readonly size: IPowerUp;
        readonly fire: IPowerUp;
    }
};
