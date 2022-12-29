function time(...params) {
  //判断this是否是time的实例
  if (!(this instanceof time)) {
    return new time(...params);
  }
  if (arguments.length > 1) {
    params[1] -= 1; // 月份从0开始 0-11 1-12 所以-1
  }
  this.date = new Date(...params);
}

// 原型上添加方法
time.prototype = {
  constructor: time,
  // 获取时间的各个部分 year month day hour minute second millisecond ms
  parts(attrs) {
    if (attrs === undefined) {
      return {
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1, // 月份从0开始 0-11 1-12 所以+1
        day: this.date.getDate(),
        weekday: this.date.getDay(),
        hour: this.date.getHours(),
        minute: this.date.getMinutes(),
        second: this.date.getSeconds(),
        ms: this.date.getMilliseconds(),
      };
    } else {
      const { year, month, day, hour, minute, second, ms } = attrs;
      // undefined null 0 "" false NaN 0 bug 因为要设置的值为0
      year !== undefined && this.date.setFullYear(year);
      month !== undefined && this.date.setMonth(month - 1); // 传入的值是1-12 所以-1
      day !== undefined && this.date.setDate(day);
      hour !== undefined && this.date.setHours(hour);
      minute !== undefined && this.date.setMinutes(minute);
      second !== undefined && this.date.setSeconds(second);
      ms !== undefined && this.date.setMilliseconds(ms);
    }
  },
  add(n, unit) {
    const valid = "year month day hour minute second millisecond ms"
      .split(" ")
      .includes(unit);
    if (!valid) {
      // 如果unit不是上面的值 抛出错误 防御性编程 防止传入错误的值 造成bug 例如传入yearss 会报错
      throw new Error("unit is not valid");
    }
    const table = {
      ms: 1, // 1ms = 1ms
      second: 1000, // 1s = 1000ms
      minute: 1000 * 60, // 1m = 1000ms * 60s
      hour: 1000 * 60 * 60, // 1h = 1000ms * 60s * 60m = 3600000ms
      day: 1000 * 60 * 60 * 24, // 1d = 1000ms * 60s * 60m * 24h = 86400000ms
    };
    if (unit === "year") {
      // 年份直接加n 不用乘以1000 * 60 * 60 * 24 * 365 因为年份不是固定的 有闰年 有平年 有366天 有365天 有364天 所以不用乘以365
      this.date.setFullYear(this.date.getFullYear() + n);
    } else if (unit === "month") {
      // 月份直接加n 不用乘以1000 * 60 * 60 * 24 * 30 因为月份不是固定的 有31天 有30天 有28天 有29天 所以不用乘以30
      this.date.setMonth(this.date.getMonth() + n);
    } else {
      // 加上对应的毫秒数
      // this.date - 0 将时间转换为毫秒数 例如 2021-01-01T00:00:00.000Z 转换为 1609459200000 毫秒数
      // n * table[unit] 将要加的时间转换为毫秒数 例如 1 * 86400000 = 86400000 毫秒数
      //this.date - 0 + n * table[unit] 将时间转换为毫秒数 例如 1609459200000 + 86400000 = 1695459200000 毫秒数
      //转换时间戳的方式 date.getTime() date - 0 new Date().valueOf() new Date().getTime()
      this.date = new Date(this.date - 0 + n * table[unit]);
    }
  },
  //判断是否是闰年
  isLeapYear() {
    const year = this.date.getFullYear(); //获取当前年份
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  },
  //获取当前月份的最后一天
  lastDayOfMonth() {
    const { year, month, hour, minute, second, ms } = this.parts();
    return new time(year, month + 1, 0, hour, minute, second, ms);
  },
  // 格式化日期
  format(formatStr) {
    const { year, month, day, hour, minute, second, ms } = this.parts();
    //支持的格式有 yyyy MM dd hh mm ss
    return formatStr
      .replace(/yyyy/g, year)
      .replace(/MM/g, padLeftZero(month))
      .replace(/dd/g, padLeftZero(day))
      .replace(/HH/g, padLeftZero(hour))
      .replace(/mm/g, padLeftZero(minute))
      .replace(/ss/g, padLeftZero(second));
  },
};

function padLeftZero(n) {
  return n > 10 ? "" + n : "0" + n; //如果n大于10就直接返回n 否则就在前面加0
}
