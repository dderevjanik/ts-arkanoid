import { IAppState } from './interfaces/IAppState';
import { IBall } from './interfaces/IBall';
import { IBlock } from './interfaces/IBlock';
import { IRect } from './interfaces/IRect';
import { BlockType } from './data/BlockType';
import { BALL_COLOR, PLAYER_COLOR, HIGHLIGHT_COLOR } from './data/Constants';

type Context2D = CanvasRenderingContext2D;

/**
 * Clear whole screen
 */
export const clearScreen = (g: CanvasRenderingContext2D, w: number, h: number) => {
    g.clearRect(0, 0, w, h);
};


/**
 * Render blocks
 */
const renderBlocks = (g: Context2D, blocks: IBlock[], w: number, h: number) => {
    blocks.forEach((block) => {
        g.fillStyle = BlockType[block.blockType].fillColor;
        g.fillRect(block.x, block.y, w, h);
    });
};

/**
 * Render player
 */
const renderPlayer = (g: Context2D, player: IRect) => {
    g.fillStyle = PLAYER_COLOR;
    g.fillRect(player.x, player.y, player.w, player.h);
};

/**
 * Render bouncing ball
 */
const renderBall = (g: Context2D, ball: IBall) => {
    if (ball.blink) {
        g.fillStyle = BALL_COLOR;
    } else {
        g.fillStyle = HIGHLIGHT_COLOR;
    }
    g.fillRect(ball.x, ball.y, ball.w, ball.h);
};

/**
 * Render game's UI
 */
const renderUI = (g: Context2D, score: number, lives: number, lvl: number) => {
    g.fillText("S: " + score, 1, 299);
    g.fillText("L: " + lives, 240, 299);
    if (lvl < 10) {
        g.fillText("LVL: 0" + lvl, 265, 299);
    } else {
        g.fillText("LVL: " + lvl, 265, 299);
    }
};

/**
 * Render whole App State
 */
export const render = (g: Context2D, appState: IAppState) => {
    renderBlocks(g, appState.stage.blocks, appState.blockSize.w, appState.blockSize.h);
    renderPlayer(g, appState.player);
    renderBall(g, appState.ball);
    renderUI(g, appState.score.score, appState.score.lives, appState.score.level);
};
