var Phaser = require('phaser');
var Utils = require('../utils');

function createPlayerEntity(game, x, y, equipment) {
    var stats = {
        speed: 200    
    };
    
    var playerSprite = createSprite(game, x, y, equipment.armor);
    
    var player = {
        sprite: playerSprite,
        update: update,
        stats: stats,
        equipWeapon: null
    };
    
    player.equipWeapon = equipWeapon(game, player);
    
    return player;
}

function createSprite(game, x, y, key) {
    var sprite = game.add.sprite(x, y, key, 'idle_down/001.png');
    sprite.anchor.setTo(0.5);
    
    // animation
    sprite.animations.add('idle_down', Phaser.Animation.generateFrameNames('idle_down/', 1, 2, '.png', 3), 10, true, false);
    sprite.animations.add('walk_up', Phaser.Animation.generateFrameNames('walk_up/', 1, 4, '.png', 3), 10, true, false);
    sprite.animations.add('walk_down', Phaser.Animation.generateFrameNames('walk_down/', 1, 4, '.png', 3), 10, true, false);
    sprite.animations.add('walk_right', Phaser.Animation.generateFrameNames('walk_right/', 1, 4, '.png', 3), 10, true, false);
    sprite.animations.add('idle_right', Phaser.Animation.generateFrameNames('walk_right/', 1, 1, '.png', 3), 10, true, false);
    
    
    sprite.animations.play('idle_down', 1);
    
    game.add.existing(sprite);
    
    return sprite;
}
    
function update(game, sprite, stats, weapon) {
    var mousePosition = game.input.activePointer.position;
    var isMoving = true;
    
    var spriteScreenPosition = Utils.worldToScreen(game.camera, sprite.x, sprite.y);
    
    sprite.body.velocity.y = 0;
    sprite.body.velocity.x = 0;

    //movement stuff (will be refactored later)
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        sprite.body.velocity.x = -stats.speed;
        sprite.scale.x = -1;
        
        if(mousePosition.x  < spriteScreenPosition.x) {
            Utils.playAnmiationIfNotPlaying(sprite, 'walk_right', 10);
        } else if(mousePosition.x  > spriteScreenPosition.x) {
            sprite.scale.x = 1;
            Utils.playAnmiationIfNotPlaying(sprite, 'walk_right', 10);
        }
        
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        sprite.body.velocity.x = stats.speed;
        sprite.scale.x = -1;
        
        if(mousePosition.x  < spriteScreenPosition.x) {
            Utils.playAnmiationIfNotPlaying(sprite, 'walk_right', 10);
        } else if(mousePosition.x  > spriteScreenPosition.x) {
            sprite.scale.x = 1;
            Utils.playAnmiationIfNotPlaying(sprite, 'walk_right', 10);
        }
        
    } else {
        isMoving = false;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        sprite.body.velocity.y = -stats.speed;
        if(mousePosition.x  < spriteScreenPosition.x) {
            sprite.scale.x = -1;
        } else if(mousePosition.x  > spriteScreenPosition.x) {
            sprite.scale.x = 1;
        }
        Utils.playAnmiationIfNotPlaying(sprite, 'walk_right', 10);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        sprite.body.velocity.y = stats.speed;
        if(mousePosition.x  < spriteScreenPosition.x) {
            sprite.scale.x = -1;
        } else if(mousePosition.x  > spriteScreenPosition.x) {
            sprite.scale.x = 1;
        }
        Utils.playAnmiationIfNotPlaying(sprite, 'walk_right', 10);
    } else {
        if(!isMoving) {
            if(mousePosition.x  < spriteScreenPosition.x) {
                sprite.scale.x = -1;
            } else if(mousePosition.x  > spriteScreenPosition.x) {
                sprite.scale.x = 1;
            }
            Utils.playAnmiationIfNotPlaying(sprite, 'idle_right', 2);
        }
    }
    
    //weapon stuff (will me moved and refactored later)
    weapon.rotation = Utils.angleToPointer(weapon, game.input.activePointer) - sprite.rotation; 
    
    if(sprite.scale.x < 0 && weapon.scale.x > 0) {
        weapon.scale.x = weapon.scale.x * -1;
        weapon.scale.y = weapon.scale.y * -1;
    } else if (sprite.scale.x > 0 && weapon.scale.x < 0) {
        weapon.scale.x = weapon.scale.x * -1;
        weapon.scale.y = weapon.scale.y * -1;
    }
    
    weapon.angle = weapon.angle * sprite.scale.x;
    
    
}

function equipWeapon(game, player) {
    return function(weapon) {
        player.weapon = weapon;
        player.sprite.addChild(weapon.sprite);
        game.add.existing(player.sprite);
    }
}

module.exports.create = createPlayerEntity;
