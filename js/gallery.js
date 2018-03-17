'use strict';

(function () {

  window.backend.load(onSuccessCallback, window.backend.onErrorCallback);

  // Функция рендера фото на странице
  function onSuccessCallback(data) {
    var posts = data;
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 26; i++) {

      var photoNode = window.data.createPicture(posts[i]);
      photoNode.datashare = posts[i];

      fragment.appendChild(photoNode);
    }

    pictures.appendChild(fragment);
  }

})();
