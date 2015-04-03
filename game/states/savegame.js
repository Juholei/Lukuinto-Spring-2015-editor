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
  uploadGameData: function() {
    console.log('Uploading');
    var gameData = this.game.data;
    if (gameData.image !== null && gameData.image !== undefined) {
      this.uploadImage(this.game.data);
    }
    for (var i = 0; i < gameData.points.length; i++) {
      var pointData = gameData.points[i];
      for (var j = 0; j < pointData.tasks.length; j++) {
        var task = pointData.tasks[j];
        if (task.image !== null && gameData.image !== undefined) {
          this.uploadImage(task);
        }
      }
    }
    console.log(this.game.data);
  },
  //Uploads the image which ObjectURL is at
  //dataObject.image and after uploading,
  //changes dataObject.image to image id
  //in the database.
  uploadImage: function(dataObject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataObject.image, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (this.status === 200) {
        var file = this.response;
        var formData = new FormData();
        formData.append('file', file);
        var request = new XMLHttpRequest();
        request.open('POST', '/upload', true);
        request.onload = function() {
          if (request.status === 200) {
            console.log('Uploaded');
            console.log(request.responseText);
            var responseObject = JSON.parse(request.responseText);
            dataObject.image = responseObject.id;
          } else {
            console.log(request.status + 'occurred uploading your file.');
          }
        };
        request.send(formData);
      }
    };
    xhr.send();
  }
};
module.exports = SaveGame;
