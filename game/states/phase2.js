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
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game, this.pointViewCallback, this);
    this.game.add.existing(this.mapView);
    this.game.add.button(50, 641, 'previous-state', this.moveToPreviousState, this, 1, 0, 2, 0);
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
  pointViewCallback: function(pointView) {
    var closingCallback = function() {
      this.frame = 0;
      this.freezeFrames = false;
      this.parent.parent.toggleInputOnPointViews(true);
    }.bind(pointView);
    var editScreen = new PointEditScreen(this.game, pointView.pointData, closingCallback);
    this.game.add.existing(editScreen);
    pointView.frame = 1;
    pointView.freezeFrames = true;
    this.mapView.toggleInputOnPointViews(false);
  },
  moveToPreviousState: function() {
    this.game.state.start('editor');
  }
};
module.exports = Phase2;
