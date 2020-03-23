/***
 * 题目：手写实现Promise.all方法
 */

/***
 * 解题思路：
 * 1.入参是一个promise数组，
 * 2.出参是一个promise
 * 3.当且仅当所有promise都resolve时，promise.all才resolve并返回结果数组；若某个promise不成功，则promise.all也reject
 * 注意点：返回结果数组顺序要按promise数组顺序
 */

let timer = require("./../utils/timer");

/***
 * 普通版本（并发）
 */
Promise.all = function(...promises) {
  return new Promise((resolve, reject) => {
    let resolveCount = 0;
    let len = promises.length;
    let resArr = new Array(len);
    for (let i = 0; i < len; i++) {
      let item = promises[i];
      item.then(
        res => {
          resolveCount++;
          resArr[i] = res;
          if (resolveCount === len) {
            resolve(resArr);
          }
        },
        err => {
          reject(err);
        }
      );
    }
  });
};





function test() {
  timer.log("start Promise.all");
  const p1 = new Promise((s, j) => {
    setTimeout(() => {
      timer.log("p1 resolve");
      s(1);
    }, 1000);
  });
  
  const p2 = new Promise((s, j) => {
    setTimeout(() => {
      timer.log("p2 resolve");
      s(2);
    }, 500);
  });
  Promise.all(p1, p2).then(resArr => {
    timer.log("Promise.all receive resArr:", resArr);
    // console.log("Promise.all receive resArr:",resArr);
  });
}


(async function main() {
  console.log("main start");
  timer.start();
  test();
  await timer.sleep(9999);
  console.log("main quit");
})();
