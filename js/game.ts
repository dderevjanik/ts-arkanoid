const canvasEl = <HTMLCanvasElement>document.getElementById('canvas');

canvasEl.width = 300;
canvasEl.height = 300;

let leftPad = 0;
let rightPad = 0;

const canvas = {
    el: canvasEl,
    g: canvasEl.getContext('2d'),
    width: canvasEl.width,
    height: canvasEl.height
};

interface IPoint {
    x: number;
    y: number;
}

interface IActor extends IPoint {
    w: number;
    h: number;
}

interface IBlock extends IPoint {
    color: string;
    score: number;
}

interface IAppState {
    score: number;
    lives: number;
    block: { w: number, h: number, count: number };
    blocks: IBlock[];
    ball: IActor & { blink: boolean, dx: number, dy: number };
    player: IActor;
}

const appState: IAppState = {
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

const eColors = ['#BABABA', '#00399C', '#FFFFFF', '#C14230'];

const formation1 = [
    [0, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 4, 3, 3, 4, 0, 0],
    [2, 2, 2, 3, 3, 2, 2, 2],
    [1, 1, 2, 2, 2, 2, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0]
];

const formation2 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 3, 3, 0, 0, 4],
    [2, 2, 1, 3, 3, 1, 2, 2],
    [1, 1, 1, 4, 4, 1, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 0]
];

const formation3 = [
    [4, 4, 3, 3, 3, 3, 4, 4],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 2, 2, 0, 0, 2, 2, 0],
    [0, 4, 0, 0, 0, 0, 4, 0]
];

const debugForm = [
    [0, 0, 0, 0, 4, 0, 0, 0]
];

// formation1, formation2, formation3
const formations = [debugForm];

const generateBlock = (x: number, y: number) => {
    const formationIndex = Math.floor(Math.random() * formations.length);
    const formation = formations[formationIndex];

    const blockW = appState.block.w;
    const blockH = appState.block.h;

    formation.forEach((row, r) => {
        row.forEach((block, c) => {
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
    })
}

const clearScreen = () => {
    canvas.g.clearRect(0, 0, canvas.width, canvas.height);
}

const render = () => {
    const w = appState.block.w;
    const h = appState.block.h;
    appState.blocks.forEach((block) => {
        canvas.g.strokeStyle = "black";
        canvas.g.fillStyle = block.color;
        canvas.g.fillRect(block.x, block.y, w, h);
    });
    canvas.g.fillStyle = "white";
    canvas.g.fillRect(appState.player.x, appState.player.y, appState.player.w, appState.player.h);
    if (appState.ball.blink) {
        canvas.g.fillStyle = "yellow";
    } else {
        canvas.g.fillStyle = "#00ffff";
    }
    appState.ball.blink = !appState.ball.blink;
    canvas.g.fillRect(appState.ball.x, appState.ball.y, appState.ball.w, appState.ball.h);
}

const processInput = () => {
    if (leftPad === 1) {
        if (appState.player.x - 7 > 0) {
            appState.player.x -= 7;
        }
    }
    if (rightPad === 1) {
        if (appState.player.x + appState.player.w + 7 < 300) {
            appState.player.x += 7;
        }
    };
}

const generateNewLevel = () => {
    appState.blocks = [];
    appState.ball.dx += 2;
    appState.ball.dy += 2;
    generateBlock(20, 1);
}

const resetData = () => {
    appState.lives = 3;
    appState.score = 0;
    generateNewLevel();
}

const resetPositions = () => {
    appState.player.x = 110;
    appState.player.y = 280;
    appState.ball.x = 142;
    appState.ball.y = 260;
};

const updateBall = () => {
    const ball = appState.ball;
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
}

const renderUI = () => {
    canvas.g.fillText("S: " + appState.score, 1, 300);
    canvas.g.fillText("L: " + appState.lives, 280, 300);
};

const clearInput = () => {
    leftPad = 0;
    rightPad = 0;
};

const resetGame = () => {

};

const detectCollision = () => {
    const ball = appState.ball;
    const oBlock = appState.block;
    const player = appState.player;
    const toDestroy: IBlock[] = [];

    appState.blocks.forEach((block) => {
        if (block.x < ball.x + ball.w &&
            block.x + oBlock.w > ball.x &&
            block.y < ball.y + ball.h &&
            oBlock.h + block.y > ball.y) {
            ball.dy = -ball.dy;
            toDestroy.push(block);
        }
    });

    toDestroy.forEach((block) => {
        const index = appState.blocks.indexOf(block);
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

}

// if (block.x < ball.x + ball.width &&
//    block.x + block.width > ball.x &&
//    block.y < ball.y + ball.height &&
//    block.height + block.y > ball.y) {
// collision detected!



const update = () => {
    clearScreen();
    processInput();
    updateBall();
    detectCollision();
    render();
    renderUI();
    setTimeout(update, 1000 / 30);
};

const setListeners = () => {
    const leftBtnEl = document.getElementById('leftBtn');
    const rightBtnEl = document.getElementById('rightBtn');

    leftBtnEl.addEventListener('mousedown', () => {
        leftPad = 1;
    });
    leftBtnEl.addEventListener('mouseup', () => {
        leftPad = 0;
    });
    rightBtnEl.addEventListener('mousedown', () => {
        rightPad = 1;
    });
    rightBtnEl.addEventListener('mouseup', () => {
        rightPad = 0;
    });
}

generateBlock(20, 1);
window.onload = () => {
    setListeners();
    update();
}

