'use strict';
var LabeledButton = require('../prefabs/labeledbutton');
var GameDataCreator = require('../gamedatacreator');

var PointEditScreen = function(game, pointData) {
  Phaser.Image.call(this, game, 600, 50, 'point-edit-screen');
  this.pointData = pointData;
  this.addQuestionInputBox();
  var confirmButton = new LabeledButton(game, 200, 500, 'Hyväksy', this.confirmListener, this);
  this.addChild(confirmButton);
};

PointEditScreen.prototype = Object.create(Phaser.Image.prototype);
PointEditScreen.prototype.constructor = PointEditScreen;

PointEditScreen.prototype.update = function() {
};

PointEditScreen.prototype.addQuestionInputBox = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.textBox = document.createElement('textarea');
  this.textBox.className = 'textbox';
  this.textBox.setAttribute('rows', 10);
  this.textBox.setAttribute('cols', 50);
  this.textBox.setAttribute('placeholder', 'Kysymysteksti tähän');
  this.textBox.style.top = (this.y + 10) + 'px';
  this.textBox.style.left = (this.x + 10) + 'px';

  if (this.pointData.tasks.length > 0) {
    this.textBox.value = this.pointData.tasks[0].question;
  }

  parentDiv.appendChild(this.textBox);
};

PointEditScreen.prototype.confirmListener = function() {
  console.log(this.textBox.value);
  var task = new GameDataCreator.Task();
  task.question = this.textBox.value;
  this.pointData.tasks.push(task);
  this.destroy();
};

module.exports = PointEditScreen;
