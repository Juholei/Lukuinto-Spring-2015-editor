'use strict';
var titleTextStyle = require('../titletextstyle');
var addTextInput = require('../addtextinput');

function CongratulationsEditor() {}
CongratulationsEditor.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.image(0, 0, 'frame');
    var titleText = this.game.add.text(512, 32, 'Vaihe 4: Aseta onnitteluviestit', titleTextStyle);
    titleText.anchor.setTo(0.5);
    this.buttons = this.game.add.group();
    var backButton = this.game.add.button(50, 641, 'previous-state', this.moveToPreviousState, this, 1, 0, 2, 0);
    var forwardButton = this.game.add.button(895, 644, 'next-state', this.moveToNextState, this, 1, 0, 2, 0);
    this.createInputs();
    this.createLabelTexts();
    this.buttons.add(backButton);
    this.buttons.add(forwardButton);

    this.fillInputs();
  },
  update: function() {
  },
  paused: function() {
  },
  render: function() {
  },
  shutdown: function() {
    for (var i = 0; i < this.inputs.length; i++) {
      this.inputs[i].parentNode.removeChild(this.inputs[i]);
    }
  },
  createInputs: function() {
    this.inputs = [];
    var parentDiv = document.getElementById('lukuinto-spring-2015-editor');
    var placeholderStrings = ['Onnitteluviesti täydelliselle tulokselle',
    'Onnitteluviesti hienolle tulokselle',
    'Onnitteluviesti hyvälle tulokselle',
    'Onnitteluviesti aloittelijan tulokselle',
    'Onnitteluviesti heikolle tulokselle'];

    for (var i = 0; i < 5; i++) {
      var input = addTextInput(this.game.world.centerX - 151, 200 + i * 50, placeholderStrings[i], parentDiv);
      this.inputs.push(input);
    }
  },
  createLabelTexts: function() {
    var labelStrings = ['Täydellinen tulos', 'Hieno tulos', 'Hyvä tulos', 'Aloittelijan tulos', 'Heikko tulos'];
    var textStyle = {
      font: '16pt Arial',
      fill: 'white',
      strokeThickness: 5,
      align: 'center',
    };

    for (var i = 0; i < 5; i++) {
      var labelText = this.game.add.text(this.game.world.centerX - 155, 205 + i * 50, labelStrings[i], textStyle);
      labelText.anchor.setTo(1, 0);
    }
  },
  fillInputs: function() {
    var gameData = this.game.data;
    if (gameData.boyCongratulatoryStrings !== undefined) {
      this.inputs[0].value = gameData.boyCongratulatoryStrings.excellent;
      this.inputs[1].value = gameData.boyCongratulatoryStrings.great;
      this.inputs[2].value = gameData.boyCongratulatoryStrings.good;
      this.inputs[3].value = gameData.boyCongratulatoryStrings.rookie;
      this.inputs[4].value = gameData.boyCongratulatoryStrings.poor;
    }
  },
  moveToPreviousState: function() {
    this.game.data.saveToLocalStorage();
    this.game.state.start('taskeditor');
  },
  moveToNextState: function() {
    var gameData = this.game.data;
    gameData.boyCongratulatoryStrings = {
      excellent: this.inputs[0].value,
      great: this.inputs[1].value,
      good: this.inputs[2].value,
      rookie: this.inputs[3].value,
      poor: this.inputs[4].value
    };
    this.game.data.saveToLocalStorage();
    this.game.state.start('savegame');
  }
};
module.exports = CongratulationsEditor;
