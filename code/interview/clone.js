/**
 * 题目：手写深拷贝
 * 考点：类型判断,递归
 */

function deepClone(obj) {
  let target;
  if (obj === null || typeof obj !== "object") {
    target = obj;
    return target;
  }
  if (Array.isArray(obj)) {
    target = [];
    for (let index in obj) {
      target[index] = deepClone(obj[index]);
    }
  } else if (typeof obj === "object") {
    target = {};
    for (let key in obj) {
      target[key] = deepClone(obj[key]);
    }
  }
  return target;
}

(function main() {
  let a = {
    b: { c: 1, d: 2,cc:[1,2] },
    e: [1, 2]
  };

  let copyA = deepClone(a);
  copyA.b.c = 3;
  copyA.b.cc[1] = 3;
  copyA.e[0] = 3;
  console.log(a);
  console.log(copyA);
})();
