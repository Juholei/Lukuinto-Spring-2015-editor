'use strict';
var LabeledButton = require('../prefabs/labeledbutton');
var GameDataCreator = require('../gamedatacreator');

function AnswerInput(answerTextInput, answerCheckboxInput) {
  this.answerTextInput = answerTextInput;
  this. answerCheckboxInput = answerCheckboxInput;
}

var PointEditScreen = function(game, pointData, closingCallback) {
  Phaser.Image.call(this, game, 600, 50, 'point-edit-screen');
  this.pointData = pointData;
  this.answerInputs = [];
  this.closingCallback = closingCallback;
  this.addQuestionInput();
  this.addAnswerInputs();
  var confirmButton = new LabeledButton(game, 200, 500, 'Hyväksy', this.confirmListener, this);
  var exitButton = game.add.button(360, 5, 'close-button', this.closeScreen, this);
  this.addChild(confirmButton);
  this.addChild(exitButton);
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
  this.questionInput.style.top = (this.y + 66) + 'px';
  this.questionInput.style.left = (this.x + 21) + 'px';

  if (this.pointData.tasks.length > 0) {
    this.questionInput.value = this.pointData.tasks[0].question;
  }

  parentDiv.appendChild(this.questionInput);
};

PointEditScreen.prototype.addAnswerInputs = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');

  for (var i = 0; i < 4; i++) {
    var answerTextInput = this.addAnswerTextInput(this.x + 21, this.y + 335 + i * 25, parentDiv);
    var answerCheckboxInput = this.addAnswerCheckBoxInput(this.x + 380, this.y + 335 + i * 25, parentDiv);

    if (this.pointData.tasks[0] !== undefined) {
      if (this.pointData.tasks[0].answers[i] !== undefined) {
        answerTextInput.value = this.pointData.tasks[0].answers[i].text;
        answerCheckboxInput.checked = this.pointData.tasks[0].answers[i].isCorrect;
      }
    }
    var answerInput = new AnswerInput(answerTextInput, answerCheckboxInput);
    this.answerInputs.push(answerInput);
  }
};

PointEditScreen.prototype.addAnswerTextInput = function(x, y, parent) {
  var answerTextInput = document.createElement('input');
  answerTextInput.type = 'text';
  answerTextInput.className = 'answerTextInput';
  answerTextInput.setAttribute('placeholder', 'Vastausvaihtoehto tähän');
  answerTextInput.style.left = x + 'px';
  answerTextInput.style.top = y + 'px';
  parent.appendChild(answerTextInput);

  return answerTextInput;
};

PointEditScreen.prototype.addAnswerCheckBoxInput = function(x, y, parent) {
  var answerCheckboxInput = document.createElement('input');
  answerCheckboxInput.type = 'checkbox';
  answerCheckboxInput.className = 'answerCheckboxInput';
  answerCheckboxInput.style.left = x + 'px';
  answerCheckboxInput.style.top = y + 'px';
  parent.appendChild(answerCheckboxInput);

  return answerCheckboxInput;
};

PointEditScreen.prototype.confirmListener = function() {
  var task = new GameDataCreator.Task();
  task.question = this.questionInput.value;

  for (var i = 0; i < this.answerInputs.length; i++) {
    var answerText = this.answerInputs[i].answerTextInput.value;
    var isAnswerCorrect = this.answerInputs[i].answerCheckboxInput.checked;
    var answer = new GameDataCreator.Answer(answerText, isAnswerCorrect);
    task.answers.push(answer);
  }
  this.pointData.tasks.push(task);
  this.updatePreviewText();
  this.closeScreen();
};

PointEditScreen.prototype.closeScreen = function() {
  this.questionInput.parentNode.removeChild(this.questionInput);
  this.answerInputs.forEach(function removeElement(object) {
    object.answerTextInput.parentNode.removeChild(object.answerTextInput);
    object.answerCheckboxInput.parentNode.removeChild(object.answerCheckboxInput);
  });
  this.closingCallback();
  this.destroy();
  this.closingCallback();
  this.destroy();
};

PointEditScreen.prototype.updatePreviewText = function() {
  var textArea = window.document.getElementById('outputJSON');
  textArea.value = JSON.stringify(this.game.data, null, 2);
};
module.exports = PointEditScreen;
