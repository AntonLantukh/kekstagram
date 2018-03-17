'use strict';

(function () {

  window.data = {

    // Функция генерации фото
    createPicture: function (photos) {
      var template = document.querySelector('#picture-template').content;
      var pictureElement = template.querySelector('.picture').cloneNode(true);
      pictureElement.querySelector('.picture-comments').textContent = photos.comments;
      pictureElement.querySelector('.picture-likes').textContent = photos.likes;
      pictureElement.querySelector('img').setAttribute('src', photos.url);

      return pictureElement;
    }
  };

})();
