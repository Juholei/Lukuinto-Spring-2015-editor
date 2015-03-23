'use strict';

//global variables
window.onload = function() {
  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'lukuinto-spring-2015-editor');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('editor', require('./states/editor'));
  game.state.add('phase2', require('./states/phase2'));
  game.state.add('preload', require('./states/preload'));
  game.state.start('boot');
};
