'use strict';

(function () {

  // Работа с формой
  var ESC_KEYCODE = 27;

  var downloadFile = document.querySelector('#upload-file');
  var closeForm = document.querySelector('.upload-form-cancel');
  var form = document.querySelector('.upload-overlay');
  var commentField = document.querySelector('.upload-form-description');

  var scaleFull = document.querySelector('.upload-effect-level');

  // Открытие формы редактирования фото при загрузке
  downloadFile.addEventListener('change', function () {
    form.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPressForm);
    scaleFull.setAttribute('style', 'display: none');
  });

  // Закрытие формы при клике на крестик
  closeForm.addEventListener('click', function () {
    form.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPressForm);
  });

  // Функция закрытия формы при нажатии на ESC
  function onPopupEscPressForm(event) {
    if (event.keyCode === ESC_KEYCODE && event.target !== commentField) {
      form.classList.add('hidden');
    }
  }
})();
