import { IAppState } from './interfaces/IAppState';
import { IBall } from './interfaces/IBall';
import { IBlock } from './interfaces/IBlock';
import { IPlayer } from './interfaces/IPlayer';
import { IItem } from './interfaces/IItem';
import { BlockType } from './data/info/BlockType';
import { PowerType } from './data/info/PowerType';
import { BALL_COLOR, PLAYER_COLOR, HIGHLIGHT_COLOR, PLAYER_PWR_COLOR, BALL_FIRE_COLOR } from './data/Constants';

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

const renderItems = (g: Context2D, items: IItem[]) => {
    items.forEach((item) => {
        console.log(item.type);
        g.fillStyle = 'yellow';
        g.fillRect(item.x, item.y, item.w, item.h);
        g.fillStyle = 'white';
        g.fillText(PowerType[item.type].char, item.x, item.y);
    });
};

/**
 * Render player
 */
const renderPlayer = (g: Context2D, player: IPlayer) => {
    g.fillStyle = PLAYER_COLOR;
    g.fillRect(player.x, player.y, player.w, player.h);
    g.fillStyle = PLAYER_PWR_COLOR;
    g.fillRect(player.x, player.y, player.ew, player.h);
    g.fillRect(player.x + player.w - player.ew, player.y, player.ew, player.h);
};

/**
 * Render bouncing ball
 */
const renderBall = (g: Context2D, ball: IBall, fire: number) => {
    if (fire) {
        g.fillStyle = BALL_FIRE_COLOR;
    } else if (ball.blink) {
        g.fillStyle = HIGHLIGHT_COLOR;
    } else {
        g.fillStyle = BALL_COLOR;
    }
    g.fillRect(ball.x, ball.y, ball.w, ball.h);
};

/**
 * Render game's UI
 */
const renderUI = (g: Context2D, score: number, lives: number, lvl: number) => {
    g.fillStyle = BALL_COLOR;
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
    renderItems(g, appState.items);
    renderPlayer(g, appState.player);
    renderBall(g, appState.ball, appState.player.powerUps.fire.timeleft);
    renderUI(g, appState.score.score, appState.score.lives, appState.score.level);
};
