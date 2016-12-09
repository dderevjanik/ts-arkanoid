// need more refactor
const canvasEl = <HTMLCanvasElement> document.getElementById('canvas');
import { InitState } from './data/InitState';
import { IAppState } from './interfaces/IAppState';
import { IPoint } from './interfaces/IPoint';
import { ICanvas } from './interfaces/ICanvas';
import { IRect } from './interfaces/IRect';
import { render } from './Render';
import { generateNewStage } from './Stage';
import { Formation1 } from './Data/Formation1';
import {
    inCollision, getCollisions,
    isOutsideLeft, isOutsideRight,
    isOutsideDown, isOutsideUp,
    getBlockScore
} from './Mechanics';

const leftBtnEl: HTMLButtonElement|any = window.document.getElementById('left-btn');
const rightBtnEl: HTMLButtonElement|any = window.document.getElementById('right-btn');

const formations = [Formation1];

canvasEl.width = 300;
canvasEl.height = 300;

let leftPad = 0;
let rightPad = 0;

const canvas: ICanvas = {
    el: canvasEl,
    g: canvasEl.getContext('2d'),
    w: canvasEl.width,
    h: canvasEl.height
};

const handleInputs = (player: IRect) => {
    if (leftPad === 1) {
        if (player.x - 7 > 0) {
            player.x -= 7;
        }
    }
    if (rightPad === 1) {
        if (player.x + player.w + 7 < 300) {
            player.x += 7;
        }
    };
};

const generateNewLevel = (state: IAppState) => {
    state.ball.dx += 2;
    state.ball.dy += 2;
    state.stage = generateNewStage(20, 1, state.blockSize.w, state.blockSize.h, formations);
};

const resetData = (state: IAppState) => {
    state.lives = 3;
    state.score = 0;
    generateNewLevel(state);
};

const resetPositions = (state: IAppState) => {
    state.player.x = 110;
    state.player.y = 280;
    state.ball.x = 142;
    state.ball.y = 260;
};

const updateBall = (state: IAppState) => {
    const ball = state.ball;
    if (ball.y + ball.dy > 300) {
        // up collision
        ball.dy = -ball.dy;
        state.lives -= 1;
        if (state.lives < 0) {
            resetData(state);
        }
        resetPositions(state);
    }
    const nX = (ball.x + ball.dx);
    const nY = (ball.y + ball.dy);
    if (isOutsideLeft(nX) || isOutsideRight(nX, canvas.w)) {
        ball.dx = -ball.dx;
    }
    if (isOutsideDown(nY) || isOutsideUp(nY, canvas.h)) {
        ball.dy = -ball.dy;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
};

const clearInput = () => {
    leftPad = 0;
    rightPad = 0;
};

const detectCollision = (state: IAppState) => {
    const ball = state.ball;
    const player = state.player;
    const collisions = getCollisions(state.ball, state.stage.blocks);
    ball.dy = (collisions.length % 2 === 0) ? ball.dy : -ball.dy;

    collisions.forEach((block) => {
        const index = state.stage.blocks.indexOf(block);
        state.score += getBlockScore(block);
        state.stage.blocks.splice(index, 1);
        state.stage.blockCount -= 1;
        if (state.stage.blockCount === 0) {
            generateNewLevel(state);
            resetPositions(state);
            state.score += 1000;
        }
    });

    if (inCollision(state.player, state.ball)) {
        ball.dy = -ball.dy;
    }

};

const update = (state: IAppState) => {
    // clearScreen();
    handleInputs(state.player);
    updateBall(state);
    detectCollision(state);
    render(canvas.g, state);
    setTimeout(() => update(state), 1000 / 30);
};

const addListeners = () => {
    const leftBtnEl: any = document.getElementById('leftBtn');
    const rightBtnEl: any = document.getElementById('rightBtn');

    leftBtnEl.addEventListener('mousedown', () => { leftPad = 1; });
    leftBtnEl.addEventListener('mouseup', () => { leftPad = 0; });
    leftBtnEl.addEventListener('touchstart', () => { leftPad = 1; });
    leftBtnEl.addEventListener('touchend', () => { leftPad = 0; });
    rightBtnEl.addEventListener('mousedown', () => { rightPad = 1; });
    rightBtnEl.addEventListener('mouseup', () => { rightPad = 0; });
    rightBtnEl.addEventListener('touchstart', () => { rightPad = 1; });
    rightBtnEl.addEventListener('touchend', () => { rightPad = 0; });

};

window.onload = () => {
    addListeners();
    update(InitState);
};
