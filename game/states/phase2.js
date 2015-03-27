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
    this.backButton = this.game.add.button(50, 641, 'previous-state', this.moveToPreviousState, this, 1, 0, 2, 0);
  },
  //When PointView inside MapView is clicked, this is called.
  //Disables input on all the buttons that are in this state.
  //closingCallback is given to PointEditScreen as callback that is executed when PointEditScreen
  //is closing. closingCallback then restores the input on the objects of this state.
  pointViewCallback: function(pointView) {
    var self = this;
    var closingCallback = function() {
      pointView.frame = 0;
      pointView.freezeFrames = false;
      self.mapView.toggleInputOnPointViews(true);
      self.backButton.inputEnabled = true;
    };
    var editScreen = new PointEditScreen(this.game, pointView.pointData, closingCallback);
    this.game.add.existing(editScreen);
    pointView.frame = 1;
    pointView.freezeFrames = true;
    this.mapView.toggleInputOnPointViews(false);
    this.backButton.inputEnabled = false;
  },
  moveToPreviousState: function() {
    this.game.state.start('editor');
  }
};
module.exports = Phase2;
