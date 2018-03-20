'use strict';

(function () {

  window.backend.load(onSuccessCallback, window.backend.onErrorCallback);


  // Колбэк при успешной загрузке массива фотографий
  function onSuccessCallback(data) {
    window.gallery = {
      photosArray: data
    };

    var filters = document.querySelector('.filters');

    window.photos.preparePhotoNodes(data);

    filters.classList.remove('filters-inactive');

  }
})();
