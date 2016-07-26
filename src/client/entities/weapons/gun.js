var nextFire = 0;

function createGunEntity(game, x, y, anchor, spriteKey) {
    return {
        damage: 10,
        fireRate: 100,
        sprite: getSprite(game, x, y, anchor, spriteKey),
        fire: fire
    };
}

function getSprite(game, x, y, anchor, spriteKey) {
    var sprite = game.add.sprite(x, y, spriteKey);
    sprite.anchor.setTo(anchor.x, anchor.y);
    return sprite;
}

function fire(game, bullets, weapon) {
    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + weapon.fireRate;

        var bullet = bullets.getFirstExists(false);
        
        bullet.reset(weapon.sprite.world.x, weapon.sprite.world.y);

        bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }
}

module.exports.create = createGunEntity;