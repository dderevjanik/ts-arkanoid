import { IStage } from './interfaces/IStage';
import { IBlock } from './interfaces/IBlock';
import { IAppState } from './interfaces/IAppState';
import { Formation1, Formation2, Formation3 } from './data/Formations';
import { Formation } from './Types';

// List of possible enemy formations to generate
const formations = [Formation1, Formation2, Formation3];

/**
 * Return new enemy formation
 */
const getRandomFormation = (): Formation => {
    const formationIndex = Math.floor(Math.random() * formations.length);
    return formations[formationIndex];
};

/**
 * Will generate new stage, only new blocks
 */
const generateNewStage = (sx: number, sy: number, bw: number, bh: number, stage: IStage): IStage => {
    const blocks: IBlock[] = [];
    let count = 0;

    getRandomFormation().forEach((row, r) => {
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

/**
 * Will generate new level with ball centered in above paddle
 */
export const generateNewLevel = (state: IAppState) => {
    state.ball.dx += state.ball.lvlSpeedInc;
    state.ball.dy += state.ball.lvlSpeedInc;
    state.stage = generateNewStage(20, 1, state.blockSize.w, state.blockSize.h, state.stage);
};
