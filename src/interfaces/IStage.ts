import { IBlock } from './IBlock';

export interface IStage {
    blockCount: number;
    blocks: IBlock[];
    score: number;
    readonly scoreInc: number;
}
