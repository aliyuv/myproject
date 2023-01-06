function myAjax(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      }
    };
  });
}

myAjax("GET", "https://api.apiopen.top/api/sentences").then(
  (response) => {
    console.log(response);
  },
  (response) => {
    console.log(response);
  }
);
