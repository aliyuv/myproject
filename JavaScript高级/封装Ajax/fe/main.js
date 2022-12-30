ajax({
  method: "get",
  path: "/data",
  successFn: (xhr) => {
    console.log("成功了");
    const obj = JSON.parse(xhr.responseText);
    console.log(obj);
  },
  failFn: (xhr) => {
    console.log("失败了");
  },
});
