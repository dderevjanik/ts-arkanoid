// need more refactor
const canvasEl = <HTMLCanvasElement> document.getElementById('canvas');
import { InitState } from './data/InitState';
import { IAppState } from './interfaces/IAppState';
import { ICanvas } from './interfaces/ICanvas';
import { IPlayer } from './interfaces/IPlayer';
import { render, clearScreen } from './Render';
import { generateNewLevel } from './Stage';
import { EKeyState } from './enums/EKeyState';
import { EPowerUp } from './enums/EPowerUp';
import { addControlListeners, handleControls, clearControls } from './Controls';
import { createPowerUp, handlePowerUps } from './PowerUp';
import {
    inCollision, getCollisions,
    isOutsideLeft, isOutsideRight,
    isOutsideDown, isOutsideUp,
    getBlockScore, resetPositions
} from './Mechanics';
import {
    START_LIVES, START_SCORE, START_LEVEL,
    PADDLE_INIT_W, PADDLE_INIT_EW
} from './data/Constants';

canvasEl.width = 300;
canvasEl.height = 300;

let leftPad = EKeyState.UP;
let rightPad = EKeyState.UP;

const canvas: ICanvas = {
    el: canvasEl,
    g: canvasEl.getContext('2d'),
    w: canvasEl.width,
    h: canvasEl.height
};

/**
 * Reset current player's data
 */
const resetData = (state: IAppState) => {
    state.score.lives = START_LIVES;
    state.score.score = START_SCORE;
    state.score.level = START_LEVEL;
    generateNewLevel(state);
};

/**
 * Update ball state
 */
const updateBall = (state: IAppState) => {
    const ball = state.ball;
    // prediction for next position
    const nX = (ball.x + ball.dx);
    const nY = (ball.y + ball.dy);

    // detect collision with bottom screen
    if (isOutsideRight(ball.y + ball.dy, 300)) {
        ball.dy = -ball.dy;
        state.score.lives -= 1;
        // if lives < 0, 'reset' whole game
        if (state.score.lives < 0) {
            resetData(state);
        }
        resetPositions(state.player, state.ball);
    }

    if (isOutsideLeft(nX) || isOutsideRight(nX, canvas.w)) {
        ball.dx = -ball.dx; // reverse horizontal direction
    }
    if (isOutsideDown(nY) || isOutsideUp(nY, canvas.h)) {
        ball.dy = -ball.dy; // reverse vertical direction
    }
    // move to next position
    ball.x += ball.dx;
    ball.y += ball.dy;
};


/**
 * Detect collision with block objects and execute proper functions
 */
const dealWithCollision = (state: IAppState) => {
    const ball = state.ball;
    const player = state.player;
    const collisions = getCollisions(state.ball, state.stage.blocks);
    if (!state.player.powerUps.fire.timeleft) {
        ball.dy = ((collisions.length % 2) === 0) ? ball.dy : -ball.dy;
    }

    // remove all blocks with collision, add score and decrease blocks count
    collisions.forEach((block) => {
        const index = state.stage.blocks.indexOf(block);
        state.score.score += getBlockScore(block);
        state.stage.blocks.splice(index, 1);
        state.stage.blockCount -= 1;
        // if number of blocks are 0, create new level
        state.nextItem -= 1;
        if (state.nextItem === 0) {
            state.nextItem = Math.floor(Math.random() * 15) + 5;
            state.items.push(createPowerUp(block.x, block.y));
        }
        if (state.stage.blockCount === 0) {
            generateNewLevel(state);
            resetPositions(state.player, state.ball);
            state.score.score += 1000;
            state.score.level += 1;
        }
    });

    // check if ball is in collision with player
    if (inCollision(state.player, state.ball)) {
        // if ((ball.x < state.player.x + 20) && (ball.dx < 0)) {
        //     ball.dx += 0.5;
        // } else if ((ball.x > state.player.x + state.player.w - 20) && (ball.dx > 0)) {
        //     ball.dx += 0.5;
        // }
        ball.dy = -ball.dy;
    }

    const items = getCollisions(state.player, state.items);
    items.forEach((item) => {
        if (item.type === EPowerUp.SIZE) {
            state.player.powerUps.size.timeleft = 300;
        } else if (item.type === EPowerUp.FIRE) {
            state.player.powerUps.fire.timeleft = 150;
        }
        state.items.splice(state.items.indexOf(item), 1);
    });

    state.items.forEach((item) => {
        item.y += 5;
    })

};



/**
 * Update current state
 */
const update = (state: IAppState) => {
    clearScreen(canvas.g, canvas.w, canvas.h);
    handleControls(state.player, state.controls);
    handlePowerUps(state);
    updateBall(state);
    dealWithCollision(state);
    render(canvas.g, state);
    setTimeout(() => update(state), 1000 / 30);
};

window.onload = () => {
    addControlListeners(InitState.controls);
    generateNewLevel(InitState);
    update(InitState);

    const pwrSize: any = document.getElementById('powerup-size');
    pwrSize.addEventListener('mousedown', () => {
        // InitState.player.powerUps = (InitState.player.powerUps & EPowerUp.Size);
        // InitState.player.x -= 10;
        // InitState.player.pwrSize = 10;
        // InitState.player.w = 100;
    });
};
