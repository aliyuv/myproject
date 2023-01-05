class MyEventBus {
  constructor() {
    // 事件池
    this.eventMap = {}; // {abc: [fn1, fn2]}
  }
  on(eventName, eventFn, thisArg) {
    // 事件池中没有该事件 则创建一个 有则直接push 进去
    this.eventMap[eventName] = this.eventMap[eventName] || [];
    this.eventMap[eventName].push({
      eventFn,
      thisArg,
    });
  }
  off(eventName, eventFn) {
    if (!this.eventMap[eventName]) return;
    // const newEventMap = [...this.eventMap[eventName]]; // 为了不影响原来的数组
    // for (let i = 0; i < newEventMap.length; i++) {
    //   const fn = newEventMap[i];
    //   if (fn.eventFn === eventFn) {
    //     const index = this.eventMap[eventName].indexOf(fn);
    //     this.eventMap[eventName].splice(index, 1);
    //   }
    // }

    // 优化 filter不会改变原数组 会返回一个新数组
    this.eventMap[eventName] = this.eventMap[eventName].filter(
      (fn) => fn.eventFn !== eventFn
    );
    if (this.eventMap[eventName].length === 0) {
      delete this.eventMap[eventName];
    }
  }
  emit(eventName, ...payload) {
    if (!this.eventMap[eventName]) return;
    this.eventMap[eventName].forEach((fn) =>
      fn.eventFn.apply(fn.thisArg, payload)
    );
  }
}

const eventZ = new MyEventBus();

const abc1 = function () {
  console.log("监听abc1", this);
};
const abc2 = function () {
  console.log("监听abc2", this);
};

const aliyu = {
  name: "小鱼儿",
  age: 18,
};

//使用
eventZ.on("abc", abc1, aliyu);
eventZ.on("abc", abc2, { name: "张三" });

function publish() {
  eventZ.emit("abc");
}

document.querySelector("button").addEventListener("click", publish);
setTimeout(() => {
  eventZ.off("abc", abc1);
  eventZ.off("abc", abc2);
  console.log("取消监听");
}, 3000);
