import { IAppState } from './../interfaces/IAppState';
import { EKeyState } from './../enums/EKeyState';
import * as CONST from './../data/Constants';

/**
 * Initial state of Game
 */
export const InitState: IAppState = {
    fps: CONST.MAX_FPS,
    blockSize: {
        h: 10,
        w: 30
    },
    score: {
        score: CONST.START_SCORE,
        lives: CONST.START_LIVES,
        level: CONST.START_LEVEL
    },
    ball: {
        x: 142,
        y: 260,
        dx: 4,
        dy: 4,
        w: 5,
        h: 5,
        blink: true,
        lvlSpeedInc: CONST.BALL_SPEED_INC_PER_LVL
    },
    stage: {
        blockCount: 0,
        blocks: [],
        score: CONST.SCORE_PER_LVL,
        scoreInc: CONST.SCORE_INCREASE_PER_LVL
    },
    player: {
        x: 110,
        y: 280,
        w: 80,
        h: 10,
        v: 7
    },
    controls: {
        leftpaddle: EKeyState.UP,
        rightpaddle: EKeyState.UP
    }
};
