// //使用闭包实现
// function Jquery(selector) {
//   //获取所有元素
//   const allElements = document.querySelectorAll(selector);
//   //把所有元素这个类数组转换成数组
//   const elements = Array.from(allElements);
//   // return 操作元素的方法
//   return {
//     //添加类名
//     addClass(className) {
//       elements.forEach((item) => {
//         item.classList.add(className);
//       });
//     },
//     //删除类名
//     removeClass(className) {
//       elements.forEach((item) => {
//         item.classList.remove(className);
//       });
//     },
//   };
// }

// //把地址给暴露出去
// const $ = Jquery;

//使用
// const btn = document.querySelector("#click");
// btn.addEventListener("click", () => {
//   $(".red").addClass("green");
//   $(".red").addClass("blue");
// });

// console.log($(".red") === $(".red"));
// function f() {
//   let a = 1;
//   return function () {
//     a += 1;
//     console.log(a);
//   };
// }

// const f1 = f();
// const f2 = f();
// console.log(f1 === f2);

// // 使用原型的方式实现
// function Jquery(selector) {
//   //获取所有元素
//   //自有属性
//   if (!(this instanceof Jquery)) {
//     return new Jquery(selector);
//   }
//   this.elements = Array.from(document.querySelectorAll(selector));
// }

// //原型上的方法
// Jquery.prototype = {
//   //构造函数
//   constructor: Jquery,
//   //添加类名
//   addClass(className) {
//     this.elements.forEach((item) => {
//       item.classList.add(className);
//     });
//      return this;
//   },
//   //删除类名
//   removeClass(className) {
//     this.elements.forEach((item) => {
//       item.classList.remove(className);
//     });
// return this;
//   },
// };

// const $ = Jquery;

// //使用
// const btn = document.querySelector("#click");
// btn.addEventListener("click", () => {
//   $(".red").addClass("green");
//   $(".red").addClass("blue");
// });

//使用class实现;
class Jquery {
  constructor(selector) {
    //获取所有元素
    //自有属性
    //new.target指向构造函数
    this.elements = Array.from(document.querySelectorAll(selector));
  }
  //添加类名
  addClass(className) {
    this.elements.forEach((item) => {
      item.classList.add(className);
    });
    return this;
  }
  //删除类名
  removeClass(className) {
    this.elements.forEach((item) => {
      item.classList.remove(className);
    });
    return this;
  }
}

const $ = Jquery;
//使用
const btn = document.querySelector("#click");
btn.addEventListener("click", () => {
  new $(".red").addClass("green");
  new $(".red").addClass("blue");
});
