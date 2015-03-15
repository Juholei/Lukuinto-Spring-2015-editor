'use strict';
var GameDataCreator = require('../gamedata');

function Editor() {}
Editor.prototype = {
  create: function() {
    var background = this.game.add.sprite(0, 0, 'background');
    background.inputEnabled = true;
    background.events.onInputDown.add(this.clickListener, this);
    console.log(GameDataCreator);
  },
  update: function() {
  },
  clickListener: function(sprite, pointer) {
    console.log(pointer.x + ' ' + pointer.y);
  }
};

module.exports = Editor;
