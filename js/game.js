var canvasEl = document.getElementById('canvas');
canvasEl.width = 300;
canvasEl.height = 300;
var leftPad = 0;
var rightPad = 0;
var canvas = {
    el: canvasEl,
    g: canvasEl.getContext('2d'),
    width: canvasEl.width,
    height: canvasEl.height
};
var appState = {
    score: 0,
    lives: 3,
    blocks: [],
    block: {
        w: 30,
        h: 10,
        count: 0
    },
    ball: {
        x: 142,
        y: 260,
        dx: 4,
        dy: 4,
        w: 8,
        h: 8,
        blink: true
    },
    player: {
        x: 110,
        y: 280,
        w: 80,
        h: 10
    }
};
var eColors = ['#BABABA', '#00399C', '#FFFFFF', '#C14230'];
var formation1 = [
    [0, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 4, 3, 3, 4, 0, 0],
    [2, 2, 2, 3, 3, 2, 2, 2],
    [1, 1, 2, 2, 2, 2, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0]
];
var formation2 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 3, 3, 0, 0, 4],
    [2, 2, 1, 3, 3, 1, 2, 2],
    [1, 1, 1, 4, 4, 1, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 0]
];
var formation3 = [
    [4, 4, 3, 3, 3, 3, 4, 4],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 2, 2, 0, 0, 2, 2, 0],
    [0, 4, 0, 0, 0, 0, 4, 0]
];
var debugForm = [
    [0, 0, 0, 0, 4, 0, 0, 0]
];
// formation1, formation2, formation3
var formations = [debugForm];
var generateBlock = function (x, y) {
    var formationIndex = Math.floor(Math.random() * formations.length);
    var formation = formations[formationIndex];
    var blockW = appState.block.w;
    var blockH = appState.block.h;
    formation.forEach(function (row, r) {
        row.forEach(function (block, c) {
            if (block !== 0) {
                appState.blocks.push({
                    x: x + c * blockW + c * 3,
                    y: y + r * blockH + r * 3,
                    color: eColors[block - 1],
                    score: block * 100
                });
                appState.block.count += 1;
            }
        });
    });
};
var clearScreen = function () {
    canvas.g.clearRect(0, 0, canvas.width, canvas.height);
};
var render = function () {
    var w = appState.block.w;
    var h = appState.block.h;
    appState.blocks.forEach(function (block) {
        canvas.g.strokeStyle = "black";
        canvas.g.fillStyle = block.color;
        canvas.g.fillRect(block.x, block.y, w, h);
    });
    canvas.g.fillStyle = "white";
    canvas.g.fillRect(appState.player.x, appState.player.y, appState.player.w, appState.player.h);
    if (appState.ball.blink) {
        canvas.g.fillStyle = "yellow";
    }
    else {
        canvas.g.fillStyle = "#00ffff";
    }
    appState.ball.blink = !appState.ball.blink;
    canvas.g.fillRect(appState.ball.x, appState.ball.y, appState.ball.w, appState.ball.h);
};
var processInput = function () {
    if (leftPad === 1) {
        if (appState.player.x - 7 > 0) {
            appState.player.x -= 7;
        }
    }
    if (rightPad === 1) {
        if (appState.player.x + appState.player.w + 7 < 300) {
            appState.player.x += 7;
        }
    }
    ;
};
var generateNewLevel = function () {
    appState.blocks = [];
    appState.ball.dx += 2;
    appState.ball.dy += 2;
    generateBlock(20, 1);
};
var resetData = function () {
    appState.lives = 3;
    appState.score = 0;
    generateNewLevel();
};
var resetPositions = function () {
    appState.player.x = 110;
    appState.player.y = 280;
    appState.ball.x = 142;
    appState.ball.y = 260;
};
var updateBall = function () {
    var ball = appState.ball;
    if (ball.y + ball.dy > 300) {
        // up collision
        ball.dy = -ball.dy;
        appState.lives -= 1;
        if (appState.lives < 0) {
            resetData();
        }
        resetPositions();
    }
    if (ball.y + ball.dy < 0) {
        // down collision
        ball.dy = -ball.dy;
    }
    if (ball.x + ball.dx > canvas.width || ball.x + ball.dx < 0) {
        // wall collision
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > canvas.height || ball.y + ball.dy < 0) {
        // player colision
        ball.dy = -ball.dy;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
};
var renderUI = function () {
    canvas.g.fillText("S: " + appState.score, 1, 300);
    canvas.g.fillText("L: " + appState.lives, 280, 300);
};
var clearInput = function () {
    leftPad = 0;
    rightPad = 0;
};
var resetGame = function () {
};
var detectCollision = function () {
    var ball = appState.ball;
    var oBlock = appState.block;
    var player = appState.player;
    var toDestroy = [];
    appState.blocks.forEach(function (block) {
        if (block.x < ball.x + ball.w &&
            block.x + oBlock.w > ball.x &&
            block.y < ball.y + ball.h &&
            oBlock.h + block.y > ball.y) {
            ball.dy = -ball.dy;
            toDestroy.push(block);
        }
    });
    toDestroy.forEach(function (block) {
        var index = appState.blocks.indexOf(block);
        appState.score += block.score;
        appState.blocks.splice(index, 1);
        appState.block.count -= 1;
        if (appState.block.count === 0) {
            generateNewLevel();
            resetPositions();
            appState.score += 1000;
        }
    });
    if (player.x < ball.x + ball.w &&
        player.x + player.w > ball.x &&
        player.y < ball.y + ball.h &&
        player.h + player.y > ball.y) {
        ball.dy = -ball.dy;
    }
};
// if (block.x < ball.x + ball.width &&
//    block.x + block.width > ball.x &&
//    block.y < ball.y + ball.height &&
//    block.height + block.y > ball.y) {
// collision detected!
var update = function () {
    clearScreen();
    processInput();
    updateBall();
    detectCollision();
    render();
    renderUI();
    setTimeout(update, 1000 / 30);
};
var setListeners = function () {
    var leftBtnEl = document.getElementById('leftBtn');
    var rightBtnEl = document.getElementById('rightBtn');
    leftBtnEl.addEventListener('touchstart', function () {
        leftPad = 1;
    });
    leftBtnEl.addEventListener('touchend', function () {
        leftPad = 0;
    });
    rightBtnEl.addEventListener('touchstart', function () {
        rightPad = 1;
    });
    rightBtnEl.addEventListener('touchend', function () {
        rightPad = 0;
    });
};
generateBlock(20, 1);
window.onload = function () {
    setListeners();
    update();
};
