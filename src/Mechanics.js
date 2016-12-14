"use strict";
var BlockType_1 = require("./data/BlockType");
/**
 * Check if rectangle is in collision with other rectangle
 */
exports.inCollision = function (rect1, rect2) {
    return (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) ? true : false;
};
/**
 * Return all objects, which are in collision with rectangle
 */
exports.getCollisions = function (rect, rects) {
    return rects.filter(function (r) { return exports.inCollision(rect, r); });
};
/**
 * Get block's score
 */
exports.getBlockScore = function (block) { return BlockType_1.BlockType[block.blockType].score; };
/**
 * Check if 'x' position is outside of left wall
 */
exports.isOutsideLeft = function (x) { return (x < 0); };
/**
 * Check if 'x' position is outside of right wall
 */
exports.isOutsideRight = function (x, width) { return (x > width); };
/**
 * Check if 'y' position is outside of bottom wall
 */
exports.isOutsideDown = function (y) { return (y < 0); };
/**
 * Check if 'y' position is outside of top wall
 */
exports.isOutsideUp = function (y, height) { return (y > height); };
