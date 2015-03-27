'use strict';

//Creates HTML input with type file and a div that is
//used as the graphical representation of the input instead
//of the default browser style button.
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

//Adds image as a label for the input element
FileInputHandler.prototype.addLabelImage = function() {
  var label = document.createElement('label');
  label.htmlFor = 'file-input';
  var image = document.createElement('img');
  image.src = 'assets/lisaa_kuva.png';
  image.className = 'clip pos-1';
  label.appendChild(image);
  this.fileInputDiv.appendChild(label);
};

//Adds an event listener to the fileinput object. The image selected
//from the input is set to the parameter sprite. ObjectURL of the image is
//put in gameDataObject for later use.
FileInputHandler.prototype.addFileInputListener = function(sprite, gameDataObject) {
  this.fileInput.addEventListener('change', function handleFiles(files) {
    var image = new Image();
    image.onload = function addImageToSprite() {
      var oldWidth = sprite.width;
      var oldHeight = sprite.height;
      sprite.loadTexture(new PIXI.Texture(new PIXI.BaseTexture(image, PIXI.scaleModes.DEFAULT)));
      console.log('Image loaded');
      sprite.width = oldWidth;
      sprite.height = oldHeight;
      gameDataObject.image = image.src;
    };
    image.src = URL.createObjectURL(files.target.files[0]);
  }, false);
};

FileInputHandler.prototype.remove = function() {
  this.fileInputDiv.parentNode.removeChild(this.fileInputDiv);
};

module.exports = FileInputHandler;
