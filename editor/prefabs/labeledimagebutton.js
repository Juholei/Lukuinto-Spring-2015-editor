'use strict';

var LabeledImageButton = function(game, x, y, imageKey, label, callback, callbackContext) {
  Phaser.Button.call(this, game, x, y, imageKey, callback, callbackContext, 1, 0);
  var textStyle = {font: '11pt Arial', fill: 'white', align: 'left'};
  var buttonText = this.game.add.text(57, 20, label, textStyle);
  this.addChild(buttonText);
  this.game.add.existing(this);
};

LabeledImageButton.prototype = Object.create(Phaser.Button.prototype);
LabeledImageButton.prototype.constructor = LabeledImageButton;

LabeledImageButton.prototype.update = function() {
};

module.exports = LabeledImageButton;
