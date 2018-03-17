'use strict';

(function () {

  // Работа с формой
  var imagePreview = document.querySelector('.effect-image-preview');

  var scaleButtons = document.querySelectorAll('.upload-resize-controls-button');

  var filtersContainer = document.querySelector('.upload-effect-controls');
  var scaleInput = document.querySelector('.upload-resize-controls-value');

  var scaleFull = document.querySelector('.upload-effect-level');
  var pinHandler = document.querySelector('.upload-effect-level-pin');


  window.initializeScale(scaleInput, scaleButtons, adjustScale);

  window.initializeFilters(filtersContainer, applyFilter);


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

  // Колбэк для масштаба изображения
  function adjustScale(prospectiveValue, direction) {
    if (prospectiveValue >= 25 && prospectiveValue <= 100) {
      scaleInput.setAttribute('value', parseInt(scaleInput.value.replace('%', ''), 10) + (direction * 25) + '%');
      imagePreview.setAttribute('style', 'transform: scale(' + prospectiveValue / 100 + ')');
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
