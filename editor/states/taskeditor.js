'use strict';
var MapView = require('../prefabs/mapview');
var PointEditScreen = require('../prefabs/pointeditscreen');
var titleTextStyle = require('../titletextstyle');
var ErrorAnnouncement = require('../prefabs/errorannouncement');

function TaskEditor() {}
TaskEditor.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game, this.pointViewCallback, this);
    var titleText = this.game.add.text(512, 32, 'Vaihe 3: Luo tehtävät etappeihin valitsemalla etappi', titleTextStyle);
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
    pointView.frame = 1;
    pointView.freezeFrames = true;
    this.mapView.toggleInputOnPointViews(false);
    this.buttons.setAll('inputEnabled', false);
  },
  moveToPreviousState: function() {
    this.game.data.saveToLocalStorage();
    this.game.state.start('pointeditor');
  },
  moveToNextState: function() {
    if (this.allPointsHaveTasks()) {
      this.game.data.saveToLocalStorage();
      this.game.state.start('congratulationseditor');
    } else {
      var callback = function(button) {
        this.buttons.setAll('inputEnabled', true);
        this.mapView.toggleInputOnPointViews(true);
        button.parent.destroy();
      };
      var announcement = new ErrorAnnouncement(this.game, callback, this, 'Kaikilla etapeilla ei ole tehtäviä.');
      this.buttons.setAll('inputEnabled', false);
      this.mapView.toggleInputOnPointViews(false);
    }
  },
  allPointsHaveTasks: function() {
    var points = this.game.data.points;

    for (var i = 0; i < points.length; i++) {
      if (points[i].tasks.length === 0) {
        return false;
      }
    }
    return true;
  }
};
module.exports = TaskEditor;
