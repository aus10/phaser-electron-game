var Phaser = require('phaser');
var Utils = require('../utils');

var rb = null;

var splashState = {
    init: function(rockBottomState) {
        rb = rockBottomState;
    },
    preload: function() {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      Utils.centerGameObjects([this.loaderBg, this.loaderBar]);

      this.load.setPreloadSprite(this.loaderBar);
      
      //load all assets
      this.load.image('testweapon', 'assets/images/1/weapons/test.png');
      this.load.image('pistol', 'assets/images/1/weapons/pistol/pistol.png');
      this.load.image('bullet', 'assets/images/1/weapons/bullet.png');
      this.load.atlasJSONHash('clotharmor', 'assets/images/1/clotharmor/clotharmor.png', 'assets/images/1/clotharmor/clotharmor.json');
  
      this.load.tilemap('testlevel', 'assets/maps/test/test.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('gameTiles', 'assets/images/bq/tilesheet.png');
      
      this.load.image('mushroom', 'assets/images/mushroom2.png');
},
  create: function() {
    this.state.start('Game', true, false, rb)
  }
};

module.exports = splashState;
