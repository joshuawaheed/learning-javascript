const BOUNCE_BACK = 25;
const GROUNDSPEED_DECAY_MULT = 0.97;
const SPEED = 5;

function warriorClass() {
    this.x = 75;
    this.y = 75;
    this.speed = 0;
    this.myWarriorPic;
    this.name = "Untitled Warrior";
    this.keysCollected = 0;

    this.keyHeld_Up = false;
    this.keyHeld_Left = false;
    this.keyHeld_Down = false;
    this.keyHeld_Right = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);
    }

    this.move = function() {
        this.speed = SPEED;
        
        var col = Math.floor(warrior.x / TILE_W);
        var row = Math.floor(warrior.y / TILE_H);
        var tileType = returnTileTypeAtColRow(col, row);
        var index = rowColToArrayIndex(col, row);

        if (tileType == TILE_WALL || (tileType == TILE_DOOR && this.keysCollected < 1)) {
            if (this.keyHeld_Up) {
                this.y += BOUNCE_BACK;
            }
            if (this.keyHeld_Down) {
                this.y -= BOUNCE_BACK;
            }
            if (this.keyHeld_Left) {
                this.x += BOUNCE_BACK;
            }
            if (this.keyHeld_Right) {
                this.x -= BOUNCE_BACK;
            }
        } else {
            if (tileType == TILE_KEY) {
                this.keysCollected++;
                tileGrid[index] = TILE_GROUND;
            }

            if (tileType == TILE_DOOR && this.keysCollected >= 1) {
                this.keysCollected--;
                tileGrid[index] = TILE_GROUND;
            }

            if (tileType == TILE_GOAL) {
                loadLevel(levelOne);
            }
            
            if (this.keyHeld_Up) {
                this.y -= this.speed;
            }
            if (this.keyHeld_Down) {
                this.y += this.speed;
            }
            if (this.keyHeld_Left) {
                this.x -= this.speed;
            }
            if (this.keyHeld_Right) {
                this.x += this.speed;
            }
        }
    }

    this.reset = function(whichImage, warriorName) {
        this.name = warriorName;
        this.myWarriorPic = whichImage;
        this.speed = 0;
        
        for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

                if (tileGrid[arrayIndex] == TILE_PLAYERSTART) {
                    tileGrid[arrayIndex] = TILE_GROUND;
                    this.x = eachCol * TILE_W + TILE_W / 2;
                    this.y = eachRow * TILE_H + TILE_H / 2;
                    return;
                }
            }
        }

        console.log("NO PLAYER START FOUND!");
    }

    this.setupInput = function(upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }
}

function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < TILE_COLS && row >= 0 && row < TILE_ROWS) {
        var tileIndexUnderCoord = rowColToArrayIndex(col, row);
        return tileGrid[tileIndexUnderCoord];
    } else {
        return TILE_WALL;
    }
}

function rowColToArrayIndex(col, row) {
    return col + TILE_COLS * row;
}