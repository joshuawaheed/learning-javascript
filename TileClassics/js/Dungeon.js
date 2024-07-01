const TILE_W = 50;
const TILE_H = 50;
const TILE_GAP = 2;
const TILE_COLS = 16;
const TILE_ROWS = 12;

var levelOne = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
    1, 0, 4, 0, 4, 0, 1, 0, 0, 0, 1, 0, 1, 4, 4, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 5, 1, 5, 1, 1,
    1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

var tileGrid = [];

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;

function drawTiles() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    
    for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
            var tileKindHere = tileGrid[arrayIndex];
            var useImg = dungeonPics[tileKindHere];
            canvasContext.drawImage(dungeonPics[0], drawTileX, drawTileY);
            canvasContext.drawImage(useImg, drawTileX, drawTileY);

            drawTileX += TILE_W;
            arrayIndex++;
        }

        drawTileX = 0;
        drawTileY += TILE_H;
    }
}