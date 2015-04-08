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

    var loadedEditorState = window.localStorage.getItem('lukuseikkailu-editor');
    if (loadedEditorState !== null) {
      var confirmation = confirm('Haluatko jatkaa aiemmin aloitetun pelin tekemistä?')
      if (confirmation) {
        this.game.data.loadFromLocalStorage();
      }
    }
  }
};

module.exports = Boot;
