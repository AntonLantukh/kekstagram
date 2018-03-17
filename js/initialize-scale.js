'use strict';

(function () {

  window.initializeScale = function (inputScale, scaleButtons, callback) {
    scaleButtons[0].addEventListener('click', function () {
      var newValue = parseInt(inputScale.value.replace('%', ''), 10) - 25;
      callback(newValue, -1);
    });
    scaleButtons[1].addEventListener('click', function () {
      var newValue = parseInt(inputScale.value.replace('%', ''), 10) + 25;
      callback(newValue, 1);
    });
  };
})();
