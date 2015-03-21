'use strict';
var PointView = require('../prefabs/pointview');
var MajorPointView = require('../prefabs/majorpointview');

var MapView = function(game) {
  Phaser.Sprite.call(this, game, 0, 0);
  this.width = 1024;
  this.height = 768;
  this.scale.setTo(0.75, 0.75);
  this.inputEnabled = true;
  this.displayImage = game.add.image(0, 0, 'background');
  this.addChild(this.displayImage);
  this.pointViewSprites = this.game.add.group();
  this.addChild(this.pointViewSprites);

  this.initializeFromGameData();
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

MapView.prototype.initializeFromGameData = function() {
  if (this.game.data.startPoint.x !== undefined) {
    this.startPointViewSprite = new MajorPointView(this.game, this.game.data.startPoint, 0);
  } else {
    this.startPointViewSprite = null;
  }

  if (this.game.data.endPoint.x !== undefined) {
    this.endPointViewSprite = new MajorPointView(this.game, this.game.data.endPoint, 1);
  } else {
    this.endPointViewSprite = null;
  }

  var pointDataArray = this.game.data.points;

  for (var i = 0; i < pointDataArray.length; i++) {
    this.pointViewSprites.add(new PointView(this.game, pointDataArray[i], pointDataArray));
  }
};

module.exports = MapView;
