import { IStage } from './interfaces/IStage';
import { Formation } from './Types';

const getRandomFormation = (formations: Formation[]): Formation => {
    const formationIndex = Math.floor(Math.random() * formations.length);
    return formations[formationIndex];
};

export const generateNewStage = (sx: number, sy: number, bw: number, bh: number, formations: Formation[]): IStage => {
    const blocks = [];
    let count = 0;

    getRandomFormation(formations).forEach((row, r) => {
        row.forEach((col, c) => {
            if (col !== 0) {
                blocks.push({
                    blockType: col,
                    x: sx + c * bw + c * 3,
                    y: sy + r * bh + r * 3
                });
                count++;
            }
        });
    });

    return {
        blocks: blocks,
        blockCount: count
    };
};
