'use strict';

(function () {

  // Обработчики событий
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var gallery = document.querySelector('.pictures');
  var closeButton = document.querySelector('.gallery-overlay-close');


  // Открытие фото-поапа при клике
  gallery.addEventListener('click', function (event) {
    openPopup(event);
  });

  // Открытие фото-поапа при нажатии на ENTER
  gallery.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      openPopup(event);
    }
  });

  // Закрытие фото-попапа при клике
  closeButton.addEventListener('click', function (event) {
    closePopup();
  });


  // Функция заполнения данных попапа
  function fillPopup(data) {
    var popup = document.querySelector('.gallery-overlay');
    popup.querySelector('.comments-count').textContent = data.comments.length;
    popup.querySelector('.likes-count').textContent = data.likes;
    popup.querySelector('img').setAttribute('src', data.url);
    popup.classList.remove('hidden');
  }

  // Функция открытия попапа
  function openPopup(event) {
    event.preventDefault();
    if (event.target.tagName === 'IMG' || event.target.tagName === 'SPAN') {
      var dataObject = event.target.parentNode.datashare;
      fillPopup(dataObject);

      document.addEventListener('keydown', onPopupEscPressPopup);

    } else if (event.target.tagName === 'A') {
      dataObject = event.target.datashare;
      fillPopup(dataObject);

      document.addEventListener('keydown', onPopupEscPressPopup);
    } else {

      return;
    }
  }

  // Закрытие закрытия попапа
  function closePopup(event) {
    var popup = document.querySelector('.gallery-overlay');
    popup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPressPopup);
  }

  // Закрытие попапа при нажатии на ESC
  function onPopupEscPressPopup(event) {
    if (event.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }
})();
