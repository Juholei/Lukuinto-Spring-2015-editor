'use strict';

var MajorPointView = function(game, majorPointData) {
  Phaser.Sprite.call(this, game, majorPointData.x * 0.75, majorPointData.y * 0.75, 'start-end', 0);
  this.anchor.setTo(0.5, 0.7);
  this.scale.setTo(0.5, 0.5);

  // initialize your prefab here

};

MajorPointView.prototype = Object.create(Phaser.Sprite.prototype);
MajorPointView.prototype.constructor = MajorPointView;

MajorPointView.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = MajorPointView;
