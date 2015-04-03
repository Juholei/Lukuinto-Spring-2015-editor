'use strict';

//global variables
window.onload = function() {
  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'lukuinto-spring-2015-editor');

  // Game States
  game.state.add('backgroundselection', require('./states/backgroundselection'));
  game.state.add('boot', require('./states/boot'));
  game.state.add('pointeditor', require('./states/pointeditor'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('savegame', require('./states/savegame'));
  game.state.add('taskeditor', require('./states/taskeditor'));
  game.state.start('boot');
};
