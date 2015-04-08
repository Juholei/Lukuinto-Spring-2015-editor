'use strict';
var GameDataCreator = require('../gamedatacreator');
var PointView = require('../prefabs/pointview');
var MapView = require('../prefabs/mapview');
var ErrorAnnouncement = require('../prefabs/errorannouncement');
var LabeledImageButton = require('../prefabs/labeledimagebutton');
var Constants = require('../constants');
var titleTextStyle = require('../titletextstyle');

//State for setting GamePoints and MajorPoints on the game map.
function PointEditor() {}
PointEditor.prototype = {
  create: function() {
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game, this.removePoint, this);
    this.mapView.toggleInputOnPointViews(false);
    this.game.add.existing(this.mapView);
    var titleText = this.game.add.text(512, 32, 'Vaihe 2: Aseta etapit kartalle', titleTextStyle);
    titleText.anchor.setTo(0.5);
    this.buttonGroup = this.game.add.group();
    this.addButtons();
  },
  update: function() {
  },
  addButtons: function() {
    var addStartPointButton = new LabeledImageButton(this.game, 162, 649, 'add-startpoint', 'Aseta lähtö', this.changeAction, this);
    this.buttonGroup.add(addStartPointButton);
    var addEndPointButton = new LabeledImageButton(this.game, 343, 649, 'add-startpoint', 'Aseta maali', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addEndPointButton);
    var addPointsButton = new LabeledImageButton(this.game, 527, 649, 'add-point', 'Lisää etappi', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addPointsButton);
    var removePointsButton = new LabeledImageButton(this.game, 708, 649, 'remove-point', 'Poista etappi', this.changeAction, this, 1, 0);
    this.buttonGroup.add(removePointsButton);
    var backButton = this.game.add.button(50, 641, 'previous-state', this.moveToPreviousState, this, 1, 0, 2, 0);
    this.buttonGroup.add(backButton);
    var forwardButton = this.game.add.button(895, 644, 'next-state', this.moveToNextState, this, 1, 0, 2, 0);
    this.buttonGroup.add(forwardButton);
  },
  //Changes the current action that happens on click based on the button that has been pressed.
  changeAction: function(button) {
    this.buttonGroup.setAll('frame', 0);
    this.buttonGroup.setAll('freezeFrames', false);
    button.freezeFrames = true;
    button.frame = 1;
    this.mapView.toggleInputOnPointViews(false);

    this.mapView.events.onInputDown.removeAll();
    var buttonIndex = this.buttonGroup.getChildIndex(button);

    switch (buttonIndex) {
      case 0:
        this.mapView.events.onInputDown.add(this.addStartPoint, this);
        break;
      case 1:
        this.mapView.events.onInputDown.add(this.addEndPoint, this);
        break;
      case 2:
        this.mapView.events.onInputDown.add(this.addPoint, this);
        break;
      case 3:
        this.mapView.toggleInputOnPointViews(true);
        break;
      default:
        console.log('Invalid button index encountered, how the heck did that happen?');
    }
  },
  addPoint: function(sprite, pointer) {
    if (sprite.withinBounds(pointer)) {
      var x = this.scaleUp(pointer.x - this.mapView.x);
      var y = this.scaleUp(pointer.y - this.mapView.y);
      var newPoint = new GameDataCreator.GamePoint(x, y, Constants.pointStates.UNVISITED);
      if (this.game.data.points.length === 0) {
        newPoint.state = Constants.pointStates.NEXT;
      }
      this.game.data.points.push(newPoint);
      var pointSprite = new PointView(this.game, newPoint, this.game.data.points, this.removePoint, this);
      this.mapView.addPointView(pointSprite);
    }
  },
  removePoint: function(pointView) {
    var indexToRemove = this.game.data.points.indexOf(pointView.pointData);
    this.game.data.points.splice(indexToRemove, 1);
    this.mapView.updatePointViews();
    pointView.kill();
  },
  addStartPoint: function(sprite, pointer) {
    if (sprite.withinBounds(pointer)) {
      this.game.data.startPoint.x = this.scaleUp(pointer.x - this.mapView.x);
      this.game.data.startPoint.y = this.scaleUp(pointer.y - this.mapView.y);
      this.mapView.updateStartPoint();
    }
  },
  addEndPoint: function(sprite, pointer) {
    if (sprite.withinBounds(pointer)) {
      this.game.data.endPoint.x = this.scaleUp(pointer.x - this.mapView.x);
      this.game.data.endPoint.y = this.scaleUp(pointer.y - this.mapView.y);
      this.mapView.updateEndPoint();
    }
  },
  //Scales up point related numbers from the 0.75 scale of the displayed game area
  //to the correct game area size used in the game
  scaleUp: function(number) {
    var scaleCorrectedNumber = (number / 3) * 4;
    return Math.floor(scaleCorrectedNumber);
  },
  moveToPreviousState: function() {
    this.game.state.start('backgroundselection');
  },
  moveToNextState: function() {
    if (this.allPointsSet()) {
      this.game.state.start('taskeditor');
    } else {
      var callback = function(button) {
        this.buttonGroup.setAll('inputEnabled', true);
        this.mapView.toggleInputOnPointViews(true);
        button.parent.destroy();
      };
      var announcement = new ErrorAnnouncement(this.game, callback, this, 'Et ole asettanut kaikkia vaadittuja pisteitä.');
      this.buttonGroup.setAll('inputEnabled', false);
      this.mapView.toggleInputOnPointViews(false);
      this.game.add.existing(announcement);
    }
  },
  allPointsSet: function() {
    if (this.game.data.startPoint.x === undefined) {
      return false;
    }
    if (this.game.data.endPoint.x === undefined) {
      return false;
    }
    if (this.game.data.points.length === 0) {
      return false;
    }
    return true;
  }
};

module.exports = PointEditor;
