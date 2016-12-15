import { IBall } from './IBall';
import { IPlayer } from './IPlayer';
import { ISize } from './ISize';
import { IStage } from './IStage';
import { IControls } from './IControls';
import { IScore } from './IScore';

export interface IAppState {
    readonly fps: number;
    readonly blockSize: ISize;
    stage: IStage;
    ball: IBall;
    player: IPlayer;
    controls: IControls;
    score: IScore;
}
