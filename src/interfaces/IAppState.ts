import { IBall } from './IBall';
import { IPlayer } from './IPlayer';
import { ISize } from './ISize';
import { IStage } from './IStage';

export interface IAppState {
    readonly fps: number;
    score: number;
    lives: number;
    readonly blockSize: ISize;
    stage: IStage;
    ball: IBall;
    player: IPlayer;
}
