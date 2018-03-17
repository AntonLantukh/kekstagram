'use strict';

(function () {

  window.initializeFilters = function (filtersContainer, callback) {
    filtersContainer.addEventListener('click', function () {
      if (event.target.className === 'upload-effect-preview') {
        callback(event);
      }
    });
  };
})();
