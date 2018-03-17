'use strict';

(function () {

  // Работа с формой
  var ESC_KEYCODE = 27;

  var downloadFile = document.querySelector('#upload-file');
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.backend.onErrorCallback);
  });
})();
