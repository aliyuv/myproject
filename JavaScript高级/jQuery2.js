function JQuery2(selector_or_element_or_array) {
  if (!(this instanceof JQuery2)) {
    return new JQuery2(selector_or_element_or_array);
  }
  //获取元素伪数组
  //   const ElementalPseudoArray = (
  //     arguments.length === 1 ? elements : document
  //   ).querySelectorAll(selector);
  //   const ElementalPseudoArray = (
  //     elements === undefined ? document : elements
  //   ).querySelectorAll(selector);
  //   //将伪数组转换为数组
  //   this.elementArray = Array.from(ElementalPseudoArray);

  //重载
  //如果传入的是字符串，就是选择器
  if (typeof selector_or_element_or_array === "string") {
    const ElementalPseudoArray = document.querySelectorAll(
      selector_or_element_or_array
    );
    this.elementArray = Array.from(ElementalPseudoArray);
  } //如果传入的是数组，就是元素
  else if (selector_or_element_or_array instanceof Element) {
    this.elementArray = [selector_or_element_or_array];
  } else {
    //确定传入的是元素数组
    const ElementalPseudoArray = selector_or_element_or_array;
    this.elementArray = Array.from(ElementalPseudoArray);
  }
}

JQuery2.prototype = {
  constructor: JQuery2,
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
};

const $ = JQuery2;

//用法
const button = document.getElementById("click");
const x = document.getElementById("x");
const redList = document.querySelectorAll(".red");
button.addEventListener("click", () => {
  $(".red").addClass("green").addClass("big");
  $(x).addClass("green");
  $(redList).addClass("bd");
});
