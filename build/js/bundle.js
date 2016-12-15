/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// need more refactor
	var canvasEl = document.getElementById('canvas');
	var InitState_1 = __webpack_require__(1);
	var Render_1 = __webpack_require__(2);
	var Stage_1 = __webpack_require__(5);
	var Utils_1 = __webpack_require__(6);
	var Formation1_1 = __webpack_require__(7);
	var Mechanics_1 = __webpack_require__(8);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.InitState = {
	    blockSize: {
	        h: 10,
	        w: 30
	    },
	    score: 0,
	    lives: 3,
	    ball: {
	        x: 142,
	        y: 260,
	        dx: 4,
	        dy: 4,
	        w: 5,
	        h: 5,
	        blink: true
	    },
	    stage: {
	        blockCount: 0,
	        blocks: []
	    },
	    player: {
	        x: 110,
	        y: 280,
	        w: 80,
	        h: 10
	    },
	    playerSpeed: 7
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BlockType_1 = __webpack_require__(3);
	var Constants_1 = __webpack_require__(4);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.BlockType = [
	    { fillColor: '#BABABA', score: 100 },
	    { fillColor: '#00399C', score: 200 },
	    { fillColor: '#FFFFFF', score: 400 },
	    { fillColor: '#C14230', score: 600 }
	];


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.BALL_COLOR = 'yellow';
	exports.PLAYER_COLOR = 'white';
	exports.HIGHLIGHT_COLOR = '#00FFFF';


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Clear whole screen
	 */
	exports.clearScreen = function (g, w, h) {
	    g.clearRect(0, 0, w, h);
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.Formation1 = [
	    [0, 0, 0, 3, 3, 0, 0, 0],
	    [0, 0, 4, 3, 3, 4, 0, 0],
	    [2, 2, 2, 3, 3, 2, 2, 2],
	    [1, 1, 2, 2, 2, 2, 1, 1],
	    [0, 1, 1, 1, 1, 1, 1, 0]
	];


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BlockType_1 = __webpack_require__(3);
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


/***/ }
/******/ ]);