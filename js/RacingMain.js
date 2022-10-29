var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

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
    drawTracks();
    greenCar.draw();
    blueCar.draw();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    setupInput();
    greenCar.reset(otherCarPic);
    blueCar.reset(carPic);
}

function moveAll() {
    greenCar.move();
    blueCar.move();
}

function updateAll() {
    moveAll();
    drawAll();
}