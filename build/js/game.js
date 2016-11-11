System.register("interfaces/IPoint", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("interfaces/ISize", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("interfaces/IRect", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("interfaces/IBlink", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("interfaces/IBall", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("interfaces/IBlock", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("interfaces/IStage", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("interfaces/IAppState", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("data/InitState", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var InitState;
    return {
        setters:[],
        execute: function() {
            exports_9("InitState", InitState = {
                score: 0,
                lives: 3,
                blockSize: {
                    w: 8,
                    h: 8
                },
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
            });
        }
    }
});
System.register("interfaces/ICanvas", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("interfaces/IBlockType", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("data/BlockType", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var BlockType;
    return {
        setters:[],
        execute: function() {
            exports_12("BlockType", BlockType = [
                { fillColor: '#BABABA', score: 100 },
                { fillColor: '#00399C', score: 200 },
                { fillColor: '#FFFFFF', score: 400 },
                { fillColor: '#C14230', score: 600 }
            ]);
        }
    }
});
System.register("Render", ["data/BlockType"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var BlockType_1;
    var renderBlocks, renderPlayer, renderBall, renderUI, render;
    return {
        setters:[
            function (BlockType_1_1) {
                BlockType_1 = BlockType_1_1;
            }],
        execute: function() {
            renderBlocks = function (g, blocks, w, h) {
                blocks.forEach(function (block) {
                    g.fillStyle = BlockType_1.BlockType[block.blockType].fillColor;
                    g.fillRect(block.x, block.y, w, h);
                });
            };
            renderPlayer = function (g, player) {
                g.fillStyle = "white";
                g.fillRect(player.x, player.y, player.w, player.h);
            };
            renderBall = function (g, ball) {
                if (ball.blink) {
                    g.fillStyle = "yellow";
                }
                else {
                    g.fillStyle = "#00FFFF";
                }
                g.fillRect(ball.x, ball.y, ball.w, ball.h);
            };
            renderUI = function (g, score, lives) {
                g.fillText("S: " + score, 1, 300);
                g.fillText("L: " + lives, 280, 300);
            };
            exports_13("render", render = function (g, appState) {
                renderBlocks(g, appState.stage.blocks, appState.blockSize.w, appState.blockSize.h);
                renderPlayer(g, appState.player);
                renderBall(g, appState.ball);
                renderUI(g, appState.score, appState.lives);
            });
        }
    }
});
System.register("Types", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("Stage", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var getRandomFormation, generateNewStage;
    return {
        setters:[],
        execute: function() {
            getRandomFormation = function (formations) {
                var formationIndex = Math.floor(Math.random() * formations.length);
                return formations[formationIndex];
            };
            exports_15("generateNewStage", generateNewStage = function (sx, sy, bw, bh, formations) {
                var blocks = [];
                var count = 0;
                getRandomFormation(formations).forEach(function (row, r) {
                    row.forEach(function (col, c) {
                        if (col !== 0) {
                            blocks.push({
                                blockType: col,
                                x: sx + c * bw + c * 3,
                                y: sy + r * bh + r * 3
                            });
                            count++;
                        }
                    });
                });
                return {
                    blocks: blocks,
                    blockCount: count
                };
            });
        }
    }
});
System.register("Data/Formation1", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Formation1;
    return {
        setters:[],
        execute: function() {
            exports_16("Formation1", Formation1 = [
                [0, 0, 0, 3, 3, 0, 0, 0],
                [0, 0, 4, 3, 3, 4, 0, 0],
                [2, 2, 2, 3, 3, 2, 2, 2],
                [1, 1, 2, 2, 2, 2, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0]
            ]);
        }
    }
});
System.register("Mechanics", ["data/BlockType"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var BlockType_2;
    var inCollision, getCollisions, getBlockScore, isOutsideLeft, isOutsideRight, isOutsideDown, isOutsideUp;
    return {
        setters:[
            function (BlockType_2_1) {
                BlockType_2 = BlockType_2_1;
            }],
        execute: function() {
            exports_17("inCollision", inCollision = function (rect1, rect2) {
                return (rect1.x < rect2.x + rect2.w &&
                    rect1.x + rect1.w > rect2.x &&
                    rect1.y < rect2.y + rect2.h &&
                    rect1.h + rect1.y > rect2.y) ? true : false;
            });
            exports_17("getCollisions", getCollisions = function (rect, rects) {
                return rects.filter(function (r) { return inCollision(r, rect); });
            });
            exports_17("getBlockScore", getBlockScore = function (block) { return BlockType_2.BlockType[block.blockType].score; });
            exports_17("isOutsideLeft", isOutsideLeft = function (x) { return (x < 0); });
            exports_17("isOutsideRight", isOutsideRight = function (x, width) { return (x > width); });
            exports_17("isOutsideDown", isOutsideDown = function (y) { return (y < 0); });
            exports_17("isOutsideUp", isOutsideUp = function (y, height) { return (y > height); });
        }
    }
});
System.register("game", ["data/InitState", "Render", "Stage", "Data/Formation1", "Mechanics"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var InitState_1, Render_1, Stage_1, Formation1_1, Mechanics_1;
    var canvasEl, formations, leftPad, rightPad, canvas, handleInputs, generateNewLevel, resetData, resetPositions, updateBall, clearInput, detectCollision, update, setListeners;
    return {
        setters:[
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
            }],
        execute: function() {
            // need more refactor
            canvasEl = document.getElementById('canvas');
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
                var nX = ball.x + ball.dx;
                var nY = ball.y + ball.dy;
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
            setListeners = function () {
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
                setListeners();
                update(InitState_1.InitState);
            };
        }
    }
});
