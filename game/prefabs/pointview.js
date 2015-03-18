'use strict';

var PointView = function(game, pointData, pointDataArray, callback, callbackContext) {
  Phaser.Button.call(this, game, pointData.x, pointData.y, 'point', callback, callbackContext, 0);
  // this.inputEnabled = false;
  this.pointData = pointData;
  this.pointDataArray = pointDataArray;
  this.scale.setTo(0.5, 0.5);
  this.anchor.setTo(0.5, 0.5);
  var index = this.pointDataArray.indexOf(this.pointData);
  var indexString = (index + 1) + '.';
  this.indexText = game.add.text(0, 0, indexString, {font: '32pt Arial', fill: 'white', align: 'center'});
  this.indexText.anchor.setTo(0.5, 0.5);
  this.addChild(this.indexText);
};

PointView.prototype = Object.create(Phaser.Button.prototype);
PointView.prototype.constructor = PointView;

PointView.prototype.update = function() {};

PointView.prototype.updateIndexText = function() {
  var index = this.pointDataArray.indexOf(this.pointData);
  var indexString = (index + 1) + '.';
  this.indexText.text = indexString;
};

module.exports = PointView;
