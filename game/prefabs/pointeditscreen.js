'use strict';
var LabeledButton = require('../prefabs/labeledbutton');
var GameDataCreator = require('../gamedatacreator');
var FileInputHandler = require('../fileinputhandler');

//Helper class to keep related DOM input elements together
function AnswerInput(answerTextInput, answerCheckboxInput) {
  this.answerTextInput = answerTextInput;
  this. answerCheckboxInput = answerCheckboxInput;
}

//Represents a UI window that is used to edit GamePoint information
//Uses Phaser objects for graphics and buttons and DOM elements
//for input.
var PointEditScreen = function(game, pointData, closingCallback) {
  Phaser.Image.call(this, game, 600, 50, 'point-edit-screen');
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.fileInputHandler = new FileInputHandler(this.x + 20, 590, parentDiv);
  this.pointData = pointData;
  this.answerInputs = [];
  this.closingCallback = closingCallback;
  this.addTitleText();
  this.addAnswerOptionsText();
  this.addQuestionInput();
  this.addTaskSelectionBox();
  this.addAnswerInputs();
  var previewFrame = this.game.add.sprite(-576, 0);
  this.addChild(previewFrame);
  previewFrame.width = 576;
  previewFrame.height = 360;
  this.fileInputHandler.addFileInputListener(previewFrame, this.pointData);

  var confirmButton = new LabeledButton(game, 330, 565, 'Hyväksy', this.confirmListener, this);
  this.addChild(confirmButton);
  var exitButton = this.game.add.button(360, 5, 'close-button', this.closeScreen, this, 1, 0, 2, 2);
  this.addChild(exitButton);
};

PointEditScreen.prototype = Object.create(Phaser.Image.prototype);
PointEditScreen.prototype.constructor = PointEditScreen;

PointEditScreen.prototype.update = function() {
};

PointEditScreen.prototype.addTitleText = function() {
  var textStyle = {font: '20pt Arial', fill: 'white', align: 'left'};
  var titleText = this.game.add.text(100, 20, 'Etapin muokkaus', textStyle);
  this.addChild(titleText);
};

PointEditScreen.prototype.addAnswerOptionsText = function() {
  var answerOptionsTextStyle = {font: '12pt Arial', fill: 'white', align: 'left'};
  var answerOptionsText = this.game.add.text(21, 315, 'Vastausvaihtoehdot', answerOptionsTextStyle);
  var isCorrectText = this.game.add.text(335, 315, 'Oikein?', answerOptionsTextStyle);
  this.addChild(answerOptionsText);
  this.addChild(isCorrectText);
};

//Add DOM textarea on top of the canvas for inputting question text
PointEditScreen.prototype.addQuestionInput = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.questionInput = document.createElement('textarea');
  this.questionInput.className = 'questionBox';
  this.questionInput.setAttribute('placeholder', 'Kysymysteksti tähän');
  this.questionInput.style.left = (this.x + 21) + 'px';
  this.questionInput.style.top = (this.y + 66) + 'px';
  parentDiv.appendChild(this.questionInput);
};

PointEditScreen.prototype.fillQuestionInput = function(taskIndex) {
  this.questionInput.value = this.pointData.tasks[taskIndex].question;
};

//Add DOM textinputs on top of the canvas for inputting question answers
//and checkboxes for marking the answers correct or incorrect.
PointEditScreen.prototype.addAnswerInputs = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  var margin = 50;

  for (var i = 0; i < 4; i++) {
    var textX = this.x + 20;
    var textY = this.y + 335 + i * margin;
    var answerTextInput = this.addAnswerTextInput(textX, textY, parentDiv);

    var checkboxX = this.x + 350;
    var checkboxY = this.y + 335 + i * margin;
    var answerCheckboxInput = this.addAnswerCheckboxInput(checkboxX, checkboxY, parentDiv);

    var answerInput = new AnswerInput(answerTextInput, answerCheckboxInput);
    this.answerInputs.push(answerInput);
  }
};

PointEditScreen.prototype.fillAnswerInputs = function(taskIndex) {
  for (var i = 0; i < this.answerInputs.length; i++) {
    var answerTextInput = this.answerInputs[i].answerTextInput;
    var answerCheckboxInput = this.answerInputs[i].answerCheckboxInput;
    answerTextInput.value = this.pointData.tasks[taskIndex].answers[i].text;
    answerCheckboxInput.checked = this.pointData.tasks[taskIndex].answers[i].isCorrect;
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

PointEditScreen.prototype.addAnswerCheckboxInput = function(x, y, parent) {
  var answerCheckboxInput = document.createElement('input');
  answerCheckboxInput.type = 'checkbox';
  answerCheckboxInput.className = 'answerCheckboxInput';
  answerCheckboxInput.style.left = x + 'px';
  answerCheckboxInput.style.top = y + 'px';
  parent.appendChild(answerCheckboxInput);

  return answerCheckboxInput;
};

PointEditScreen.prototype.addTaskSelectionBox = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.taskSelector = document.createElement('select');
  this.taskSelector.className = 'taskSelection';
  this.taskSelector.setAttribute('size', 10);
  this.taskSelector.style.left = (this.x + 21 + 226) + 'px';
  this.taskSelector.style.top = (this.y + 66) + 'px';

  for (var i = 0; i < this.pointData.tasks.length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = 'Tehtävä ' + (i + 1);
    this.taskSelector.appendChild(option);
  }

  var self = this;
  this.taskSelector.onchange = function() {
    console.log(this.value);
    self.fillQuestionInput(this.value);
    self.fillAnswerInputs(this.value);
  };
  parentDiv.appendChild(this.taskSelector);
};

//Take the values from DOM inputs and save them to GameData.
//Then close this screen.
PointEditScreen.prototype.confirmListener = function() {
  var task = new GameDataCreator.Task();
  task.question = this.questionInput.value;

  for (var i = 0; i < this.answerInputs.length; i++) {
    var answerText = this.answerInputs[i].answerTextInput.value;
    var isAnswerCorrect = this.answerInputs[i].answerCheckboxInput.checked;
    var answer = new GameDataCreator.Answer(answerText, isAnswerCorrect);
    task.answers.push(answer);
  }
  if (this.taskSelector.value !== '') {
    this.pointData.tasks[this.taskSelector.value] = task;
  } else {
    this.pointData.tasks.push(task);
  }
  this.updatePreviewText();
  this.closeScreen();
};

//Remove all DOM elements and then destroy the object.
PointEditScreen.prototype.closeScreen = function() {
  this.questionInput.parentNode.removeChild(this.questionInput);
  this.answerInputs.forEach(function removeElement(object) {
    object.answerTextInput.parentNode.removeChild(object.answerTextInput);
    object.answerCheckboxInput.parentNode.removeChild(object.answerCheckboxInput);
  });
  this.taskSelector.parentNode.removeChild(this.taskSelector);
  this.fileInputHandler.remove();
  this.closingCallback();
  this.destroy();
};

PointEditScreen.prototype.updatePreviewText = function() {
  var textArea = window.document.getElementById('outputJSON');
  textArea.value = JSON.stringify(this.game.data, null, 2);
};

module.exports = PointEditScreen;
