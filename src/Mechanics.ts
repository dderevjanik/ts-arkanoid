import { IBall } from './interfaces/IBall';
import { IBlock } from './interfaces/IBlock';
import { IPlayer } from './interfaces/IPlayer';
import { IRect } from './interfaces/IRect';
import { BlockType } from './data/BlockType';
import * as CONST from './data/Constants';

/**
 * Reset paddle and ball positions
 */
export const resetPositions = (player: IPlayer, ball: IBall) => {
    player.x = CONST.PADDLE_INIT_X;
    player.y = CONST.PADDLE_INIT_Y;
    ball.x = CONST.BALL_INIT_X;
    ball.y = CONST.BALL_INIT_Y;
};

/**
 * Check if rectangle is in collision with other rectangle
 */
export const inCollision = (rect1: IRect, rect2: IRect): boolean =>
    ((rect1.x < rect2.x + rect2.w) &&
    (rect1.x + rect1.w > rect2.x) &&
    (rect1.y < rect2.y + rect2.h) &&
    (rect1.h + rect1.y > rect2.y)) ? true : false;

/**
 * Return all objects, which are in collision with rectangle
 */
export const getCollisions = <T extends IRect>(rect: IRect, rects: T[]): T[] =>
    rects.filter((r) => inCollision(rect, r));

/**
 * Get block's score
 */
export const getBlockScore = (block: IBlock) => BlockType[block.blockType].score;

/**
 * Check if 'x' position is outside of left wall
 */
export const isOutsideLeft = (x: number) => (x < 0);

/**
 * Check if 'x' position is outside of right wall
 */
export const isOutsideRight = (x: number, width: number) => (x > width);

/**
 * Check if 'y' position is outside of bottom wall
 */
export const isOutsideDown = (y: number) => (y < 0);

/**
 * Check if 'y' position is outside of top wall
 */
export const isOutsideUp = (y: number, height: number) => (y > height);
