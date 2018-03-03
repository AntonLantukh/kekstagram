'use strict';

var fragment = document.createDocumentFragment();
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

  for (var i = 0; i < 25; i++) {
    posts[i] = {
      'url': 'photos/' + (i + 1) + '.jpg',
      'likes': getRandomInRange(15, 2000),
      'comments': generateComments(photoText)
    };

    createPicture(posts[i]);

    if (i === 0) {
      createPreview(posts[i]);
    }

  }
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
}

// Функция случайного числа в диапазоне
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации фото
function createPicture(photos) {
  var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);
  pictureElement.querySelector('.picture-comments').textContent = photos.comments;
  pictureElement.querySelector('.picture-likes').textContent = photos.likes;
  pictureElement.querySelector('img').setAttribute('src', photos.url);
  fragment.appendChild(pictureElement);
}

// Функция заполнения превью
function createPreview(photos) {
  var preview = document.querySelector('.gallery-overlay');
  preview.querySelector('.comments-count').textContent = photos.comments.length;
  preview.querySelector('.likes-count').textContent = photos.likes;
  preview.querySelector('img').setAttribute('src', photos.url);
}

// Функция генерации массива комментариев
function generateComments(comments) {
  var count = getRandomInRange(1, 2);
  var commentsArray = [];
  for (var i = 0; i < count; i++) {
    commentsArray.push(comments[getRandomInRange(0, 5)]);
  }
  return commentsArray;
}
