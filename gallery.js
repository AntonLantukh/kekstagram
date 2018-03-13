'use strict';

(function () {

  var photoText = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];


  renderPicture(photoText);

  // Функция рендера фото на странице
  function renderPicture(commentText) {
    var posts = [];
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 26; i++) {
      posts[i] = {
        'url': 'photos/' + (i + 1) + '.jpg',
        'likes': getRandomInRange(15, 2000),
        'comments': window.data.generateComments(photoText)
      };

      var photoNode = window.data.createPicture(posts[i]);
      photoNode.datashare = posts[i];

      fragment.appendChild(photoNode);
    }

    pictures.appendChild(fragment);
  }


  // Функция случайного числа в диапазоне
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
