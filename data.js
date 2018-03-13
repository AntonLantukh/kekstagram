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
    },

    // Функция генерации массива комментариев
    generateComments: function (comments) {
      var count = getRandomInRange(1, 2);
      var commentsArray = [];
      for (var i = 0; i < count; i++) {
        commentsArray.push(comments[getRandomInRange(0, 5)]);
      }
      return commentsArray;
    }
  };


  // Функция случайного числа в диапазоне
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
