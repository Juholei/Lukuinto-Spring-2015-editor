'use strict';

function MajorPoint(x, y) {
  this.x = x;
  this.y = y;
}

function GameData() {
  this.startPoint = new MajorPoint();
  this.endPoint = new MajorPoint();
  this.points = [];
  this.saveToLocalStorage = function() {
    window.localStorage.setItem('lukuseikkailu-editor', JSON.stringify(this));
  };
  this.loadFromLocalStorage = function() {
    var loadedEditorState = window.localStorage.getItem('lukuseikkailu-editor');
    var gameData = JSON.parse(loadedEditorState);
    if (gameData.startPoint.x !== undefined) {
      this.startPoint = gameData.startPoint;
      console.log('start');
    }
    if (gameData.endPoint.x !== undefined) {
      this.endPoint = gameData.endPoint;
      console.log('end');
    }
    this.points = gameData.points;

    for (var i = 0; i < gameData.points.length; i++) {
      var tasks = gameData.points[i].tasks;
      for (var j = 0; j < tasks.length; j++) {
        if (tasks[j].image !== undefined) {
          tasks[j].image = undefined;
        }
      }
    }
  };
}

function GamePoint(x, y, state, image) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.state = state;
  this.tasks = [];
}

function Task() {
  this.question = '';
  this.answers = [];
}

function Answer(text, isCorrect) {
  this.text = text;
  this.isCorrect = isCorrect;
}

var GameDataCreator = {
  GameData: GameData,
  MajorPoint: MajorPoint,
  GamePoint: GamePoint,
  Task: Task,
  Answer: Answer
};

module.exports = GameDataCreator;
