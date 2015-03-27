'use strict';
var PointView = require('../prefabs/pointview');
var MajorPointView = require('../prefabs/majorpointview');
var loadImageToSprite = require('../imageloader');

//Represents the game area in the editor.
//pointViewCallback is set as callbacks for PointView objects that are created here
//based on GameData object that is located in game.data
//MapView itself doesn't use any image, it's just empty Phaser.Image object. That is set to
//the size of the game area and then scaled down.
//The actual background image is displayed in MapView.displayImage, which is a child Phaser.Image object.
var MapView = function(game, pointViewCallback, pointViewCallbackContext) {
  Phaser.Image.call(this, game, 128, 30);
  this.width = 1024;
  this.height = 768;
  this.scale.setTo(0.75, 0.75);
  this.inputEnabled = true;
  this.input.priorityID = 0;
  this.displayImage = game.add.image(0, 0, 'background');
  this.addChild(this.displayImage);
  this.pointViewSprites = this.game.add.group();
  this.addChild(this.pointViewSprites);

  this.startPointViewSprite = this.initializeMajorPointView(this.game.data.startPoint, 0);
  this.endPointViewSprite = this.initializeMajorPointView(this.game.data.endPoint, 1);
  this.initializePointViewsFromGameData(pointViewCallback, pointViewCallbackContext);
  loadImageToSprite(this.displayImage, this.game.data.image);
};

MapView.prototype = Object.create(Phaser.Image.prototype);
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
  this.pointViewSprites.setAll('input.priorityID', 1);
};

MapView.prototype.addPointView = function(pointView) {
  this.pointViewSprites.add(pointView);
};

//Updates the text on PointViews to represent their current indexes.
MapView.prototype.updatePointViews = function() {
  this.pointViewSprites.forEach(function updateIndexText(item) {
      item.updateIndexText();
    }, this);
};

MapView.prototype.initializePointViewsFromGameData = function(callback, context) {
  var pointDataArray = this.game.data.points;
  for (var i = 0; i < pointDataArray.length; i++) {
    var pointView = new PointView(this.game, pointDataArray[i], pointDataArray, callback, context);
    pointView.input.priorityID = 1;
    this.pointViewSprites.add(pointView);
  }
};

MapView.prototype.initializeMajorPointView = function(data, frame) {
  var view = null;
  if (data.x !== undefined) {
    view = new MajorPointView(this.game, data, frame);
    this.addChild(view);
  }
  return view;
};

module.exports = MapView;
