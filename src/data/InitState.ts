import { IAppState } from './../interfaces/IAppState';

export const InitState: IAppState = {
    fps: 30,
    blockSize: {
        h: 10,
        w: 30
    },
    score: 0,
    lives: 3,
    ball: {
        x: 142,
        y: 260,
        dx: 4,
        dy: 4,
        w: 5,
        h: 5,
        blink: true,
        lvlSpeedInc: 2
    },
    stage: {
        blockCount: 0,
        blocks: [],
        score: 1000,
        scoreInc: 1.2
    },
    player: {
        x: 110,
        y: 280,
        w: 80,
        h: 10,
        v: 7
    }
};
