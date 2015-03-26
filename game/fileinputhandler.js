'use strict';

var FileInputHandler = function(x, y, parentDiv) {
  this.fileInputDiv = document.createElement('div');
  this.fileInputDiv.className = 'image-upload';
  this.fileInputDiv.style.left = x + 'px';
  this.fileInputDiv.style.top = y + 'px';

  this.addLabelImage();

  this.fileInput = document.createElement('input');
  this.fileInput.type = 'file';
  this.fileInput.id = 'file-input';
  this.fileInputDiv.appendChild(this.fileInput);
  parentDiv.appendChild(this.fileInputDiv);
};

FileInputHandler.prototype.constructor = FileInputHandler;

FileInputHandler.prototype.addLabelImage = function() {
  var label = document.createElement('label');
  label.htmlFor = 'file-input';
  var image = document.createElement('img');
  image.src = 'assets/lisaa_kuva.png';
  image.className = 'clip pos-1';
  label.appendChild(image);
  this.fileInputDiv.appendChild(label);
};

FileInputHandler.prototype.remove = function() {
  this.fileInputDiv.parentNode.removeChild(this.fileInputDiv);
};

module.exports = FileInputHandler;
