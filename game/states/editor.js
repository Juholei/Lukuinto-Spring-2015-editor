'use strict';
var GameDataCreator = require('../gamedata');
var PointView = require('../prefabs/pointview');

function Editor() {}
Editor.prototype = {
  create: function() {
    this.game.data = new GameDataCreator.GameData();
    var background = this.game.add.sprite(0, 0, 'background');
    this.sprites = this.game.add.group();
    background.inputEnabled = true;
    background.events.onInputDown.add(this.clickListener, this);
  },
  update: function() {
  },
  clickListener: function(sprite, pointer) {
    var newPoint = new GameDataCreator.GamePoint(Math.floor(pointer.x),  Math.floor(pointer.y), 'unvisited');
    console.log(newPoint);
    this.game.data.points.push(newPoint);
    var pointSprite = new PointView(this.game, newPoint);
    this.game.add.existing(pointSprite);
    this.sprites.add(pointSprite);
    console.log(Math.floor(pointer.x) + ' ' + Math.floor(pointer.y));
    console.log(this.game.data.points);
    var textArea = window.document.getElementById('outputJSON');
    textArea.value = JSON.stringify(this.game.data, null, 2);
  }
};

module.exports = Editor;
