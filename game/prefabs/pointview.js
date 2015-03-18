'use strict';

var PointView = function(game, pointData, pointDataArray) {
  Phaser.Sprite.call(this, game, pointData.x, pointData.y, 'point', 0);
  this.pointData = pointData;
  this.pointDataArray = pointDataArray;
  this.scale.setTo(0.5, 0.5);
  this.anchor.setTo(0.5, 0.5);
  var index = this.pointDataArray.indexOf(this.pointData);
  var indexString = (index + 1) + '.';
  var text = game.add.text(0, 0, indexString, {font: '32pt Arial', fill: 'white', align: 'center'});
  text.anchor.setTo(0.5, 0.5);
  this.addChild(text);
};

PointView.prototype = Object.create(Phaser.Sprite.prototype);
PointView.prototype.constructor = PointView;

PointView.prototype.update = function() {};

module.exports = PointView;
