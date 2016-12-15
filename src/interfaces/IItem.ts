import { IRect } from './IRect.js';
import { EPowerUp } from './../enums/EPowerUp';

export interface IItem extends IRect {
    readonly type: EPowerUp;
};
