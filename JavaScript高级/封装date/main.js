// 使用方法
const t = time("2001-01-01T01:00:00.000");
// console.log(t.date.toLocaleDateString());
// t.parts({
//   year: 2022,
//   month: 12,
//   day: 29,
//   hour: 15,
//   minute: 14,
//   second: 10,
//   ms: 0,
// });
// t.parts();
// t.add(1, "year");
// t.add(2, "month");
// console.log(t);
// t.add(10, "day");
// console.log(t.isLeapYear());

// console.log(t.lastDayOfMonth());

console.log(t.format("yyyy-MM-dd HH:mm:ss"));
