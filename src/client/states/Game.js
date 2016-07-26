var Phaser = require('phaser');
var playerEntity = require('../entities/player');
var gunEntity = require('../entities/weapons/gun');
var testEntity = require('../entities/enemies/testEnemy');
var Utils = require('../utils');

var rb = null;

function init(rockBottomState) {
    rb = rockBottomState;
}

function create() {
    rb.map = createWorld(this);    

    var equipment = {
        armor: 'clotharmor',
        weapon: 'pistol'
    };

    //create player
    rb.player = playerEntity.create(rb.game, rb.game.world.centerX, rb.game.world.centerY, equipment);
    rb.game.physics.enable(rb.player.sprite, Phaser.Physics.ARCADE);
    rb.player.sprite.body.collideWorldBounds = true;
    rb.game.camera.follow(rb.player.sprite);    
    
    //equip weapon
    var gun = gunEntity.create(rb.game, 6, 12, {x: 0.1, y: 0.5}, equipment.weapon)
    Utils.setResponsiveWidth(gun.sprite, 5, rb.game.world);
    rb.player.equipWeapon(gun)

    //create enimies array
    rb.enemies = [];
    
    //create bullets
    rb.playerBullets = createBullets(rb.game);
    
    rb.game.input.onDown.add(onClick, this);
}

function update() {
    rb.game.physics.arcade.collide(rb.player.sprite, this.blockedLayer);
    
    //update all the enimies at one here
    updateEnemies(rb.game, rb.player, rb.enemies);
    
    //let the player update themself
    rb.player.update(rb.game, rb.player.sprite, rb.player.stats, rb.player.weapon.sprite);

    //this.angleToPointer = rb.player.weapon.rotation;
    //this.angleToSprite = rb.game.math.angleBetweenPoints(rb.player.sprite.position, this.testSprite.position);
}

function updateEnemies(game, player, enemies) {
    for (var i = 0; i < enemies.length; i++)
    {
        if (enemies[i].alive)
        {
            game.physics.arcade.collide(player.sprite, enemies[i].sprite);
            //hacky way to pass paramers to bulletHitenemy
            game.physics.arcade.overlap(rb.playerBullets, enemies[i].sprite, enemies[i].bulletHitEnemy, null, {game: rb.game, player: rb.player, enemy: enemies[i]});
            //enemies[i].update();
        }
    }
}

function render() {
    if (__DEV__) {
        rb.game.debug.spriteInfo(rb.player.sprite, 32, 32);
        rb.game.debug.spriteInfo(rb.player.weapon.sprite, 500, 32);

        // var pointer = this.game.input.activePointer;
        // var spriteScreenPosition = Utils.worldToScreen(this.game.camera, this.player.sprite.x, this.player.sprite.y);
        // this.game.debug.pixel(spriteScreenPosition.x,spriteScreenPosition.y, 'yellow', 15);
        // this.game.debug.pixel(this.player.sprite.worldTransform.tx,this.player.sprite.worldTransform.ty, 'red', 10);
        // this.game.debug.text('pointer : ' + pointer.x + ' ' + pointer.y + '  weapon world: ' + this.player.weapon.world.x + ' ' + this.player.weapon.world.y + '   Local weapon pos: ' + this.player.weapon.x + ' ' + this.player.weapon.y, 10, this.game.height - 65 );
        //this.game.debug.text(this.angleToPointer + ' ' + this.angleToSprite + ' ' + (this.angleToPointer/this.angleToSprite), 10, this.game.height - 50);
    }
}

function createWorld(state) {
    state.map = state.game.add.tilemap('testlevel');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    state.map.addTilesetImage('tilesheet', 'gameTiles');

    //create layer
    state.backgroundlayer = state.map.createLayer('Background');
    state.blockedLayer = state.map.createLayer('Walls');

    //collision on blockedLayer
    state.map.setCollisionBetween(1, 2000, true, state.blockedLayer);

    //resizes the game world to match the layer dimensions
    state.backgroundlayer.resizeWorld();

    state.backgroundlayer.wrap = true;
    
    return state.map;
}

function createBullets(game) {
    var bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    return bullets;
}

function spawnEnemy(game, x, y) {
    var testEnemy = testEntity.create(game, x, y, 'mushroom');
    Utils.setResponsiveWidth(testEnemy.sprite, 5, rb.game.world);
    rb.enemies.push(testEnemy);
    rb.game.add.existing(testEnemy.sprite);
}

function onClick() {
    if(rb.game.input.activePointer.isDown) {
        if(rb.game.input.activePointer.button === Phaser.Mouse.RIGHT_BUTTON) {
            var position = Utils.screenToWorld(rb.game.camera, rb.game.input.activePointer.x, rb.game.input.activePointer.y);
            spawnEnemy(rb.game, position.x, position.y);
        }
        if(rb.game.input.activePointer.button === Phaser.Mouse.LEFT_BUTTON) {
            rb.player.weapon.fire(rb.game, rb.playerBullets, rb.player.weapon);
        }
    }
}

var gameState = {
    init: init,
    create: create,
    update: update,
    render: render
};

module.exports = gameState;



