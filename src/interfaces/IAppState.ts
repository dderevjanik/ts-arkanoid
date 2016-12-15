import { IBall } from './IBall';
import { IPlayer } from './IPlayer';
import { ISize } from './ISize';
import { IStage } from './IStage';
import { IControls } from './IControls';
import { IScore } from './IScore';
import { IPowerUp } from './IPowerUp';
import { IItem } from './IItem';

export interface IAppState {
    readonly fps: number;
    readonly blockSize: ISize;
    readonly ball: IBall;
    readonly player: IPlayer;
    readonly controls: IControls;
    readonly score: IScore;
    readonly items: IItem[];
    stage: IStage;
    nextItem: number;
};
