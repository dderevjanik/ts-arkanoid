import { EPowerUp } from './../enums/EPowerUp';

export interface IPowerUpType {
    readonly duration: number;
    readonly type: EPowerUp;
    readonly char: string;
};
