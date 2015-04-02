'use strict';
var MapView = require('../prefabs/mapview');
var FileInputHandler = require('../fileinputhandler');

function BackgroundSelection() {}
BackgroundSelection.prototype = {
  preload: function() {
    // Override this method to add some load operations.
    // If you need to use the loader, you may need to use them here.
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game, null, this);
    this.game.add.existing(this.mapView);
    var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
    this.fileInputHandler = new FileInputHandler(25, 50, parentDiv);
    this.fileInputHandler.addFileInputListener(this.mapView.displayImage, this.game.data);
  },
  update: function() {
    // state update code
  },
  paused: function() {
    // This method will be called when game paused.
  },
  render: function() {
    // Put render operations here.
  },
  shutdown: function() {
    // This method will be called when the state is shut down
    // (i.e. you switch to another state from this one).
  }
};
module.exports = BackgroundSelection;
