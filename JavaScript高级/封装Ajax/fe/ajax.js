const ajax = ({ method, path, body, successFn, failFn }) => {
  // 1. 创建 XMLHttpRequest 对象
  const xhr = new XMLHttpRequest();
  // 2. 使用 open 方法设置请求的 method 和 path 发送请求
  xhr.open(method, path);
  // 3. 监听是否响应成功
  xhr.onreadystatechange = () => {
    // 4 代表响应接受完成
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        successFn.call(undefined, xhr);
      } else if (xhr.status >= 400) {
        failFn.call(undefined, xhr);
      }
    }
  };
  // 5. 发送请求 body 是 post 请求的请求体 get 请求不需要 body 参数 传 undefined 即可 也可以不传
  xhr.send(body);
};
