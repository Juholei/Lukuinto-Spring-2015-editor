'use strict';
var GameDataCreator = require('../gamedatacreator');
var PointView = require('../prefabs/pointview');
var MapView = require('../prefabs/mapview');
var LabeledButton = require('../prefabs/labeledbutton');

function Editor() {}
Editor.prototype = {
  create: function() {
    this.game.data = new GameDataCreator.GameData();
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game);
    this.game.add.existing(this.mapView);
    this.buttonGroup = this.game.add.group();
    this.addButtons();
    this.addFileInputListener();
  },
  update: function() {
  },
  shutdown: function() {
    var fileInput = window.document.getElementById('input');
    fileInput.parentNode.removeChild(fileInput);
  },
  addButtons: function() {
    var addPointsButton = this.game.add.button(0, 677, 'add-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addPointsButton);
    var removePointsButton = this.game.add.button(220, 677, 'remove-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(removePointsButton);
    var addStartPointButton = this.game.add.button(440, 677, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addStartPointButton);
    var addEndPointButton = this.game.add.button(660, 677, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addEndPointButton);
    var nextStateButton = new LabeledButton(this.game, 980, 720, '→', this.moveToNextState, this);
    this.buttonGroup.add(nextStateButton);
  },
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
        this.mapView.events.onInputDown.add(this.addPoint, this);
        break;
      case 1:
        this.mapView.toggleInputOnPointViews(true);
        break;
      case 2:
        this.mapView.events.onInputDown.add(this.addStartPoint, this);
        break;
      case 3:
        this.mapView.events.onInputDown.add(this.addEndPoint, this);
        break;
      default:
        console.log('Invalid button index encountered, how the heck did that happen?');
    }
  },
  addPoint: function(sprite, pointer) {
    var x = this.scaleUp(pointer.x - this.mapView.x);
    var y = this.scaleUp(pointer.y - this.mapView.y);
    var newPoint = new GameDataCreator.GamePoint(x, y, 'unvisited');
    this.game.data.points.push(newPoint);
    var pointSprite = new PointView(this.game, newPoint, this.game.data.points, this.removePoint, this);
    this.mapView.addPointView(pointSprite);
    this.updatePreviewText();
  },
  removePoint: function(pointView) {
    var indexToRemove = this.game.data.points.indexOf(pointView.pointData);
    this.game.data.points.splice(indexToRemove, 1);
    pointView.destroy();
    this.mapView.updatePointViews();
    this.updatePreviewText();
  },
  addStartPoint: function(sprite, pointer) {
    this.game.data.startPoint.x = this.scaleUp(pointer.x - this.mapView.x);
    this.game.data.startPoint.y = this.scaleUp(pointer.y - this.mapView.y);
    this.mapView.updateStartPoint();
    this.updatePreviewText();
  },
  addEndPoint: function(sprite, pointer) {
    this.game.data.endPoint.x = this.scaleUp(pointer.x - this.mapView.x);
    this.game.data.endPoint.y = this.scaleUp(pointer.y - this.mapView.y);
    this.mapView.updateEndPoint();
    this.updatePreviewText();
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
  addFileInputListener: function() {
    var fileInput = window.document.getElementById('input');
    var sprite = this.mapView;
    var gameData = this.game.data;
    fileInput.addEventListener('change', function handleFiles(files) {
      var image = new Image();
      image.onload = function addImageToSprite() {
        sprite.displayImage.loadTexture(new PIXI.Texture(new PIXI.BaseTexture(image, PIXI.scaleModes.DEFAULT)));
        console.log('Image loaded');
        sprite.displayImage.width = 1024;
        sprite.displayImage.height = 768;
        // URL.revokeObjectURL(image.src);
        gameData.image = image.src;
      };
      image.src = URL.createObjectURL(files.target.files[0]);
    }, false);
  },
  moveToNextState: function() {
    this.game.state.start('phase2');
  }
};

module.exports = Editor;
