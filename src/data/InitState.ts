import { IAppState } from './../interfaces/IAppState';

export const InitState: IAppState = {
    score: 0,
    lives: 3,
    ball: {
        x: 142,
        y: 260,
        dx: 4,
        dy: 4,
        w: 5,
        h: 5,
        blink: true
    },
    stage: {
        blockCount: 0,
        blocks: []
    },
    player: {
        x: 110,
        y: 280,
        w: 80,
        h: 10
    },
    playerSpeed: 7
};
