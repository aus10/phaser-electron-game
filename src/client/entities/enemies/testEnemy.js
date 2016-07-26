var Phaser = require('phaser');

function createTestEnemyEntity(game, x, y, spriteKey) {
    return {
        health: 20,
        sprite: createSprite(game, x, y, spriteKey),
        bulletHitEnemy: bulletHitEnemy,
        die: die,
        alive: true
    };
}

function createSprite(game, x, y, spriteKey) {
    var sprite = game.add.sprite(x, y, spriteKey);
    sprite.anchor.setTo(0.5);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.immovable = false;
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.setTo(1, 1);
    return sprite;
}

function bulletHitEnemy(enemySprite, bulletSprite) {
    bulletSprite.kill();
    this.enemy.health -= this.player.weapon.damage;
    if(this.enemy.health <= 0) {
        //enemy.die(enemy);
        enemySprite.kill();
    }
}

function die(enemy) {
    enemy.sprite.kill();
}

module.exports.create = createTestEnemyEntity;