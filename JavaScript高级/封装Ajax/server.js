let http = require("http");
let fs = require("fs");
let url = require("url");
let port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

let server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  // 表驱动编程

  const table = {
    "/": [
      "text/html;charset=utf-8",
      `
    <html>
      <head>
        <link rel=stylesheet href="/style.css" />
      </head>
      <body>
        <h1>hello</h1>
        <button id=x>点击</button>
        <script src="/ajax.js"></script>
        <script src="/main.js"></script>
      </body>
    </html>
    `,
    ],
    "/style.css": [
      "text/css;charset=utf-8",
      `
      h1{color: red;}
    `,
    ],
    "/main.js": [
      "text/javascript;charset=utf-8",
      `
      const button = document.getElementById('x')
      button.onclick = ()=>{
        ajax({
          method: 'get',
          path: '/data',
          successFn: (xhr) => {
            console.log('成功了')
            console.log(xhr.responseText)
            console.log(typeof xhr.responseText)
            const obj = JSON.parse(xhr.responseText)
            console.log(obj)
          },
          failFn: (xhr) => {
            console.log('失败了')
          }
        })
      }
    `,
    ],
    "/ajax.js": [
      "text/javascript;charset=utf-8",
      `
    const ajax = ({ method, path, body, successFn, failFn }) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, path) // 1
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            successFn(xhr) // 2
          } else if (xhr.status >= 400) {
            failFn(xhr) // 3
          }
        }
      }
      xhr.send(body)
    }
    `,
    ],
    "/data": [
      "application/json;charset=utf-8",
      `
      {
        "name":"jack",
        "age":18
      }
    `,
    ],
  };

  if (table[path] !== undefined) {
    response.statusCode = 200;
    response.setHeader("Content-Type", table[path][0]);
    response.write(table[path][1]);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
