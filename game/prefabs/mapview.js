'use strict';
var MajorPointView = require('../prefabs/majorpointview');

var MapView = function(game) {
  Phaser.Sprite.call(this, game, 0, 0, 'background');
  this.scale.setTo(0.75, 0.75);
  this.inputEnabled = true;
  this.pointViewSprites = this.game.add.group();
  this.addChild(this.pointViewSprites);
  this.startPointViewSprite = null;
  this.endPointViewSprite = null;
};

MapView.prototype = Object.create(Phaser.Sprite.prototype);
MapView.prototype.constructor = MapView;

MapView.prototype.update = function() {
};

MapView.prototype.updateStartPoint = function() {
  if (this.startPointViewSprite === null) {
    this.startPointViewSprite = new MajorPointView(this.game, this.game.data.startPoint, 0);
    this.addChild(this.startPointViewSprite);
  } else {
    this.startPointViewSprite.changeLocation();
  }
};

MapView.prototype.updateEndPoint = function() {
  if (this.endPointViewSprite === null) {
    this.endPointViewSprite = new MajorPointView(this.game, this.game.data.endPoint, 1);
    this.addChild(this.endPointViewSprite);
  } else {
    this.endPointViewSprite.changeLocation();
  }
};
MapView.prototype.toggleInputOnPointViews = function(inputValue) {
  this.pointViewSprites.setAll('inputEnabled', inputValue);
};

MapView.prototype.addPointView = function(pointView) {
  this.pointViewSprites.add(pointView);
};

MapView.prototype.updatePointViews = function() {
  this.pointViewSprites.forEach(function updateIndexText(item) {
      item.updateIndexText();
    }, this);
};

module.exports = MapView;
