import { EPowerUp } from './../enums/EPowerUp';

export interface IPowerUp {
    readonly type: EPowerUp;
    timeleft: number;
};
