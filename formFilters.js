'use strict';

(function () {

  // Работа с формой
  var filters = document.querySelector('.upload-effect-controls');
  var imagePreview = document.querySelector('.effect-image-preview');

  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var scaleInput = document.querySelector('.upload-resize-controls-value');

  var scaleFull = document.querySelector('.upload-effect-level');
  var pinHandler = document.querySelector('.upload-effect-level-pin');


  // Применение фото-фильтра к форме
  filters.addEventListener('click', function () {
    applyFilter(event);
  });

  // Событие уменьшения масштаба
  buttonDec.addEventListener('click', function () {
    increasePhoto();
  });

  // Событие увеличения масштаба
  buttonInc.addEventListener('click', function () {
    decreasePhoto();
  });

  // Работа с перетаскиванием пина
  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      left: evt.clientX
    };

    function onMouseMove(moveevt) {
      moveevt.preventDefault();

      var shift = startCoords.left - moveevt.clientX;
      startCoords = {
        left: moveevt.clientX
      };

      movePin(shift);
      changeFilter(movePin(shift));
    }

    function onMouseUp(upevt) {
      upevt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // Функция фото-фильтра
  function applyFilter(event) {
    if (event.target.className === 'upload-effect-preview') {
      imagePreview.className = 'effect-image-preview';
      imagePreview.removeAttribute('style', 'filter');
      var filter = event.target.parentNode.htmlFor;
      var filterName = filter.replace('upload-effect-', '');
      imagePreview.classList.add('effect-' + filterName);

      if (imagePreview.classList.contains('effect-none')) {
        scaleFull.setAttribute('style', 'display: none');
      } else {
        scaleFull.setAttribute('style', 'display: block');
      }
    }
  }

  // Функция увеличения изображения
  function increasePhoto() {
    if (scaleInput.value !== '25%') {
      scaleInput.setAttribute('value', parseInt(scaleInput.value.replace('%', ''), 10) - 25 + '%');
      var scaleValueDec = scaleInput.value.replace('%', '');
      imagePreview.setAttribute('style', 'transform: scale(' + scaleValueDec / 100 + ')');
    }
  }

  // Функция уменьшения изображения
  function decreasePhoto() {
    if (scaleInput.value !== '100%') {
      scaleInput.setAttribute('value', parseInt(scaleInput.value.replace('%', ''), 10) + 25 + '%');
      var scaleValueInc = scaleInput.value.replace('%', '');
      imagePreview.setAttribute('style', 'transform: scale(' + scaleValueInc / 100 + ')');
    }
  }

  // Функция по проверке границ ползунка
  function movePin(gap) {
    var scaleWidth = 455;
    var colorScale = document.querySelector('.upload-effect-level-val');

    if (((pinHandler.offsetLeft - gap) / scaleWidth * 100) < 0) {
      var level = 0;
      colorScale.setAttribute('style', 'width: 0');
    } else if (((pinHandler.offsetLeft - gap) / scaleWidth * 100) > 100) {
      level = 100;
      colorScale.setAttribute('style', 'width: 100');
    } else {
      level = (pinHandler.offsetLeft - gap) / scaleWidth * 100;
    }

    pinHandler.style.left = level + '%';
    colorScale.setAttribute('style', 'width: ' + level + '%');

    return level;
  }

  // Функция по применению фильтра при перемещени ползунка
  function changeFilter(size) {
    if (imagePreview.classList.contains('effect-sepia')) {
      imagePreview.setAttribute('style', 'filter: sepia(' + size / 100 + ');');

    } else if (imagePreview.classList.contains('effect-chrome')) {
      imagePreview.setAttribute('style', 'filter: grayscale(' + size / 100 + ');');

    } else if (imagePreview.classList.contains('effect-marvin')) {
      imagePreview.setAttribute('style', 'filter: invert(' + size + '%);');

    } else if (imagePreview.classList.contains('effect-phobos')) {
      imagePreview.setAttribute('style', 'filter: blur(' + size / 100 * 3 + 'px);');

    } else if (imagePreview.classList.contains('effect-heat')) {
      imagePreview.setAttribute('style', 'filter: brightness(' + size / 100 * 3 + ');');
    }
  }
})();
