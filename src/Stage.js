"use strict";
/**
 * Return new enemy formation
 */
var getRandomFormation = function (formations) {
    var formationIndex = Math.floor(Math.random() * formations.length);
    return formations[formationIndex];
};
/**
 * Will generate new stage, only new blocks
 */
exports.generateNewStage = function (sx, sy, bw, bh, formations) {
    var blocks = [];
    var count = 0;
    getRandomFormation(formations).forEach(function (row, r) {
        row.forEach(function (col, c) {
            if (col !== 0) {
                blocks.push({
                    blockType: (col - 1),
                    x: sx + c * bw + c * 3,
                    y: sy + r * bh + r * 3,
                    w: bw,
                    h: bh
                });
                count++;
            }
        });
    });
    return {
        blocks: blocks,
        blockCount: count
    };
};
