//实现加载图片的回调函数例子
function loadImg(src, callback) {
  const img = new Image();
  img.src = src;
  img.onload = function () {
    callback(img.src);
  };
  img.onerror = function () {
    callback("图片加载失败");
    throw new Error("图片加载失败");
  };
}

loadImg(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKJtF8T8Y33ht-hpRSUd3tfbdOqLgD6L05g&usqp=CAU",
  function (data) {
    console.log(data);
  }
);
