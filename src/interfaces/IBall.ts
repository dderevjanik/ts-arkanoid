import { IRect } from './IRect';
import { IBlink } from './IBlink';

export interface IBall extends IRect, IBlink {
    dx: number;
    dy: number;
};
