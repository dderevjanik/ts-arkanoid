import { IRect } from './IRect';
import { IBlink } from './IBlink';

export interface IBall extends IRect, IBlink {
    readonly lvlSpeedInc: number;
    dx: number;
    dy: number;
};
