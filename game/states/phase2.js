'use strict';
var MapView = require('../prefabs/mapview');

function Phase2() {}
Phase2.prototype = {
  preload: function() {
    // Override this method to add some load operations.
    // If you need to use the loader, you may need to use them here.
  },
  create: function() {
    this.mapView = new MapView(this.game);
    this.game.add.existing(this.mapView);
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
module.exports = Phase2;
