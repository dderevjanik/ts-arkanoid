import { IRect } from './IRect';
import { IPowerUp } from './IPowerUp';
import { IPowerUpType } from './IPowerUpType';
import { EPowerUp } from './../enums/EPowerUp';

export interface IPlayer extends IRect {
    readonly ew: number;
    readonly v: number;
    readonly powerUps: {
        readonly size: IPowerUp&IPowerUpType;
        readonly fire: IPowerUp&IPowerUpType;
    }
};
