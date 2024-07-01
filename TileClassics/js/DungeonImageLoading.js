var warriorPic = document.createElement("img");
var dungeonPics = [];
var picsToLoad = 0;

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;

    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function loadImageForDungeonCode(tileCode, fileName) {
    dungeonPics[tileCode] = document.createElement("img");
    beginLoadingImage(dungeonPics[tileCode], fileName);
}

function loadImages() {
    var imageList = [
        { varName: warriorPic, theFile: "warrior.png" },
        { tileType: TILE_GROUND, theFile: "world_ground.png" },
        { tileType: TILE_WALL, theFile: "world_wall.png" },
        { tileType: TILE_GOAL, theFile: "world_goal.png" },
        { tileType: TILE_KEY, theFile: "world_key.png" },
        { tileType: TILE_DOOR, theFile: "world_door.png" }
    ];

    picsToLoad = imageList.length;
    
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForDungeonCode(imageList[i].tileType, imageList[i].theFile);
        }
    }
}