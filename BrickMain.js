var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    canvas.addEventListener('mousemove', updateMousePosition);
    brickReset();
    ballReset();
};

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawAll() {
    clearScreen();
    drawBall();
    drawPaddle();
    drawBricks();
}

function moveAll() {
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
}

function updateAll() {
    moveAll();
    drawAll();
}

function updateMousePosition(evt) {
    updateMousePos(evt);
    paddleX = mouseX - PADDLE_WIDTH / 2;
}