'use strict';

(function () {

  var filters = document.querySelector('.filters');

  filters.addEventListener('click', function (event) {
    var pictures = document.querySelectorAll('.picture');
    var sortedArray;
    var sortedDefault = window.gallery.photosArray;

    if (event.target.htmlFor === 'filter-recommend') {
      deleteNodes(pictures);
      window.photos.preparePhotoNodes(sortedDefault);

    } else if (event.target.htmlFor === 'filter-popular') {

      sortedArray = sortPictures(window.gallery.photosArray, 'likes');

      deleteNodes(pictures);
      window.photos.preparePhotoNodes(sortedArray);

    } else if (event.target.htmlFor === 'filter-discussed') {

      sortedArray = sortPictures(window.gallery.photosArray, 'comments');

      deleteNodes(pictures);
      window.photos.preparePhotoNodes(sortedArray);


    } else if (event.target.htmlFor === 'filter-random') {

      sortedArray = window.gallery.photosArray.slice().sort(compareRandom);
      deleteNodes(pictures);
      window.photos.preparePhotoNodes(sortedArray);

    } else {
      return;
    }
  });


// Функция удаления нод
  function deleteNodes(nodes) {
    Array.from(nodes).forEach(function (item, i, array) {
      item.remove();
    });
  }

  // Функция сортировки
  function sortPictures(array, param) {
    // Если массив
    if (Array.isArray(param)) {
      return array.slice().sort(function (first, second) {
        if (first[param].length > second[param].length) {
          return 1;
        } else if (first[param].length < second[param].length) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
       // Если не массив
      return array.slice().sort(function (first, second) {
        if (first[param] > second[param]) {
          return 1;
        } else if (first[param] < second[param]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  // Функция рандомного перемешивания массива
  function compareRandom() {
    return Math.random() - 0.5;
  }
})();
