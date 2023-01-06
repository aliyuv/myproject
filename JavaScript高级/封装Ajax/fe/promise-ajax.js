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

myAjax("GET", "https://api.apiopen.top/api/sentences")
  .then((response) => {
    console.log(response.responseText);
  })
  .then((response) => {
    return myAjax("GET", "https://api.apiopen.top/api/getTime");
  })
  .then((response) => {
    // return new Promise(() => {}); // 终止promise链
    console.log(JSON.parse(response.responseText).result);
  })
  .then((response) => {
    return myAjax(
      "GET",
      "https://api.apiopen.top/api/getImages?type=animal&page=0&size=10"
    );
  })
  .then((response) => {
    console.log(JSON.parse(response.responseText));
    return new Promise(() => {});
  })
  .then(() => {
    console.log("终止promise链");
  });
