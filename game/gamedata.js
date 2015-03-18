'use strict';

function MajorPoint(x, y) {
  this.x = x;
  this.y = y;
}

function GameData() {
  this.startPoint = new MajorPoint();
  this.endPoint = new MajorPoint();
  this.points = [];
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
