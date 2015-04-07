'use strict';
var Constants = require('../constants');

//Graphical representation of GamePoint gamedata object.
var PointView = function(game, pointData, pointDataArray, callback, callbackContext) {
  Phaser.Button.call(this, game, pointData.x, pointData.y, 'point', callback, callbackContext, 1, 0);
  this.pointData = pointData;
  this.pointDataArray = pointDataArray;
  this.anchor.setTo(0.5, 0.5);
  var index = this.pointDataArray.indexOf(this.pointData);
  var indexString = (index + 1);
  this.indexText = game.add.text(0, 0, indexString, {font: '20pt Arial', fill: 'white'});
  this.indexText.anchor.setTo(0.5, 0.5);
  this.addChild(this.indexText);
};

PointView.prototype = Object.create(Phaser.Button.prototype);
PointView.prototype.constructor = PointView;

PointView.prototype.update = function() {
  if (!this.alive) {
    this.destroy();
  }
};

PointView.prototype.updateIndexText = function() {
  var index = this.pointDataArray.indexOf(this.pointData);
  var indexString = (index + 1);
  this.indexText.text = indexString;

  if (index === 0 && this.pointData.state !== Constants.pointStates.NEXT) {
    this.pointData.state = Constants.pointStates.NEXT;
  }
};

module.exports = PointView;
