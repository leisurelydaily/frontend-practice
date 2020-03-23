/**
 * 题目：数组去重
 */

/**
 * 方法1：数组拷贝式去重
 * @param {*} arr
 */
function unique1(arr) {
  let resArr = [];
  arr.forEach(v => {
    if (!resArr.includes(v)) resArr.push(v);
  });
  return resArr;
}

/**
 * 方法2：利用对象的map结构，拷贝到对象key值去重。注意返回值转换数据类型。
 * @param {*} arr
 */
function unique2(arr) {
  let resObj = {};
  arr.forEach(v => {
    resObj[v] = true;
  });
  return Object.keys(resObj).map(v => v - 0);
}

/**
 * 方法3：使用es6的set去重
 * @param {*} arr
 */
function unique3(arr) {
  return Array.from(new Set(arr));
}

/**
 * 方法4：filter去重
 */

function unique4(arr) {
  return arr.filter((v, index) => arr.indexOf(v) === index);
}

/**
 * 方法5：reduce去重。reduce是最灵活的数组处理函数。es6新增的数组API都可以用reduce实现。
 * 本方法与方法1，方法5都相同。一种方式的三种语法
 */

function unique5(arr) {
  return arr.reduce((res, v, index) => {
    if (arr.indexOf(v) === index) {
      res.push(v);
    }
    return res;
  }, []);
}

(function main() {
  let arr = [2, 1, 2, 2, 3, 4, 4, 4, 5];
  console.log(unique1(arr));
  console.log(unique2(arr));
  console.log(unique3(arr));
  console.log(unique4(arr));
  console.log(unique5(arr));
})();
