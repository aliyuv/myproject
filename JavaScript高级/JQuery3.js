function JQuery3(selector, element) {
  if (!(this instanceof JQuery3)) {
    return new JQuery3(selector, element);
  }
  //同名不同参
  //   debugger;
  //   const ElementalPseudoArray = (
  //     arguments.length === 2 || element !== undefined ? element : document
  //   ).querySelectorAll(selector);
  const ElementalPseudoArray = (
    element === undefined ? document : element
  ).querySelectorAll(selector);
  this.elementArray = Array.from(ElementalPseudoArray);
}

JQuery3.prototype = {
  constructor: JQuery3,
  //添加class
  addClass(className) {
    this.elementArray.forEach((element) => {
      element.classList.add(className);
    });
    return this;
  },
  //删除class
  removeClass(className) {
    this.elementArray.forEach((element) => {
      element.classList.remove(className);
    });
    return this;
  },
  //获取文本
  text(param) {
    if (arguments.length === 0) {
      return this.elementArray[0].textContent;
    } else {
      if (this.elementArray[0].textContent.length > 0) {
        this.elementArray[0].textContent = "";
      }
      const textNode = document.createTextNode(param);
      this.elementArray[0].appendChild(textNode);
    }
  },
  //获取当前元素索引
  index() {
    const element = this.elementArray[0]; //如果遇到多个元素，只取第一个
    const parent = element.parentNode; //获取父元素
    const children = parent.children; //获取父元素的所有子元素
    let index = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] === element) {
        index = i;
      }
    }
    return index;
  },
};

const $ = JQuery3;

//用法
const button = document.getElementById("click");
const x = document.getElementById("x");
const redList = document.querySelectorAll(".red");
button.addEventListener("click", () => {
  //   $(".red", x).addClass("blue");
  const cxk = $(".ikun").text(); //获取文本
  $(".ikun").text("泰隆"); //设置文本
  //获取索引
  const currentIndex = $("#qq").index();
  console.log(currentIndex);
});
