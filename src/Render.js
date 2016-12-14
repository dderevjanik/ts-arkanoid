"use strict";
var BlockType_1 = require("./data/BlockType");
var Constants_1 = require("./data/Constants");
/**
 * Render block
 */
var renderBlocks = function (g, blocks, w, h) {
    blocks.forEach(function (block) {
        g.fillStyle = BlockType_1.BlockType[block.blockType].fillColor;
        g.fillRect(block.x, block.y, w, h);
    });
};
/**
 * Render player
 */
var renderPlayer = function (g, player) {
    g.fillStyle = Constants_1.PLAYER_COLOR;
    g.fillRect(player.x, player.y, player.w, player.h);
};
/**
 * Render bouncing ball
 */
var renderBall = function (g, ball) {
    if (ball.blink) {
        g.fillStyle = Constants_1.BALL_COLOR;
    }
    else {
        g.fillStyle = Constants_1.HIGHLIGHT_COLOR;
    }
    g.fillRect(ball.x, ball.y, ball.w, ball.h);
};
/**
 * Render game's UI
 */
var renderUI = function (g, score, lives) {
    g.fillText("S: " + score, 1, 300);
    g.fillText("L: " + lives, 280, 300);
};
/**
 * Render whole App State
 */
exports.render = function (g, appState) {
    renderBlocks(g, appState.stage.blocks, appState.blockSize.w, appState.blockSize.h);
    renderPlayer(g, appState.player);
    renderBall(g, appState.ball);
    renderUI(g, appState.score, appState.lives);
};
