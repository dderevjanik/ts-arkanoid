"use strict";
// need more refactor
var canvasEl = document.getElementById('canvas');
var InitState_1 = require("./data/InitState");
var Render_1 = require("./Render");
var Stage_1 = require("./Stage");
var Utils_1 = require("./Utils");
var Formation1_1 = require("./Data/Formation1");
var Mechanics_1 = require("./Mechanics");
var leftBtnEl = window.document.getElementById('left-btn');
var rightBtnEl = window.document.getElementById('right-btn');
var formations = [Formation1_1.Formation1];
canvasEl.width = 300;
canvasEl.height = 300;
var leftPad = 0;
var rightPad = 0;
var canvas = {
    el: canvasEl,
    g: canvasEl.getContext('2d'),
    w: canvasEl.width,
    h: canvasEl.height
};
/**
 * Handle player inputs
 */
var handleInputs = function (player) {
    if (leftPad === 1) {
        if (player.x - 7 > 0) {
            player.x -= 7;
        }
    }
    if (rightPad === 1) {
        if (player.x + player.w + 7 < 300) {
            player.x += 7;
        }
    }
    ;
};
/**
 * Will generate new level with ball centered in above paddle
 */
var generateNewLevel = function (state) {
    state.ball.dx += 2;
    state.ball.dy += 2;
    state.stage = Stage_1.generateNewStage(20, 1, state.blockSize.w, state.blockSize.h, formations);
};
/**
 * Reset current player's data
 */
var resetData = function (state) {
    state.lives = 3;
    state.score = 0;
    generateNewLevel(state);
};
/**
 * Reset paddle and ball positions
 */
var resetPositions = function (state) {
    state.player.x = 110;
    state.player.y = 280;
    state.ball.x = 142;
    state.ball.y = 260;
};
/**
 * Update ball state
 */
var updateBall = function (state) {
    var ball = state.ball;
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
    var nX = (ball.x + ball.dx);
    var nY = (ball.y + ball.dy);
    if (Mechanics_1.isOutsideLeft(nX) || Mechanics_1.isOutsideRight(nX, canvas.w)) {
        ball.dx = -ball.dx; // reverse horizontal direction
    }
    if (Mechanics_1.isOutsideDown(nY) || Mechanics_1.isOutsideUp(nY, canvas.h)) {
        ball.dy = -ball.dy; // reverse vertical direction
    }
    // move to next position
    ball.x += ball.dx;
    ball.y += ball.dy;
};
/**
 * Clear current inputs
 */
var clearInput = function () {
    leftPad = 0;
    rightPad = 0;
};
/**
 * Detect collision with block objects
 */
var detectCollision = function (state) {
    var ball = state.ball;
    var player = state.player;
    var collisions = Mechanics_1.getCollisions(state.ball, state.stage.blocks);
    ball.dy = (collisions.length % 2 === 0) ? ball.dy : -ball.dy;
    // remove all blocks with collision, add score and decrease blocks count
    collisions.forEach(function (block) {
        var index = state.stage.blocks.indexOf(block);
        state.score += Mechanics_1.getBlockScore(block);
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
    if (Mechanics_1.inCollision(state.player, state.ball)) {
        ball.dy = -ball.dy;
    }
};
/**
 * Update current state
 */
var update = function (state) {
    Utils_1.clearScreen(canvas.g, canvas.w, canvas.h);
    handleInputs(state.player);
    updateBall(state);
    detectCollision(state);
    Render_1.render(canvas.g, state);
    setTimeout(function () { return update(state); }, 1000 / 30);
};
/**
 * Add Event listeners to DOM
 */
var addListeners = function () {
    var leftBtnEl = document.getElementById('left-btn');
    var rightBtnEl = document.getElementById('right-btn');
    leftBtnEl.addEventListener('mousedown', function () { leftPad = 1; });
    leftBtnEl.addEventListener('mouseup', function () { leftPad = 0; });
    leftBtnEl.addEventListener('touchstart', function () { leftPad = 1; });
    leftBtnEl.addEventListener('touchend', function () { leftPad = 0; });
    rightBtnEl.addEventListener('mousedown', function () { rightPad = 1; });
    rightBtnEl.addEventListener('mouseup', function () { rightPad = 0; });
    rightBtnEl.addEventListener('touchstart', function () { rightPad = 1; });
    rightBtnEl.addEventListener('touchend', function () { rightPad = 0; });
};
window.onload = function () {
    addListeners();
    generateNewLevel(InitState_1.InitState);
    update(InitState_1.InitState);
};
