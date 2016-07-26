export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const getRandomInt = (min, max) => {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export const playAnmiationIfNotPlaying = (sprite, animationName, speed) => {
    if(sprite.animations.currentAnim.name !== animationName) {
        sprite.animations.play(animationName, speed);
    }
}

export const angleToPointer = (displayObject, pointer) => {
    var dx = pointer.worldX - displayObject.world.x;
    var dy = pointer.worldY - displayObject.world.y;

    return Math.atan2(dy, dx);
}

export const worldToScreen = (camera,x,y) => {
    return {x: x - camera.x, y: y - camera.y};
}

export const screenToWorld = (camera,x,y) => {
    return {x: x + camera.x, y: y + camera.y};
}
