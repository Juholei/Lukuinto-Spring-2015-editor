'use strict';
var GameDataCreator = require('../gamedatacreator');
function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
    this.game.data = new GameDataCreator.GameData();
  }
};

module.exports = Boot;
