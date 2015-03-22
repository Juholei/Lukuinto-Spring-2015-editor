'use strict';
var MapView = require('../prefabs/mapview');
var PointEditScreen = require('../prefabs/pointeditscreen');

function Phase2() {}
Phase2.prototype = {
  preload: function() {
    // Override this method to add some load operations.
    // If you need to use the loader, you may need to use them here.
  },
  create: function() {
    this.mapView = new MapView(this.game, this.callback, this);
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
  },
  callback : function(pointView) {
    var editScreen = new PointEditScreen(this.game, pointView.pointData);
    this.game.add.existing(editScreen);
  }
};
module.exports = Phase2;
