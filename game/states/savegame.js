'use strict';
var LabeledButton = require('../prefabs/labeledbutton');
var titleTextStyle = require('../titletextstyle');
var addTextInput = require('../addtextinput');

function SaveGame() {}
SaveGame.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
    this.textInput = addTextInput(this.game.world.centerX - 151, 220, 'Syötä pelin nimi', parentDiv);
    var centerX = this.game.world.centerX;
    var centerY = this.game.world.centerY;
    var titleText = this.game.add.text(512, 32, 'Vaihe 4: Julkaise peli', titleTextStyle);
    titleText.anchor.setTo(0.5);
    this.buttons = this.game.add.group();
    var saveButton = new LabeledButton(this.game, centerX, centerY - 73, 'Julkaise', this.uploadGameData, this);
    this.buttons.add(saveButton);
    var backButton = new LabeledButton(this.game, centerX, centerY, 'Muokkaa', this.moveToPreviousState, this);
    this.buttons.add(backButton);
  },
  update: function() {
  },
  paused: function() {
  },
  render: function() {
  },
  shutdown: function() {
    this.textInput.parentNode.removeChild(this.textInput);
  },
  uploadGameData: function() {
    this.buttons.setAll('visible', false);
    this.buttons.setAll('inputEnabled', false);
    this.game.data.name = this.textInput.value;
    console.log(this.textInput.value);
    this.textInput.parentNode.removeChild(this.textInput);
    var centerX = this.game.world.centerX;
    var centerY = this.game.world.centerY;
    this.progressText = this.game.add.text(centerX, centerY, 'Peliä siirretään palvelimelle...', titleTextStyle);
    this.progressText.anchor.setTo(0.5);

    var stack = [];
    var gameData = this.game.data;
    if (gameData.image !== null && gameData.image !== undefined) {
      stack.push(this.game.data);
    }
    this.addGameImages(gameData, stack);
    this.uploadImage(stack);
  },
  addGameImages: function(gameData, stack) {
    for (var i = 0; i < gameData.points.length; i++) {
      var pointData = gameData.points[i];
      for (var j = 0; j < pointData.tasks.length; j++) {
        var task = pointData.tasks[j];
        if (task.image !== null && task.image !== undefined) {
          stack.push(task);
        }
      }
    }
  },
  //Pops an object from the stack and uploads the image which ObjectURL is at
  //dataObject.image and after uploading changes dataObject.image to  match
  //image id in the database. Then recursively calls itself with the stack.
  //When stack is empty, game data json is uploaded.
  uploadImage: function(stack) {
    var dataObject = stack.pop();

    if (dataObject === undefined) {
      this.uploadGameJSON();
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', dataObject.image);
      xhr.responseType = 'blob';
      var self = this;
      xhr.onload = function() {
        if (this.status === 200) {
          var file = this.response;
          var formData = new FormData();
          formData.append('file', file);
          var request = new XMLHttpRequest();
          request.open('POST', '/upload');
          request.onload = function() {
            if (request.status === 200) {
              console.log('Uploaded');
              console.log(request.responseText);
              var responseObject = JSON.parse(request.responseText);
              dataObject.image = responseObject.id;
              self.uploadImage(stack);
            } else {
              console.log(request.status + 'occurred uploading your file.');
            }
          };
          request.send(formData);
        }
      };
      xhr.send();
    }
  },
  uploadGameJSON: function() {
    var request = new XMLHttpRequest();
    request.open('POST', '/savegamejson');
    var self = this;
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        console.log(request.responseText);
        self.progressText.text = 'Peli siirretty palvelimelle!';
      }
    };
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(this.game.data));
  },
  moveToPreviousState: function() {
    this.game.state.start('taskeditor');
  },
};
module.exports = SaveGame;
