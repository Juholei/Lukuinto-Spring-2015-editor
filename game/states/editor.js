'use strict';
var GameDataCreator = require('../gamedatacreator');
var PointView = require('../prefabs/pointview');
var MapView = require('../prefabs/mapview');

function Editor() {}
Editor.prototype = {
  create: function() {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    document.body.appendChild(this.fileInput);
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
    this.fileInput.parentNode.removeChild(this.fileInput);
  },
  addButtons: function() {
    var addStartPointButton = this.game.add.button(154, 646, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addStartPointButton);
    var addEndPointButton = this.game.add.button(334, 646, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addEndPointButton);
    var addPointsButton = this.game.add.button(514, 646, 'add-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addPointsButton);
    var removePointsButton = this.game.add.button(694, 646, 'remove-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(removePointsButton);
    this.game.add.button(891, 641, 'next-state', this.moveToNextState, this, 1, 0, 2, 0);
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
    var x = this.scaleUp(pointer.x - this.mapView.x);
    var y = this.scaleUp(pointer.y - this.mapView.y);
    var newPoint = new GameDataCreator.GamePoint(x, y, 'unvisited');
    if (this.game.data.points.length === 0) {
      newPoint.state = 'next';
    }
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
    var sprite = this.mapView;
    var gameData = this.game.data;
    this.fileInput.addEventListener('change', function handleFiles(files) {
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
