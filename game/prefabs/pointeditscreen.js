'use strict';
var LabeledButton = require('../prefabs/labeledbutton');
var GameDataCreator = require('../gamedatacreator');

var PointEditScreen = function(game, pointData) {
  Phaser.Image.call(this, game, 600, 50, 'point-edit-screen');
  this.pointData = pointData;
  this.answerInputs = [];
  this.addQuestionInput();
  this.addAnswerInputs();
  var confirmButton = new LabeledButton(game, 200, 500, 'Hyväksy', this.confirmListener, this);
  this.addChild(confirmButton);
};

PointEditScreen.prototype = Object.create(Phaser.Image.prototype);
PointEditScreen.prototype.constructor = PointEditScreen;

PointEditScreen.prototype.update = function() {
};

PointEditScreen.prototype.addQuestionInput = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.questionInput = document.createElement('textarea');
  this.questionInput.className = 'questionBox';
  this.questionInput.setAttribute('rows', 10);
  this.questionInput.setAttribute('cols', 50);
  this.questionInput.setAttribute('placeholder', 'Kysymysteksti tähän');
  this.questionInput.style.top = (this.y + 10) + 'px';
  this.questionInput.style.left = (this.x + 10) + 'px';

  if (this.pointData.tasks.length > 0) {
    this.questionInput.value = this.pointData.tasks[0].question;
  }

  parentDiv.appendChild(this.questionInput);
};

PointEditScreen.prototype.addAnswerInputs = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');

  for (var i = 0; i < 4; i++) {
    var answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.className = 'answerInput';
    answerInput.setAttribute('placeholder', 'Vastausvaihtoehto tähän');
    answerInput.style.top = (this.y + 200 + i * 25) + 'px';
    answerInput.style.left = (this.x + 10) + 'px';
    this.answerInputs.push(answerInput);
    parentDiv.appendChild(answerInput);
  }
};

PointEditScreen.prototype.confirmListener = function() {
  console.log(this.questionInput.value);
  var task = new GameDataCreator.Task();
  task.question = this.questionInput.value;

  for (var i = 0; i < this.answerInputs.length; i++) {
    var answer = new GameDataCreator.Answer(this.answerInputs[i].value, true);
    task.answers.push(answer);
  }
  this.pointData.tasks.push(task);
  this.updatePreviewText();
  this.questionInput.parentNode.removeChild(this.questionInput);
  this.answerInputs.forEach(function removeElement(element) {
    element.parentNode.removeChild(element);
  });
  this.destroy();
};

PointEditScreen.prototype.updatePreviewText = function() {
  var textArea = window.document.getElementById('outputJSON');
  textArea.value = JSON.stringify(this.game.data, null, 2);
};
module.exports = PointEditScreen;
