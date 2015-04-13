'use strict';

module.exports = function(x, y, placeholder, parent) {
  var textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'textInput';
  textInput.setAttribute('placeholder', placeholder);
  textInput.style.left = x + 'px';
  textInput.style.top = y + 'px';
  parent.appendChild(textInput);

  return textInput;
};
