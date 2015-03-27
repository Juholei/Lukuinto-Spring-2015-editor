'use strict';

function loadImageToSprite(sprite, imageObjectURL) {
  if (imageObjectURL !== undefined) {
    var oldSpriteWidth = sprite.width;
    var oldSpriteHeight = sprite.height;
    var image = new Image();
    image.onload = function addImageToSprite() {
      sprite.loadTexture(new PIXI.Texture(new PIXI.BaseTexture(image, PIXI.scaleModes.DEFAULT)));
      console.log('Image loaded');
      sprite.width = oldSpriteWidth;
      sprite.height = oldSpriteHeight;
    };
    image.src = imageObjectURL;
  }
}

module.exports = loadImageToSprite;
