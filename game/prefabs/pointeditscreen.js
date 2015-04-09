'use strict';
var LabeledButton = require('../prefabs/labeledbutton');
var GameDataCreator = require('../gamedatacreator');
var FileInputHandler = require('../fileinputhandler');
var loadImageToSprite = require('../imageloader');
var Constants = require('../constants');
var addTextInput = require('../addtextinput');

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
  this.pointData = pointData;
  this.closingCallback = closingCallback;
  this.imageInfo = {image: ''};
  this.answerInputs = [];
  this.addPreviewFrame();
  this.addTitleText();
  this.addAnswerOptionsText();
  this.addQuestionInput();
  this.addTaskSelectionBox();
  this.addAnswerInputs();
  this.addFileInputHandler();
  this.addButtons();
};

PointEditScreen.prototype = Object.create(Phaser.Image.prototype);
PointEditScreen.prototype.constructor = PointEditScreen;

PointEditScreen.prototype.update = function() {
};

PointEditScreen.prototype.addButtons = function() {
  var confirmButton = new LabeledButton(this.game, 346, 571, 'Hyväksy', this.confirmListener, this);
  confirmButton.width = 117;
  confirmButton.height = 48;
  this.addChild(confirmButton);
  var exitButton = this.game.add.button(360, 5, 'close-button', this.closeScreen, this, 1, 0, 2, 0);
  this.addChild(exitButton);
};

PointEditScreen.prototype.addPreviewFrame = function() {
  this.previewFrame = this.game.add.sprite(-576, 0);
  this.addChild(this.previewFrame);
  this.previewFrame.width = 576;
  this.previewFrame.height = 360;
};

PointEditScreen.prototype.addTitleText = function() {
  var textStyle = {font: '20pt Arial', fill: 'white', align: 'left'};
  var titleText = this.game.add.text(205, 37, 'Etapin muokkaus', textStyle);
  titleText.anchor.setTo(0.5);
  this.addChild(titleText);
};

PointEditScreen.prototype.addAnswerOptionsText = function() {
  var answerOptionsTextStyle = {font: '12pt Arial', fill: 'white', align: 'left'};
  var answerOptionsText = this.game.add.text(20, 315, 'Vastausvaihtoehdot', answerOptionsTextStyle);
  this.isCorrectText = this.game.add.text(335, 315, 'Oikein?', answerOptionsTextStyle);
  this.addChild(answerOptionsText);
  this.addChild(this.isCorrectText);
};

//Add DOM textarea on top of the canvas for inputting question text
PointEditScreen.prototype.addQuestionInput = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  var clickListener = function(click) {
    click.target.className = 'questionBox';
  };
  this.questionInput = document.createElement('textarea');
  this.questionInput.onclick = clickListener;
  this.questionInput.className = 'questionBox';
  this.questionInput.setAttribute('placeholder', 'Etapin kuvaus tähän...');
  this.questionInput.style.left = (this.x + Constants.HTML.QUESTION_INPUT_X) + 'px';
  this.questionInput.style.top = (this.y + Constants.HTML.QUESTION_INPUT_Y) + 'px';
  parentDiv.appendChild(this.questionInput);
};

//Add DOM textinputs on top of the canvas for inputting question answers
//and checkboxes for marking the answers correct or incorrect.
PointEditScreen.prototype.addAnswerInputs = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  var clickListener = function(click) {
    click.target.className = 'textInput';
  };
  for (var i = 0; i < 4; i++) {
    var textX = this.x + Constants.HTML.ANSWER_INPUT_X;
    var textY = this.y + Constants.HTML.ANSWER_INPUT_Y + i * Constants.HTML.MARGIN;
    var answerTextInput = addTextInput(textX, textY, 'Vastausvaihtoehto tähän', parentDiv);
    answerTextInput.onclick = clickListener;
    var checkboxX = this.x + Constants.HTML.CHECKBOX_X;
    var checkboxY = this.y + Constants.HTML.CHECKBOX_Y + i * Constants.HTML.MARGIN;
    var answerCheckboxInput = this.addAnswerCheckboxInput(checkboxX, checkboxY, parentDiv);

    var answerInput = new AnswerInput(answerTextInput, answerCheckboxInput);
    this.answerInputs.push(answerInput);
  }
};

PointEditScreen.prototype.addAnswerCheckboxInput = function(x, y, parent) {
  var text = this.isCorrectText;
  var clickListener = function() {
    text.clearColors();
  };

  var answerCheckboxInput = document.createElement('input');
  answerCheckboxInput.type = 'checkbox';
  answerCheckboxInput.className = 'answerCheckboxInput';
  answerCheckboxInput.style.left = x + 'px';
  answerCheckboxInput.style.top = y + 'px';
  answerCheckboxInput.onclick = clickListener;
  parent.appendChild(answerCheckboxInput);

  return answerCheckboxInput;
};

PointEditScreen.prototype.addTaskSelectionBox = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.taskSelector = document.createElement('select');
  this.taskSelector.className = 'taskSelection';
  this.taskSelector.setAttribute('size', 10);
  this.taskSelector.style.left = (this.x + Constants.HTML.TASKSELECTOR_X)  + 'px';
  this.taskSelector.style.top = (this.y + Constants.HTML.QUESTION_INPUT_Y) + 'px';

  for (var i = 0; i < this.pointData.tasks.length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = 'Tehtävä ' + (i + 1);
    this.taskSelector.appendChild(option);
  }

  var self = this;
  this.taskSelector.onchange = function() {
    self.fillQuestionInput(this.value);
    self.fillAnswerInputs(this.value);
    self.addImagePreview(this.value);
  };
  parentDiv.appendChild(this.taskSelector);
};

PointEditScreen.prototype.fillQuestionInput = function(taskIndex) {
  this.questionInput.value = this.pointData.tasks[taskIndex].question;
};

PointEditScreen.prototype.fillAnswerInputs = function(taskIndex) {
  for (var i = 0; i < this.answerInputs.length; i++) {
    var answerTextInput = this.answerInputs[i].answerTextInput;
    var answerCheckboxInput = this.answerInputs[i].answerCheckboxInput;
    answerTextInput.value = this.pointData.tasks[taskIndex].answers[i].text;
    answerCheckboxInput.checked = this.pointData.tasks[taskIndex].answers[i].isCorrect;
  }
};

PointEditScreen.prototype.addImagePreview = function(taskIndex) {
  loadImageToSprite(this.previewFrame, this.pointData.tasks[taskIndex].image);
};

PointEditScreen.prototype.addFileInputHandler = function() {
  var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
  this.fileInputHandler = new FileInputHandler(this.x + 17, 578, parentDiv);
  this.fileInputHandler.addFileInputListener(this.previewFrame, this.imageInfo);
};

//Take the values from DOM inputs and save them to GameData.
//Then close this screen.
PointEditScreen.prototype.confirmListener = function() {
  if (this.allFilled() && this.correctAnswerExists()) {
    var task = new GameDataCreator.Task();
    task.question = this.questionInput.value;
    for (var i = 0; i < this.answerInputs.length; i++) {
      var answerText = this.answerInputs[i].answerTextInput.value;
      var isAnswerCorrect = this.answerInputs[i].answerCheckboxInput.checked;
      var answer = new GameDataCreator.Answer(answerText, isAnswerCorrect);
      task.answers.push(answer);
    }
    if (this.imageInfo.image !== '') {
      task.image = this.imageInfo.image;
    }
    if (this.taskSelector.value !== '') {
      this.pointData.tasks[this.taskSelector.value] = task;
    } else {
      this.pointData.tasks.push(task);
    }
    this.game.data.saveToLocalStorage();
    this.closeScreen();
  } else {
    this.highlightMissingInfo();
  }
};

PointEditScreen.prototype.allFilled = function() {
  if (this.questionInput.value.length === 0) {
    return false;
  }

  for (var i = 0; i < this.answerInputs.length; i++) {
    if (this.answerInputs[i].answerTextInput.value.length === 0) {
      return false;
    }
  }
  return true;
};

PointEditScreen.prototype.correctAnswerExists = function() {
  for (var i = 0; i < this.answerInputs.length; i++) {
    if (this.answerInputs[i].answerCheckboxInput.checked) {
      return true;
    }
  }
  return false;
};

PointEditScreen.prototype.highlightMissingInfo = function() {
  if (this.questionInput.value.length === 0) {
    this.questionInput.className += ' error';
  }
  var correctAnswers = 0;
  for (var i = 0; i < this.answerInputs.length; i++) {
    if (this.answerInputs[i].answerTextInput.value.length === 0) {
      this.answerInputs[i].answerTextInput.className += ' error';
    }
    if (this.answerInputs[i].answerCheckboxInput.checked) {
      correctAnswers++;
    }
  }
  if (correctAnswers === 0) {
    this.isCorrectText.addColor('red', 0);
  }
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

module.exports = PointEditScreen;
