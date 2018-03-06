'use strict';

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
      'comments': generateComments(photoText)
    };

    var photoNode = createPicture(posts[i]);
    photoNode.datashare = posts[i];

    fragment.appendChild(photoNode);
  }

  pictures.appendChild(fragment);
}

// Функция случайного числа в диапазоне
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации фото
function createPicture(photos) {
  var template = document.querySelector('#picture-template').content;
  var pictureElement = template.querySelector('.picture').cloneNode(true);
  pictureElement.querySelector('.picture-comments').textContent = photos.comments;
  pictureElement.querySelector('.picture-likes').textContent = photos.likes;
  pictureElement.querySelector('img').setAttribute('src', photos.url);

  return pictureElement;
}

// Функция заполнения превью
function createPreview(photos) {
  var preview = document.querySelector('.gallery-overlay').cloneNode(true);
  preview.querySelector('.comments-count').textContent = photos.comments.length;
  preview.querySelector('.likes-count').textContent = photos.likes;
  preview.querySelector('img').setAttribute('src', photos.url);

  return preview;
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

// Функция открытия попапа

// Обработчики событий
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var gallery = document.querySelector('.pictures');
var closeButton = document.querySelector('.gallery-overlay-close');

gallery.addEventListener('click', function (event) {
  openPopup(event);
});

closeButton.addEventListener('click', function (event) {
  closePopup();
});

gallery.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    openPopup(event);
  }
});


// Открытие попапа
function openPopup(event) {
  event.preventDefault();
  if (event.target.tagName === 'IMG' || event.target.tagName === 'SPAN') {
    var dataObject = event.target.parentNode.datashare;
    fillPopup(dataObject);

    document.addEventListener('keydown', onPopupEscPress);

  } else if (event.target.tagName === 'A') {
    dataObject = event.target.datashare;
    fillPopup(dataObject);

    document.addEventListener('keydown', onPopupEscPress);
  } else {

    return;
  }
}

function fillPopup(data) {
  var popup = document.querySelector('.gallery-overlay');
  popup.querySelector('.comments-count').textContent = data.comments.length;
  popup.querySelector('.likes-count').textContent = data.likes;
  popup.querySelector('img').setAttribute('src', data.url);
  popup.classList.remove('hidden');
}

// Закрытие попапа
function closePopup(event) {
  var popup = document.querySelector('.gallery-overlay');
  popup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
}

// Закрытие попапа при нажатии на ESC
function onPopupEscPress(event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}
