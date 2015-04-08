'use strict';
var MapView = require('../prefabs/mapview');
var FileInputHandler = require('../fileinputhandler');
var titleTextStyle = require('../titletextstyle');

function BackgroundSelection() {}
BackgroundSelection.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    this.mapView = new MapView(this.game, null, this);
    this.game.add.existing(this.mapView);
    this.mapView.toggleInputOnPointViews(false);
    var titleText = this.game.add.text(512, 32, 'Vaihe 1: Lisää taustakuva pelille', titleTextStyle);
    titleText.anchor.setTo(0.5);
    var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
    this.fileInputHandler = new FileInputHandler(435, 649, parentDiv);
    this.fileInputHandler.addFileInputListener(this.mapView.displayImage, this.game.data);
    this.game.add.button(895, 644, 'next-state', this.moveToNextState, this, 1, 0, 2, 0);
  },
  shutdown: function() {
    this.fileInputHandler.remove();
  },
  moveToNextState: function() {
    this.game.state.start('pointeditor');
  }
};
module.exports = BackgroundSelection;
