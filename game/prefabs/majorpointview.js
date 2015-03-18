'use strict';

var MajorPointView = function(game, majorPointData, frame) {
  Phaser.Sprite.call(this, game, majorPointData.x, majorPointData.y, 'start-end', frame);
  this.anchor.setTo(0.5, 0.7);
  this.scale.setTo(0.5, 0.5);

  // initialize your prefab here

};

MajorPointView.prototype = Object.create(Phaser.Sprite.prototype);
MajorPointView.prototype.constructor = MajorPointView;

MajorPointView.prototype.update = function() {
};

MajorPointView.prototype.changeLocation = function(majorPointData) {
  this.x = majorPointData.x;
  this.y = majorPointData.y;
};

module.exports = MajorPointView;
