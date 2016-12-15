// need more refactor
const canvasEl = <HTMLCanvasElement> document.getElementById('canvas');
import { InitState } from './data/InitState';
import { IAppState } from './interfaces/IAppState';
import { IPoint } from './interfaces/IPoint';
import { ICanvas } from './interfaces/ICanvas';
import { IRect } from './interfaces/IRect';
import { IPlayer } from './interfaces/IPlayer';
import { render } from './Render';
import { generateNewStage } from './Stage';
import { clearScreen } from './Utils';
import { EKeyState } from './enums/EKeyState';
import { Formation1, Formation2, Formation3 } from './Data/Formations';
import {
    inCollision, getCollisions,
    isOutsideLeft, isOutsideRight,
    isOutsideDown, isOutsideUp,
    getBlockScore
} from './Mechanics';

const leftBtnEl: HTMLButtonElement|any = window.document.getElementById('left-btn');
const rightBtnEl: HTMLButtonElement|any = window.document.getElementById('right-btn');

const formations = [Formation1, Formation2, Formation3];

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
 * Handle player inputs
 */
const handleInputs = (player: IPlayer) => {
    if (leftPad === 1) {
        if ((player.x - player.v) > 0) {
            player.x -= player.v;
        }
    }
    if (rightPad === 1) {
        if ((player.x + player.w + player.v) < 300) {
            player.x += player.v;
        }
    };
};

/**
 * Will generate new level with ball centered in above paddle
 */
const generateNewLevel = (state: IAppState) => {
    state.ball.dx += state.ball.lvlSpeedInc;
    state.ball.dy += state.ball.lvlSpeedInc;
    state.stage = generateNewStage(20, 1, state.blockSize.w, state.blockSize.h, formations, state.stage);
};

/**
 * Reset current player's data
 */
const resetData = (state: IAppState) => {
    state.lives = 3;
    state.score = 0;
    generateNewLevel(state);
};

/**
 * Reset paddle and ball positions
 */
const resetPositions = (state: IAppState) => {
    state.player.x = 110;
    state.player.y = 280;
    state.ball.x = 142;
    state.ball.y = 260;
};

/**
 * Update ball state
 */
const updateBall = (state: IAppState) => {
    const ball = state.ball;
    // detect collision with bottom screen
    if ((ball.y + ball.dy) > 300) {
        ball.dy = -ball.dy;
        state.lives -= 1;
        // if lives < 0, 'reset' whole game
        if (state.lives < 0) {
            resetData(state);
        }
        resetPositions(state);
    }
    // prediction for next position
    const nX = (ball.x + ball.dx);
    const nY = (ball.y + ball.dy);
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
 * Clear current inputs
 */
const clearInput = () => {
    leftPad = EKeyState.UP;
    rightPad = EKeyState.UP;
};

/**
 * Detect collision with block objects
 */
const detectCollision = (state: IAppState) => {
    const ball = state.ball;
    const player = state.player;
    const collisions = getCollisions(state.ball, state.stage.blocks);
    ball.dy = (collisions.length % 2 === 0) ? ball.dy : -ball.dy;

    // remove all blocks with collision, add score and decrease blocks count
    collisions.forEach((block) => {
        const index = state.stage.blocks.indexOf(block);
        state.score += getBlockScore(block);
        state.stage.blocks.splice(index, 1);
        state.stage.blockCount -= 1;
        // if number of blocks are 0, create new level
        if (state.stage.blockCount === 0) {
            generateNewLevel(state);
            resetPositions(state);
            state.score += 1000;
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
    handleInputs(state.player);
    updateBall(state);
    detectCollision(state);
    render(canvas.g, state);
    setTimeout(() => update(state), 1000 / 30);
};

/**
 * Add Event listeners to DOM
 */
const addListeners = () => {
    const leftBtnEl: any = document.getElementById('left-btn');
    const rightBtnEl: any = document.getElementById('right-btn');

    leftBtnEl.addEventListener('mousedown', () => { leftPad = EKeyState.PRESS; });
    leftBtnEl.addEventListener('mouseup', () => { leftPad = EKeyState.UP; });
    leftBtnEl.addEventListener('touchstart', () => { leftPad = EKeyState.PRESS; });
    leftBtnEl.addEventListener('touchend', () => { leftPad = EKeyState.UP; });

    rightBtnEl.addEventListener('mousedown', () => { rightPad = EKeyState.PRESS; });
    rightBtnEl.addEventListener('mouseup', () => { rightPad = EKeyState.UP; });
    rightBtnEl.addEventListener('touchstart', () => { rightPad = EKeyState.PRESS; });
    rightBtnEl.addEventListener('touchend', () => { rightPad = EKeyState.UP; });
};

window.onload = () => {
    addListeners();
    generateNewLevel(InitState);
    update(InitState);
};
