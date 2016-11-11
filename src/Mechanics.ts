import { IBlock } from './interfaces/IBlock';
import { IRect } from './interfaces/IRect';
import { BlockType } from './data/BlockType';

export const inCollision = (rect1: IRect, rect2: IRect): boolean =>
    (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) ? true : false;

export const getCollisions = (rect: IRect, rects: IRect[]): IRect[] =>
    rects.filter((r) => inCollision(r, rect));

export const getBlockScore = (block: IBlock) => BlockType[block.blockType].score;

export const isOutsideLeft = (x: number) => (x < 0);
export const isOutsideRight = (x: number, width: number) => (x > width);
export const isOutsideDown = (y: number) => (y < 0);
export const isOutsideUp = (y: number, height: number) => (y > height);
