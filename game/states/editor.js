'use strict';
var GameDataCreator = require('../gamedata');
var PointView = require('../prefabs/pointview');
var MajorPointView = require('../prefabs/majorpointview');

function Editor() {}
Editor.prototype = {
  create: function() {
    this.game.data = new GameDataCreator.GameData();
    var background = this.game.add.sprite(0, 0, 'background');
    background.scale.setTo(0.75, 0.75);
    this.sprites = this.game.add.group();
    background.inputEnabled = true;
    background.events.onInputDown.add(this.addPoint, this);
  },
  update: function() {
  },
  addPoint: function(sprite, pointer) {
    var newPoint = new GameDataCreator.GamePoint(this.scaleUp(pointer.x), this.scaleUp(pointer.y), 'unvisited');
    this.game.data.points.push(newPoint);
    var pointSprite = new PointView(this.game, newPoint, this.game.data.points);
    this.sprites.add(pointSprite);
    this.updatePreviewText();
  },
  addStartPoint: function(sprite, pointer) {
    var startPoint = new GameDataCreator.MajorPoint(this.scaleUp(pointer.x), this.scaleUp(pointer.y));
    this.game.data.startPoint = startPoint;
    var startPointSprite = new MajorPointView(this.game, startPoint);
    this.sprites.add(startPointSprite);
  },
  updatePreviewText: function() {
    var textArea = window.document.getElementById('outputJSON');
    textArea.value = JSON.stringify(this.game.data, null, 2);
  },
  //Scales up point related numbers from the 0.75 scale of the displayed game area
  //to the correct game area size used in the game
  scaleUp: function(number) {
    var scaleCorrectedNumber = (number / 3) * 4;
    return Math.floor(scaleCorrectedNumber);
  }
};

module.exports = Editor;
