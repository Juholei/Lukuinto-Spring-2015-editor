'use strict';

var MajorPointView = function(game, majorPointData, frame) {
  Phaser.Sprite.call(this, game, majorPointData.x, majorPointData.y, 'start-end', frame);
  this.anchor.setTo(0.5, 0.7);
  this.scale.setTo(0.5, 0.5);
  this.majorPointData = majorPointData;
};

MajorPointView.prototype = Object.create(Phaser.Sprite.prototype);
MajorPointView.prototype.constructor = MajorPointView;

MajorPointView.prototype.update = function() {
};

MajorPointView.prototype.changeLocation = function() {
  this.x = this.majorPointData.x;
  this.y = this.majorPointData.y;
};

module.exports = MajorPointView;
