var canvas, canvasContext;

var warrior = new warriorClass();

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    clearScreen();
    colorText('LODING IMAGES', canvas.width / 2, canvas.height / 2, 'white', 'center');
    loadImages();
};

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawAll() {
    clearScreen();
    drawTiles();
    warrior.draw();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    setupInput();
    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    tileGrid = whichLevel.slice();
    warrior.reset(warriorPic, "Blue warrior");
}

function moveAll() {
    warrior.move();
}

function updateAll() {
    moveAll();
    drawAll();
}