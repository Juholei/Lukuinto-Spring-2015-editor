'use strict';
var GameDataCreator = require('../gamedata');
var PointView = require('../prefabs/pointview');
var MajorPointView = require('../prefabs/majorpointview');

function Editor() {}
Editor.prototype = {
  create: function() {
    this.game.data = new GameDataCreator.GameData();
    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.scale.setTo(0.75, 0.75);
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.addEndPoint, this);
    this.pointViewSprites = this.game.add.group();
    this.background.addChild(this.pointViewSprites);
    this.buttonGroup = this.game.add.group();
    this.addButtons();
    this.startPointViewSprite = null;
    this.endPointViewSprite = null;
  },
  update: function() {
  },
  addButtons: function() {
    var addPointsButton = this.game.add.button(0, 650, 'add-point', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addPointsButton);
    var addStartPointButton = this.game.add.button(220, 650, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addStartPointButton);
    var addEndPointButton = this.game.add.button(440, 650, 'add-startpoint', this.changeAction, this, 1, 0);
    this.buttonGroup.add(addEndPointButton);
  },
  changeAction: function(button) {
    this.buttonGroup.setAll('frame', 0);
    this.buttonGroup.setAll('freezeFrames', false);
    button.freezeFrames = true;
    button.frame = 1;

    this.background.events.onInputDown.removeAll();
    var buttonIndex = this.buttonGroup.getChildIndex(button);

    switch (buttonIndex) {
      case 0:
        this.background.events.onInputDown.add(this.addPoint, this);
        break;
      case 1:
        this.background.events.onInputDown.add(this.addStartPoint, this);
        break;
      case 2:
        this.background.events.onInputDown.add(this.addEndPoint, this);
        break;
      default:
        console.log('Invalid button index encountered, how the heck did that happen?');
    }
  },
  addPoint: function(sprite, pointer) {
    var newPoint = new GameDataCreator.GamePoint(this.scaleUp(pointer.x), this.scaleUp(pointer.y), 'unvisited');
    this.game.data.points.push(newPoint);
    var pointSprite = new PointView(this.game, newPoint, this.game.data.points);
    this.pointViewSprites.add(pointSprite);
    this.updatePreviewText();
  },
  addStartPoint: function(sprite, pointer) {
    this.game.data.startPoint.x = this.scaleUp(pointer.x);
    this.game.data.startPoint.y = this.scaleUp(pointer.y);

    if (this.startPointViewSprite === null) {
      this.startPointViewSprite = new MajorPointView(this.game, this.game.data.startPoint, 0);
      this.background.addChild(this.startPointViewSprite);
    } else {
      this.startPointViewSprite.changeLocation(this.game.data.startPoint);
    }
    this.updatePreviewText();
  },
  addEndPoint: function(sprite, pointer) {
    this.game.data.endPoint.x = this.scaleUp(pointer.x);
    this.game.data.endPoint.y = this.scaleUp(pointer.y);

    if (this.endPointViewSprite === null) {
      this.endPointViewSprite = new MajorPointView(this.game, this.game.data.endPoint, 1);
      this.background.addChild(this.endPointViewSprite);
    } else {
      this.endPointViewSprite.changeLocation(this.game.data.endPoint);
    }
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
  }
};

module.exports = Editor;
