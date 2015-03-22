'use strict';

var PointEditScreen = function(game, pointData) {
  Phaser.Image.call(this, game, 500, 100, 'point-edit-screen');
  this.pointData = pointData;
};

PointEditScreen.prototype = Object.create(Phaser.Image.prototype);
PointEditScreen.prototype.constructor = PointEditScreen;

PointEditScreen.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = PointEditScreen;
