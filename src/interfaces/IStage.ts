import { IBlock } from './IBlock';

export interface IStage {
    readonly scoreInc: number;
    blockCount: number;
    blocks: IBlock[];
    score: number;
};
