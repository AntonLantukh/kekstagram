'use strict';

(function () {

  // Работа с валидацией
  var hashInput = document.querySelector('.upload-form-hashtags');


  hashInput.addEventListener('blur', function (event) {
    validateHash();
  });


  function validateHash() {
    var data = hashInput.value.split(' ');
    hashInput.setCustomValidity('');
    hashInput.setAttribute('style', '');

    if (hashInput.value === '') {
      return;

    } else if (data.every(uniqueCheckCallback) === false) {
      hashInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      hashInput.setAttribute('style', 'border: 2px solid red');

    } else if (data.length > 4) {
      hashInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      hashInput.setAttribute('style', 'border: 2px solid red');

    } else if (data.every(lengthCheckCallback) === false) {
      hashInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      hashInput.setAttribute('style', 'border: 2px solid red');

    } else if (data.every(hashCheckCallback) === false) {
      hashInput.setCustomValidity('Хэш-тег должен начинаться с символа `#` (решётка)');
      hashInput.setAttribute('style', 'border: 2px solid red');

    } else if (data.every(spaceCheckCallback) === false) {
      hashInput.setCustomValidity('Хэш-теги разделяются пробелами');
      hashInput.setAttribute('style', 'border: 2px solid red');
    }
  }

  // Колюбэк для проверки длины
  function lengthCheckCallback(item, i, dataSet) {
    if (item.length > 21) {
      return false;
    } else {
      return true;
    }
  }

  // Колбэк для проервки хэша
  function hashCheckCallback(item, i, dataSet) {
    if (!item.match(/#[А-Яа-яA-Za-z]*/)) {
      return false;
    } else {
      return true;
    }
  }

  // Колбэк для проервки уникальности
  function uniqueCheckCallback(item, i, dataSet) {
    var dataString = dataSet.join(' ');
    var reg = new RegExp(item, 'ig');
    var result = dataString.match(reg);
    if (result.length > 1) {
      return false;
    } else {
      return true;
    }
  }

  // Колбэк для проервки разделителя
  function spaceCheckCallback(item, i, dataSet) {
    if (item.match(/[^#А-Яа-яёA-Za-z]/)) {
      return false;
    } else {
      return true;
    }
  }
})();
