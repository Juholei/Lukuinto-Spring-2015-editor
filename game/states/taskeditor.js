'use strict';
var MapView = require('../prefabs/mapview');
var PointEditScreen = require('../prefabs/pointeditscreen');
var titleTextStyle = require('../titletextstyle');

function TaskEditor() {}
TaskEditor.prototype = {
  preload: function() {
    // Override this method to add some load operations.
    // If you need to use the loader, you may need to use them here.
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game, this.pointViewCallback, this);
    this.game.add.existing(this.mapView);
    var titleText = this.game.add.text(512, 32, 'Vaihe 3: Luo tehtävät etappeihin', titleTextStyle);
    titleText.anchor.setTo(0.5);
    this.buttons = this.game.add.group();
    var backButton = this.game.add.button(50, 641, 'previous-state', this.moveToPreviousState, this, 1, 0, 2, 0);
    var forwardButton = this.game.add.button(895, 644, 'next-state', this.moveToNextState, this, 1, 0, 2, 0);
    this.buttons.add(backButton);
    this.buttons.add(forwardButton);
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
      self.buttons.setAll('inputEnabled', true);
    };
    var editScreen = new PointEditScreen(this.game, pointView.pointData, closingCallback);
    this.game.add.existing(editScreen);
    pointView.frame = 1;
    pointView.freezeFrames = true;
    this.mapView.toggleInputOnPointViews(false);
    this.buttons.setAll('inputEnabled', false);
  },
  moveToPreviousState: function() {
    this.game.state.start('pointeditor');
  },
  moveToNextState: function() {
    this.game.state.start('savegame');
  }
};
module.exports = TaskEditor;
