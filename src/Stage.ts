import { IStage } from './interfaces/IStage';
import { IBlock } from './interfaces/IBlock';
import { Formation } from './Types';

/**
 * Return new enemy formation
 */
const getRandomFormation = (formations: Formation[]): Formation => {
    const formationIndex = Math.floor(Math.random() * formations.length);
    return formations[formationIndex];
};

/**
 * Will generate new stage, only new blocks
 */
export const generateNewStage = (sx: number, sy: number, bw: number, bh: number, formations: Formation[], stage: IStage): IStage => {
    const blocks: IBlock[] = [];
    let count = 0;

    getRandomFormation(formations).forEach((row, r) => {
        row.forEach((col, c) => {
            if (col !== 0) {
                blocks.push({
                    blockType: (col - 1),
                    x: sx + c * bw + c * 3,
                    y: sy + r * bh + r * 3,
                    w: bw,
                    h: bh
                });
                count++;
            }
        });
    });

    return {
        blocks: blocks,
        blockCount: count,
        score: (stage.score * stage.scoreInc),
        scoreInc: stage.score
    };
};
