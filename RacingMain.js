var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    setupInput();
    carImageLoad();
    carReset();
};

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawAll() {
    clearScreen();
    carDraw();
    drawTracks();
}

function moveAll() {
    carMove();
    carTrackHandling();
}

function updateAll() {
    moveAll();
    drawAll();
}