'use strict';

var PointEditScreen = function(game, pointData) {
  Phaser.Image.call(this, game, 600, 50, 'point-edit-screen');
  this.pointData = pointData;
  this.scale.setTo(1, 0.75);
  this.addQuestionInputBox();
};

PointEditScreen.prototype = Object.create(Phaser.Image.prototype);
PointEditScreen.prototype.constructor = PointEditScreen;

PointEditScreen.prototype.update = function() {
};

PointEditScreen.prototype.addQuestionInputBox = function() {
  var parentDiv = window.document.getElementById('lukuinto-spring-2015-editor');
  var textBox = window.document.createElement('textarea');
  textBox.className = 'textbox';
  parentDiv.appendChild(textBox);

};

module.exports = PointEditScreen;
