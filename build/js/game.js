System.register(["./data/InitState", "./Render", "./Stage", "./Data/Formation1", "./Mechanics"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var canvasEl, InitState_1, Render_1, Stage_1, Formation1_1, Mechanics_1, leftBtnEl, rightBtnEl, formations, leftPad, rightPad, canvas, handleInputs, generateNewLevel, resetData, resetPositions, updateBall, clearInput, detectCollision, update, addListeners;
    return {
        setters: [
            function (InitState_1_1) {
                InitState_1 = InitState_1_1;
            },
            function (Render_1_1) {
                Render_1 = Render_1_1;
            },
            function (Stage_1_1) {
                Stage_1 = Stage_1_1;
            },
            function (Formation1_1_1) {
                Formation1_1 = Formation1_1_1;
            },
            function (Mechanics_1_1) {
                Mechanics_1 = Mechanics_1_1;
            }
        ],
        execute: function () {
            // need more refactor
            canvasEl = document.getElementById('canvas');
            leftBtnEl = window.document.getElementById('left-btn');
            rightBtnEl = window.document.getElementById('right-btn');
            formations = [Formation1_1.Formation1];
            canvasEl.width = 300;
            canvasEl.height = 300;
            leftPad = 0;
            rightPad = 0;
            canvas = {
                el: canvasEl,
                g: canvasEl.getContext('2d'),
                w: canvasEl.width,
                h: canvasEl.height
            };
            handleInputs = function (player) {
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
            generateNewLevel = function (state) {
                state.ball.dx += 2;
                state.ball.dy += 2;
                state.stage = Stage_1.generateNewStage(20, 1, state.blockSize.w, state.blockSize.h, formations);
            };
            resetData = function (state) {
                state.lives = 3;
                state.score = 0;
                generateNewLevel(state);
            };
            resetPositions = function (state) {
                state.player.x = 110;
                state.player.y = 280;
                state.ball.x = 142;
                state.ball.y = 260;
            };
            updateBall = function (state) {
                var ball = state.ball;
                if (ball.y + ball.dy > 300) {
                    // up collision
                    ball.dy = -ball.dy;
                    state.lives -= 1;
                    if (state.lives < 0) {
                        resetData(state);
                    }
                    resetPositions(state);
                }
                var nX = (ball.x + ball.dx);
                var nY = (ball.y + ball.dy);
                if (Mechanics_1.isOutsideLeft(nX) || Mechanics_1.isOutsideRight(nX, canvas.w)) {
                    ball.dx = -ball.dx;
                }
                if (Mechanics_1.isOutsideDown(nY) || Mechanics_1.isOutsideUp(nY, canvas.h)) {
                    ball.dy = -ball.dy;
                }
                ball.x += ball.dx;
                ball.y += ball.dy;
            };
            clearInput = function () {
                leftPad = 0;
                rightPad = 0;
            };
            detectCollision = function (state) {
                var ball = state.ball;
                var player = state.player;
                var collisions = Mechanics_1.getCollisions(state.ball, state.stage.blocks);
                ball.dy = (collisions.length % 2 === 0) ? ball.dy : -ball.dy;
                collisions.forEach(function (block) {
                    var index = state.stage.blocks.indexOf(block);
                    state.score += Mechanics_1.getBlockScore(block);
                    state.stage.blocks.splice(index, 1);
                    state.stage.blockCount -= 1;
                    if (state.stage.blockCount === 0) {
                        generateNewLevel(state);
                        resetPositions(state);
                        state.score += 1000;
                    }
                });
                if (Mechanics_1.inCollision(state.player, state.ball)) {
                    ball.dy = -ball.dy;
                }
            };
            update = function (state) {
                // clearScreen();
                handleInputs(state.player);
                updateBall(state);
                detectCollision(state);
                Render_1.render(canvas.g, state);
                setTimeout(function () { return update(state); }, 1000 / 30);
            };
            addListeners = function () {
                var leftBtnEl = document.getElementById('leftBtn');
                var rightBtnEl = document.getElementById('rightBtn');
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
                update(InitState_1.InitState);
            };
        }
    };
});
