'use strict';
var GameDataCreator = require('../gamedatacreator');
var PointView = require('../prefabs/pointview');
var MapView = require('../prefabs/mapview');
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
    var titleText = this.game.add.text(512, 62, 'Vaihe 2: Aseta etapit kartalle', titleTextStyle);
    titleText.anchor.setTo(0.5);
    this.buttonGroup = this.game.add.group();
    this.addButtons();
  },
  update: function() {
  },
  addButtons: function() {
    var addStartPointButton = this.game.add.button(162, 649, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addStartPointButton);
    var addEndPointButton = this.game.add.button(343, 649, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addEndPointButton);
    var addPointsButton = this.game.add.button(527, 649, 'add-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addPointsButton);
    var removePointsButton = this.game.add.button(708, 649, 'remove-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(removePointsButton);
    this.game.add.button(50, 641, 'previous-state', this.moveToPreviousState, this, 1, 0, 2, 0);
    this.game.add.button(895, 644, 'next-state', this.moveToNextState, this, 1, 0, 2, 0);
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
      this.updatePreviewText();
    }
  },
  removePoint: function(pointView) {
    var indexToRemove = this.game.data.points.indexOf(pointView.pointData);
    this.game.data.points.splice(indexToRemove, 1);
    this.mapView.updatePointViews();
    this.updatePreviewText();
    pointView.kill();
  },
  addStartPoint: function(sprite, pointer) {
    if (sprite.withinBounds(pointer)) {
      this.game.data.startPoint.x = this.scaleUp(pointer.x - this.mapView.x);
      this.game.data.startPoint.y = this.scaleUp(pointer.y - this.mapView.y);
      this.mapView.updateStartPoint();
      this.updatePreviewText();
    }
  },
  addEndPoint: function(sprite, pointer) {
    if (sprite.withinBounds(pointer)) {
      this.game.data.endPoint.x = this.scaleUp(pointer.x - this.mapView.x);
      this.game.data.endPoint.y = this.scaleUp(pointer.y - this.mapView.y);
      this.mapView.updateEndPoint();
      this.updatePreviewText();
    }
  },
  updatePreviewText: function() {
    var textArea = window.document.getElementById('outputJSON');
    textArea.value = JSON.stringify(this.game.data, null, 2);
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
    this.game.state.start('taskeditor');
  }
};

module.exports = PointEditor;
