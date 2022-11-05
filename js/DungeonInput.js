const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mouseX = 0;
var mouseY = 0;

function keyPressed(evt) {
    keySet(evt, warrior, true);
}

function keyReleased(evt) {
    keySet(evt, warrior, false);
}

function keySet(keyEvent, whichCar, setTo) {
    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeld_Left = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeld_Right = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeld_Up = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeld_Down = setTo;
    }
}

function setupInput() {
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    warrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}