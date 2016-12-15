// need more refactor
const canvasEl = <HTMLCanvasElement> document.getElementById('canvas');
import { InitState } from './data/InitState';
import { IAppState } from './interfaces/IAppState';
import { ICanvas } from './interfaces/ICanvas';
import { IPlayer } from './interfaces/IPlayer';
import { render, clearScreen } from './Render';
import { generateNewLevel } from './Stage';
import { EKeyState } from './enums/EKeyState';
import { addControlListeners, handleControls, clearControls } from './Controls';
import {
    inCollision, getCollisions,
    isOutsideLeft, isOutsideRight,
    isOutsideDown, isOutsideUp,
    getBlockScore, resetPositions
} from './Mechanics';
import { START_LIVES, START_SCORE, START_LEVEL } from './data/Constants';

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
    ball.dy = (collisions.length % 2 === 0) ? ball.dy : -ball.dy;

    // remove all blocks with collision, add score and decrease blocks count
    collisions.forEach((block) => {
        const index = state.stage.blocks.indexOf(block);
        state.score.score += getBlockScore(block);
        state.stage.blocks.splice(index, 1);
        state.stage.blockCount -= 1;
        // if number of blocks are 0, create new level
        if (state.stage.blockCount === 0) {
            generateNewLevel(state);
            resetPositions(state.player, state.ball);
            state.score.score += 1000;
            state.score.level += 1;
        }
    });

    // check if playes is in collision with player
    if (inCollision(state.player, state.ball)) {
        ball.dy = -ball.dy;
    }

};

/**
 * Update current state
 */
const update = (state: IAppState) => {
    clearScreen(canvas.g, canvas.w, canvas.h);
    handleControls(state.player, state.controls);
    updateBall(state);
    dealWithCollision(state);
    render(canvas.g, state);
    setTimeout(() => update(state), 1000 / 30);
};

window.onload = () => {
    addControlListeners(InitState.controls);
    generateNewLevel(InitState);
    update(InitState);
};
