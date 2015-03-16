'use strict';

var PointView = function(game, pointData) {
  Phaser.Sprite.call(this, game, pointData.x, pointData.y, 'point', 0);
  this.PointData = pointData;
  this.scale.setTo(0.5, 0.5);
  this.anchor.setTo(0.5, 0.5);
  var text = game.add.text(0, 0, '1.', {font: '32px Arial', fill: 'white', align: 'center'});
  text.anchor.setTo(0.5, 0.5);
  this.addChild(text);
};

PointView.prototype = Object.create(Phaser.Sprite.prototype);
PointView.prototype.constructor = PointView;

PointView.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = PointView;
