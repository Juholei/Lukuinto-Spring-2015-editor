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
    var img = document.getElementById('kuva');
    this.uploadImage(this.game.data.image);
  },
  uploadImage: function(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        var file = this.response;
        var formData = new FormData();
        formData.append('file', file);
        var request = new XMLHttpRequest();
        request.open('POST', '/upload', true);
        request.onload = function() {
          if (request.status === 200) {
            console.log('Uploaded');
            console.log(request.responseText);
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
