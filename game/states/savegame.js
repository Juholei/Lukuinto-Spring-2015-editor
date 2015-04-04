'use strict';
var LabeledButton = require('../prefabs/labeledbutton');

function SaveGame() {}
SaveGame.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    var saveButton = new LabeledButton(this.game, this.game.world.centerX, 180, 'Tallenna', this.uploadGameData, this);
    this.game.add.existing(saveButton);
  },
  update: function() {
  },
  paused: function() {
  },
  render: function() {
  },
  shutdown: function() {
  },
  uploadGameData: function(button) {
    button.inputEnabled = false;
    button.visible = false;
    var textStyle = {
      font: '24pt Arial',
      fill: 'white',
      strokeThickness: 5,
      align: 'center',
    };
    this.progressText = this.game.add.text(this.game.world.centerX, 30, 'Peliä tallennetaan...', textStyle);
    this.progressText.anchor.setTo(0.5);

    console.log('Uploading');
    var stack = [];
    var gameData = this.game.data;
    if (gameData.image !== null && gameData.image !== undefined) {
      stack.push(this.game.data);
    }
    for (var i = 0; i < gameData.points.length; i++) {
      var pointData = gameData.points[i];
      for (var j = 0; j < pointData.tasks.length; j++) {
        var task = pointData.tasks[j];
        if (task.image !== null && gameData.image !== undefined) {
          stack.push(task);
        }
      }
    }
    this.uploadImage(stack);
  },
  //Uploads the image which ObjectURL is at
  //dataObject.image and after uploading,
  //changes dataObject.image to image id
  //in the database.
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
        self.progressText.text = 'Peli tallennettu palvelimelle!';
      }
    };
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(this.game.data));
  }
};
module.exports = SaveGame;
