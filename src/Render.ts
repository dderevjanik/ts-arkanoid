import { IAppState } from './interfaces/IAppState';
import { IBall } from './interfaces/IBall';
import { IBlock } from './interfaces/IBlock';
import { IRect } from './interfaces/IRect';
import { BlockType } from './data/BlockType';

type Context2D = CanvasRenderingContext2D;

const renderBlocks = (g: Context2D, blocks: IBlock[], w: number, h: number) => {
    blocks.forEach((block) => {
        g.fillStyle = BlockType[block.blockType].fillColor;
        g.fillRect(block.x, block.y, w, h);
    });
};

const renderPlayer = (g: Context2D, player: IRect) => {
    g.fillStyle = "white";
    g.fillRect(player.x, player.y, player.w, player.h);
};

const renderBall = (g: Context2D, ball: IBall) => {
    if (ball.blink) {
        g.fillStyle = "yellow";
    } else {
        g.fillStyle = "#00FFFF";
    }
    g.fillRect(ball.x, ball.y, ball.w, ball.h);
};

const renderUI = (g: Context2D, score: number, lives: number) => {
    g.fillText("S: " + score, 1, 300);
    g.fillText("L: " + lives, 280, 300);
};

export const render = (g: Context2D, appState: IAppState) => {
    renderBlocks(g, appState.stage.blocks, appState.blockSize.w, appState.blockSize.h);
    renderPlayer(g, appState.player);
    renderBall(g, appState.ball);
    renderUI(g, appState.score, appState.lives);
};