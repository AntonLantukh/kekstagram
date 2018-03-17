'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  function setup(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000; // 5s

    return xhr;

  }

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    onErrorCallback: function (errorMessage) {
      var node = document.createElement('div');
      node.setAttribute('style', 'position: absolute; left: 0; right: 0; width: 600px; height: 50px; z-index: 100; margin: 0 auto; text-align: center; font-size: 30px; background-color: red');
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
