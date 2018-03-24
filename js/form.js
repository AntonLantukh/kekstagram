'use strict';

(function () {

  // Работа с формой
  var ESC_KEYCODE = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var downloadFile = document.querySelector('#upload-file');
  var preview = document.querySelector('.effect-image-preview');
  var closeForm = document.querySelector('.upload-form-cancel');
  var formWindow = document.querySelector('.upload-overlay');
  var form = document.querySelector('.upload-form');
  var commentField = document.querySelector('.upload-form-description');

  var scaleFull = document.querySelector('.upload-effect-level');

  // Открытие формы редактирования фото при загрузке
  downloadFile.addEventListener('change', function () {
    formWindow.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPressForm);
    scaleFull.setAttribute('style', 'display: none');

    var file = downloadFile.files[0];
    var fileName = file.name.toLowerCase();
    var mathes = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (mathes) {
      insertPicture(file);
    }
  });

  // Закрытие формы при клике на крестик
  closeForm.addEventListener('click', function () {
    formWindow.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPressForm);
  });

  // Функция закрытия формы при нажатии на ESC
  function onPopupEscPressForm(event) {
    if (event.keyCode === ESC_KEYCODE && event.target !== commentField) {
      formWindow.classList.add('hidden');
    }
  }

  // Сабмит формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.backend.onErrorCallback);
  });

  // Функция вставки фото пр загрузке
  function insertPicture(file) {
    var filterPreview = document.querySelectorAll('.upload-effect-preview');
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      preview.setAttribute('src', reader.result);
      preview.setAttribute('width', 586);
      preview.setAttribute('height', 587);

      filterPreview.forEach(function (item, i, arr) {
        item.setAttribute('style', 'background-image: url("' + reader.result + '");');
      });
    });
    reader.readAsDataURL(file);
  }
})();
