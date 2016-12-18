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
	var Render_1 = __webpack_require__(6);
	var Stage_1 = __webpack_require__(8);
	var EKeyState_1 = __webpack_require__(2);
	var EPowerUp_1 = __webpack_require__(3);
	var Controls_1 = __webpack_require__(14);
	var PowerUp_1 = __webpack_require__(17);
	var Mechanics_1 = __webpack_require__(16);
	var Constants_1 = __webpack_require__(5);
	canvasEl.width = 300;
	canvasEl.height = 300;
	var leftPad = EKeyState_1.EKeyState.UP;
	var rightPad = EKeyState_1.EKeyState.UP;
	var canvas = {
	    el: canvasEl,
	    g: canvasEl.getContext('2d'),
	    w: canvasEl.width,
	    h: canvasEl.height
	};
	/**
	 * Reset current player's data
	 */
	var resetData = function (state) {
	    state.score.lives = Constants_1.START_LIVES;
	    state.score.score = Constants_1.START_SCORE;
	    state.score.level = Constants_1.START_LEVEL;
	    Stage_1.generateNewLevel(state);
	};
	/**
	 * Update ball state
	 */
	var updateBall = function (state) {
	    var ball = state.ball;
	    // prediction for next position
	    var nX = (ball.x + ball.dx);
	    var nY = (ball.y + ball.dy);
	    // detect collision with bottom screen
	    if (Mechanics_1.isOutsideRight(ball.y + ball.dy, 300)) {
	        ball.dy = -ball.dy;
	        state.score.lives -= 1;
	        // if lives < 0, 'reset' whole game
	        if (state.score.lives < 0) {
	            resetData(state);
	        }
	        Mechanics_1.resetPositions(state.player, state.ball);
	    }
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
	 * Detect collision with block objects and execute proper functions
	 */
	var dealWithCollision = function (state) {
	    var ball = state.ball;
	    var player = state.player;
	    var collisions = Mechanics_1.getCollisions(state.ball, state.stage.blocks);
	    if (!state.player.powerUps.fire.timeleft) {
	        ball.dy = ((collisions.length % 2) === 0) ? ball.dy : -ball.dy;
	    }
	    // remove all blocks with collision, add score and decrease blocks count
	    collisions.forEach(function (block) {
	        var index = state.stage.blocks.indexOf(block);
	        state.score.score += Mechanics_1.getBlockScore(block);
	        state.stage.blocks.splice(index, 1);
	        state.stage.blockCount -= 1;
	        // if number of blocks are 0, create new level
	        state.nextItem -= 1;
	        if (state.nextItem === 0) {
	            state.nextItem = Math.floor(Math.random() * 15) + 5;
	            state.items.push(PowerUp_1.createPowerUp(block.x, block.y));
	        }
	        if (state.stage.blockCount === 0) {
	            Stage_1.generateNewLevel(state);
	            Mechanics_1.resetPositions(state.player, state.ball);
	            state.score.score += 1000;
	            state.score.level += 1;
	        }
	    });
	    // check if ball is in collision with player
	    if (Mechanics_1.inCollision(state.player, state.ball)) {
	        // if ((ball.x < state.player.x + 20) && (ball.dx < 0)) {
	        //     ball.dx += 0.5;
	        // } else if ((ball.x > state.player.x + state.player.w - 20) && (ball.dx > 0)) {
	        //     ball.dx += 0.5;
	        // }
	        ball.dy = -ball.dy;
	    }
	    var items = Mechanics_1.getCollisions(state.player, state.items);
	    items.forEach(function (item) {
	        if (item.type === EPowerUp_1.EPowerUp.SIZE) {
	            state.player.powerUps.size.timeleft = 300;
	        }
	        else if (item.type === EPowerUp_1.EPowerUp.FIRE) {
	            state.player.powerUps.fire.timeleft = 150;
	        }
	        state.items.splice(state.items.indexOf(item), 1);
	    });
	    state.items.forEach(function (item) {
	        item.y += 5;
	    });
	};
	/**
	 * Update current state
	 */
	var update = function (state) {
	    Render_1.clearScreen(canvas.g, canvas.w, canvas.h);
	    Controls_1.handleControls(state.player, state.controls);
	    PowerUp_1.handlePowerUps(state);
	    updateBall(state);
	    dealWithCollision(state);
	    Render_1.render(canvas.g, state);
	    setTimeout(function () { return update(state); }, 1000 / 30);
	};
	window.onload = function () {
	    Controls_1.addControlListeners(InitState_1.InitState.controls);
	    Stage_1.generateNewLevel(InitState_1.InitState);
	    update(InitState_1.InitState);
	    var pwrSize = document.getElementById('powerup-size');
	    pwrSize.addEventListener('mousedown', function () {
	        // InitState.player.powerUps = (InitState.player.powerUps & EPowerUp.Size);
	        // InitState.player.x -= 10;
	        // InitState.player.pwrSize = 10;
	        // InitState.player.w = 100;
	    });
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EKeyState_1 = __webpack_require__(2);
	var EPowerUp_1 = __webpack_require__(3);
	var PowerType_1 = __webpack_require__(4);
	var CONST = __webpack_require__(5);
	/**
	 * Initial state of Game
	 */
	exports.InitState = {
	    fps: CONST.MAX_FPS,
	    blockSize: {
	        h: 10,
	        w: 30
	    },
	    score: {
	        score: CONST.START_SCORE,
	        lives: CONST.START_LIVES,
	        level: CONST.START_LEVEL
	    },
	    ball: {
	        x: 142,
	        y: 260,
	        dx: 4,
	        dy: 4,
	        w: 5,
	        h: 5,
	        blink: true,
	        lvlSpeedInc: CONST.BALL_SPEED_INC_PER_LVL
	    },
	    stage: {
	        blockCount: 0,
	        blocks: [],
	        score: CONST.SCORE_PER_LVL,
	        scoreInc: CONST.SCORE_INCREASE_PER_LVL
	    },
	    player: {
	        x: 110,
	        y: 280,
	        w: 80,
	        ew: 15,
	        h: 10,
	        v: 7,
	        powerUps: {
	            size: {
	                type: EPowerUp_1.EPowerUp.SIZE,
	                timeleft: 0,
	                duration: PowerType_1.PowerType[EPowerUp_1.EPowerUp.SIZE].duration,
	                char: PowerType_1.PowerType[EPowerUp_1.EPowerUp.SIZE].char
	            },
	            fire: {
	                type: EPowerUp_1.EPowerUp.FIRE,
	                timeleft: 0,
	                duration: PowerType_1.PowerType[EPowerUp_1.EPowerUp.FIRE].duration,
	                char: PowerType_1.PowerType[EPowerUp_1.EPowerUp.FIRE].char
	            }
	        }
	    },
	    controls: {
	        leftpaddle: EKeyState_1.EKeyState.UP,
	        rightpaddle: EKeyState_1.EKeyState.UP
	    },
	    items: [],
	    nextItem: 1
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var EKeyState;
	(function (EKeyState) {
	    EKeyState[EKeyState["PRESS"] = 0] = "PRESS";
	    EKeyState[EKeyState["UP"] = 1] = "UP";
	})(EKeyState = exports.EKeyState || (exports.EKeyState = {}));
	;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var EPowerUp;
	(function (EPowerUp) {
	    EPowerUp[EPowerUp["SIZE"] = 0] = "SIZE";
	    EPowerUp[EPowerUp["FIRE"] = 1] = "FIRE";
	})(EPowerUp = exports.EPowerUp || (exports.EPowerUp = {}));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EPowerUp_1 = __webpack_require__(3);
	exports.PowerType = [
	    { type: EPowerUp_1.EPowerUp.SIZE, duration: 300, char: 'S' },
	    { type: EPowerUp_1.EPowerUp.FIRE, duration: 150, char: 'F' }
	];


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.HIGHLIGHT_COLOR = '#00FFFF';
	exports.BALL_COLOR = 'yellow';
	exports.BALL_FIRE_COLOR = 'red';
	exports.PLAYER_COLOR = 'white';
	exports.PLAYER_PWR_COLOR = 'cyan';
	exports.START_LIVES = 3;
	exports.START_SCORE = 0;
	exports.START_LEVEL = 1;
	exports.MAX_FPS = 30;
	exports.SCORE_INCREASE_PER_LVL = 1.2;
	exports.SCORE_PER_LVL = 1000;
	exports.BALL_SPEED_INC_PER_LVL = 2;
	exports.PADDLE_INIT_W = 80;
	exports.PADDLE_INIT_EW = 15;
	exports.PADDLE_INIT_X = 110;
	exports.PADDLE_INIT_Y = 280;
	exports.BALL_INIT_X = 142;
	exports.BALL_INIT_Y = 260;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BlockType_1 = __webpack_require__(7);
	var PowerType_1 = __webpack_require__(4);
	var Constants_1 = __webpack_require__(5);
	/**
	 * Clear whole screen
	 */
	exports.clearScreen = function (g, w, h) {
	    g.clearRect(0, 0, w, h);
	};
	/**
	 * Render blocks
	 */
	var renderBlocks = function (g, blocks, w, h) {
	    blocks.forEach(function (block) {
	        g.fillStyle = BlockType_1.BlockType[block.blockType].fillColor;
	        g.fillRect(block.x, block.y, w, h);
	    });
	};
	var renderItems = function (g, items) {
	    items.forEach(function (item) {
	        console.log(item.type);
	        g.fillStyle = 'yellow';
	        g.fillRect(item.x, item.y, item.w, item.h);
	        g.fillStyle = 'white';
	        g.fillText(PowerType_1.PowerType[item.type].char, item.x, item.y);
	    });
	};
	/**
	 * Render player
	 */
	var renderPlayer = function (g, player) {
	    g.fillStyle = Constants_1.PLAYER_COLOR;
	    g.fillRect(player.x, player.y, player.w, player.h);
	    g.fillStyle = Constants_1.PLAYER_PWR_COLOR;
	    g.fillRect(player.x, player.y, player.ew, player.h);
	    g.fillRect(player.x + player.w - player.ew, player.y, player.ew, player.h);
	};
	/**
	 * Render bouncing ball
	 */
	var renderBall = function (g, ball, fire) {
	    if (fire) {
	        g.fillStyle = Constants_1.BALL_FIRE_COLOR;
	    }
	    else if (ball.blink) {
	        g.fillStyle = Constants_1.HIGHLIGHT_COLOR;
	    }
	    else {
	        g.fillStyle = Constants_1.BALL_COLOR;
	    }
	    g.fillRect(ball.x, ball.y, ball.w, ball.h);
	};
	/**
	 * Render game's UI
	 */
	var renderUI = function (g, score, lives, lvl) {
	    g.fillStyle = Constants_1.BALL_COLOR;
	    g.fillText("S: " + score, 1, 299);
	    g.fillText("L: " + lives, 240, 299);
	    if (lvl < 10) {
	        g.fillText("LVL: 0" + lvl, 265, 299);
	    }
	    else {
	        g.fillText("LVL: " + lvl, 265, 299);
	    }
	};
	/**
	 * Render whole App State
	 */
	exports.render = function (g, appState) {
	    renderBlocks(g, appState.stage.blocks, appState.blockSize.w, appState.blockSize.h);
	    renderItems(g, appState.items);
	    renderPlayer(g, appState.player);
	    renderBall(g, appState.ball, appState.player.powerUps.fire.timeleft);
	    renderUI(g, appState.score.score, appState.score.lives, appState.score.level);
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.BlockType = [
	    { fillColor: '#BABABA', score: 100 },
	    { fillColor: '#00399C', score: 200 },
	    { fillColor: '#FFFFFF', score: 400 },
	    { fillColor: '#C14230', score: 600 }
	];


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Formations_1 = __webpack_require__(9);
	// List of possible enemy formations to generate
	var formations = [Formations_1.Formation1, Formations_1.Formation2, Formations_1.Formation3];
	/**
	 * Return new enemy formation
	 */
	var getRandomFormation = function () {
	    var formationIndex = Math.floor(Math.random() * formations.length);
	    return formations[formationIndex];
	};
	/**
	 * Will generate new stage, only new blocks
	 */
	var generateNewStage = function (sx, sy, bw, bh, stage) {
	    var blocks = [];
	    var count = 0;
	    getRandomFormation().forEach(function (row, r) {
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
	        blockCount: count,
	        score: (stage.score * stage.scoreInc),
	        scoreInc: stage.score
	    };
	};
	/**
	 * Will generate new level with ball centered in above paddle
	 */
	exports.generateNewLevel = function (state) {
	    state.ball.dx += state.ball.lvlSpeedInc;
	    state.ball.dy += state.ball.lvlSpeedInc;
	    state.stage = generateNewStage(20, 1, state.blockSize.w, state.blockSize.h, state.stage);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Formation1_1 = __webpack_require__(10);
	exports.Formation1 = Formation1_1.Formation1;
	var Formation2_1 = __webpack_require__(11);
	exports.Formation2 = Formation2_1.Formation2;
	var Formation3_1 = __webpack_require__(12);
	exports.Formation3 = Formation3_1.Formation3;
	var FormationDebug_1 = __webpack_require__(13);
	exports.FormationDebug = FormationDebug_1.FormationDebug;


/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	"use strict";
	exports.Formation2 = [
	    [0, 0, 0, 0, 0, 0, 0, 0],
	    [4, 0, 0, 3, 3, 0, 0, 4],
	    [2, 2, 1, 3, 3, 1, 2, 2],
	    [1, 1, 1, 4, 4, 1, 1, 1],
	    [0, 0, 0, 1, 1, 0, 0, 0]
	];


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	exports.Formation3 = [
	    [4, 4, 3, 3, 3, 3, 4, 4],
	    [0, 0, 1, 2, 2, 1, 0, 0],
	    [1, 1, 1, 1, 1, 1, 1, 1],
	    [0, 2, 2, 0, 0, 2, 2, 0],
	    [0, 4, 0, 0, 0, 0, 4, 0]
	];


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.FormationDebug = [
	    [0, 0, 0, 0, 4, 0, 0, 0]
	];


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EKeyState_1 = __webpack_require__(2);
	var EKey_1 = __webpack_require__(15);
	var Mechanics_1 = __webpack_require__(16);
	/**
	 * Add Event listeners to DOM
	 */
	exports.addControlListeners = function (controls) {
	    var leftBtnEl = document.getElementById('left-btn');
	    var rightBtnEl = document.getElementById('right-btn');
	    var body = document.getElementsByTagName('body');
	    // mouse control
	    leftBtnEl.addEventListener('mousedown', function () { controls.leftpaddle = EKeyState_1.EKeyState.PRESS; });
	    leftBtnEl.addEventListener('mouseup', function () { controls.leftpaddle = EKeyState_1.EKeyState.UP; });
	    rightBtnEl.addEventListener('mousedown', function () { controls.rightpaddle = EKeyState_1.EKeyState.PRESS; });
	    rightBtnEl.addEventListener('mouseup', function () { controls.rightpaddle = EKeyState_1.EKeyState.UP; });
	    // touch screen
	    leftBtnEl.addEventListener('touchstart', function () { controls.leftpaddle = EKeyState_1.EKeyState.PRESS; });
	    leftBtnEl.addEventListener('touchend', function () { controls.leftpaddle = EKeyState_1.EKeyState.UP; });
	    rightBtnEl.addEventListener('touchstart', function () { controls.rightpaddle = EKeyState_1.EKeyState.PRESS; });
	    rightBtnEl.addEventListener('touchend', function () { controls.rightpaddle = EKeyState_1.EKeyState.UP; });
	    // keyboard control
	    document.addEventListener('keydown', function (e) {
	        switch (e.keyCode) {
	            case EKey_1.EKey.LEFT:
	                controls.leftpaddle = EKeyState_1.EKeyState.PRESS;
	                break;
	            case EKey_1.EKey.RIGHT:
	                controls.rightpaddle = EKeyState_1.EKeyState.PRESS;
	                break;
	        }
	    });
	    document.addEventListener('keyup', function (e) {
	        switch (e.keyCode) {
	            case EKey_1.EKey.LEFT:
	                controls.leftpaddle = EKeyState_1.EKeyState.UP;
	                break;
	            case EKey_1.EKey.RIGHT:
	                controls.rightpaddle = EKeyState_1.EKeyState.UP;
	                break;
	        }
	    });
	};
	/**
	 * Clear current inputs
	 */
	exports.clearControls = function (controls) {
	    controls.leftpaddle = EKeyState_1.EKeyState.UP;
	    controls.rightpaddle = EKeyState_1.EKeyState.UP;
	};
	/**
	 * Handle player inputs
	 */
	exports.handleControls = function (player, controls) {
	    if (controls.leftpaddle === EKeyState_1.EKeyState.PRESS) {
	        if (!Mechanics_1.isOutsideLeft(player.x - player.v)) {
	            player.x -= player.v;
	        }
	    }
	    if (controls.rightpaddle === EKeyState_1.EKeyState.PRESS) {
	        if (!Mechanics_1.isOutsideRight(player.x + player.w + player.v, 300)) {
	            player.x += player.v;
	        }
	    }
	    ;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var EKey;
	(function (EKey) {
	    EKey[EKey["LEFT"] = 37] = "LEFT";
	    EKey[EKey["RIGHT"] = 39] = "RIGHT";
	})(EKey = exports.EKey || (exports.EKey = {}));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BlockType_1 = __webpack_require__(7);
	var CONST = __webpack_require__(5);
	/**
	 * Reset paddle and ball positions
	 */
	exports.resetPositions = function (player, ball) {
	    player.x = CONST.PADDLE_INIT_X;
	    player.y = CONST.PADDLE_INIT_Y;
	    ball.x = CONST.BALL_INIT_X;
	    ball.y = CONST.BALL_INIT_Y;
	};
	/**
	 * Check if rectangle is in collision with other rectangle
	 */
	exports.inCollision = function (rect1, rect2) {
	    return ((rect1.x < rect2.x + rect2.w) &&
	        (rect1.x + rect1.w > rect2.x) &&
	        (rect1.y < rect2.y + rect2.h) &&
	        (rect1.h + rect1.y > rect2.y)) ? true : false;
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(5);
	var EPowerUp_1 = __webpack_require__(3);
	var availablePowerUps = [EPowerUp_1.EPowerUp.SIZE, EPowerUp_1.EPowerUp.FIRE];
	var noTimeLeft = function (powerup) { return (powerup.timeleft === 0); };
	var active = function (powerup) { return (powerup.timeleft); };
	var justStarted = function (powerup) { return (powerup === powerup.duration); };
	/**
	 * Create random powerup at specific position
	 */
	exports.createPowerUp = function (x, y) { return ({
	    type: Math.floor(Math.random() * availablePowerUps.length),
	    x: x,
	    y: y,
	    w: 20,
	    h: 20
	}); };
	exports.handlePowerUps = function (state) {
	    var powerups = state.player.powerUps;
	    if (active(powerups.fire)) {
	        powerups.fire.timeleft -= 1;
	    }
	    if (active(powerups.size)) {
	        if (justStarted(powerups.size)) {
	            state.player.x -= Constants_1.PADDLE_INIT_EW;
	        }
	        state.player.w = (Constants_1.PADDLE_INIT_W + (2 * Constants_1.PADDLE_INIT_EW));
	        powerups.size.timeleft -= 1;
	        if (noTimeLeft(powerups.size)) {
	            state.player.w = Constants_1.PADDLE_INIT_W;
	        }
	    }
	};


/***/ }
/******/ ]);