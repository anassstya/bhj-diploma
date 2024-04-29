/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const { url, data, method, callback} = options;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onload = () => {
    if(xhr.status >= 200 && xhr.status < 300){
      try{
        callback(null, xhr.response);
      } catch{
        const error = new Error(`Request failed with status ${xhr.status}`);
        callback(error, null);
      }
    }
  }

  xhr.onerror = () => {
    callback(new Error('Request failed'), null);
  };

  if (method === 'GET') {
    xhr.open('GET', url);
    xhr.send();
  } else {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    xhr.open(method, url);
    xhr.send(formData);
  }
};



