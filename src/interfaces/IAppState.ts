import { IRect } from './IRect';
import { IBall } from './IBall';
import { ISize } from './ISize';
import { IStage } from './IStage';

export interface IAppState {
    score: number;
    lives: number;
    blockSize: ISize;
    stage: IStage;
    ball: IBall;
    player: IRect;
    playerSpeed: number;
}
