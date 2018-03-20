'use strict';

(function () {

  // Функция создания фото-нод
  window.photos = {
    preparePhotoNodes: function (photos) {
      var fragment = document.createDocumentFragment();
      var pictures = document.querySelector('.pictures');


      for (var i = 0; i < 26; i++) {

        var photoNode = window.data.createPicture(photos[i]);
        photoNode.datashare = photos[i];

        fragment.appendChild(photoNode);
      }

      pictures.appendChild(fragment);
    }
  };
})();
