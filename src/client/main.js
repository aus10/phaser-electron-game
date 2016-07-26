var Phaser = require('phaser');

var BootState = require('./states/Boot');
var SplashState = require('./states/Splash');
var GameState = require('./states/Game');

let width = document.documentElement.clientWidth * window.devicePixelRatio;// > 768 ? 768 : document.documentElement.clientWidth
let height = document.documentElement.clientHeight * window.devicePixelRatio;// > 1024 ? 1024 : document.documentElement.clientHeight

var game = new Phaser.Game(width, height, Phaser.AUTO, 'content');

game.state.add('Boot', BootState, false);
game.state.add('Splash', SplashState, false);
game.state.add('Game', GameState, false);

//this is the object that will hold all the game information. rb = rock bottom (name of game)
var rb = { game : game };

game.state.start('Boot', true, false, rb);


//if (game.device.desktop)  {
    // game.stage.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.stage.scale.minWidth = width/2;
    // game.stage.scale.minHeight = height/2;
    // game.stage.scale.maxWidth = width;
    // game.stage.scale.maxHeight = height;
    // game.stage.scale.pageAlignHorizontally = true;
    // game.stage.scale.pageAlignVertically = true;
    // game.stage.scale.setScreenSize(true);
// }
// else
// {
//     game.stage.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     game.stage.scale.minWidth = gameWidth/2;
//     game.stage.scale.minHeight = gameHeight/2;
//     game.stage.scale.maxWidth = 2048;
//
//     //You can change this to gameWidth*2.5 if needed
//     game.stage.scale.maxHeight = 1228;
//
//     //Make sure these values are proportional to the gameWidth and gameHeight
//     game.stage.scale.pageAlignHorizontally = true;
//     game.stage.scale.pageAlignVertically = true;
//     game.stage.scale.forceOrientation(true, false);
//     game.stage.scale.hasResized.add(game.gameResized, this);
//     game.stage.scale.enterIncorrectOrientation.add(game.enterIncorrectOrientation, this);
//     game.stage.scale.leaveIncorrectOrientation.add(game.leaveIncorrectOrientation, this);
//     game.stage.scale.setScreenSize(true);
// }
