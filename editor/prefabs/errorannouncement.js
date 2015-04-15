'use strict';
var LabeledButton = require('../prefabs/labeledbutton');

var Announcement = function(game, callback, callbackContext, text) {
  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY);
  this.game = game;
  this.anchor.setTo(0.5, 0.5);
  this.textStyle = {font: '30px Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 280};

  this.addOverlay();
  this.addBackgroundBox();
  this.addTitleText(text);
  this.addOkButton(0, 108, callback, callbackContext);
  this.game.add.existing(this);
};

Announcement.prototype = Object.create(Phaser.Sprite.prototype);
Announcement.prototype.constructor = Announcement;

Announcement.prototype.update = function() {
};

Announcement.prototype.addOverlay = function() {
  var bitmapData = this.game.add.bitmapData(1, 1);
  bitmapData.fill(0, 0, 0, 0.7);
  var overlay = this.game.add.sprite(0, 0, bitmapData);
  overlay.anchor.setTo(0.5, 0.5);
  overlay.height = 768;
  overlay.width = 1024;
  this.addChild(overlay);
};

Announcement.prototype.addBackgroundBox = function() {
  var backgroundKey = 'announcement-negative';
  var background = this.game.add.sprite(0, 0, backgroundKey);
  background.anchor.setTo(0.5, 0.5);
  this.addChild(background);
};

Announcement.prototype.addTitleText = function(string) {
  var text = this.game.add.text(0, 20, string, this.textStyle);
  text.anchor.setTo(0.5, 0.5);
  this.addChild(text);
};

Announcement.prototype.addOkButton = function(x, y, callback, callbackContext) {
  var button = new LabeledButton(this.game, x, y, 'OK', callback, callbackContext);
  this.addChild(button);
};

module.exports = Announcement;
