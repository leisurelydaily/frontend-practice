/**
 * 题目：手写Promise
 */

/**
 * 解题思路：
 * 1.入参是一个函数，有两个参数。resolve和reject
 * 2.Promise有三个状态，两个队列
 */

function MyPromise(excutor) {
  let _this = this;
  this.state = "pending";
  this.resolveList = [];
  this.rejectList = [];
  this.value = undefined;
  this.reason = undefined;
  function resolve(val) {
    if (_this.state === "pending") {
      _this.state = "resolved";
      _this.value = val;
      let resolveCallback = _this.resolveList.shift();
      if (typeof resolveCallback == "function") {
        resolveCallback(_this.value);
      }
    }
  }
  function reject(reason) {
    if (_this.state === "pending") {
      _this.state = "rejected";
      _this.reason = reason;
      let rejectCallback = _this.rejectList.shift();
      if (typeof rejectCallback == "function") {
        rejectCallback(_this.reason);
      }
    }
  }
  setTimeout(() => excutor(resolve, reject), 0);
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  if (this.state === "pending") {
    if (typeof onResolved == "function") this.resolveList.push(onResolved);
    if (typeof onRejected == "function") this.rejectList.push(onRejected);
  } else if (this.state === "resolved") {
    this.value = onResolved(this.value);
  } else {
    this.reason = onRejected(this.reason);
  }
  return this;
};

(function main() {
  var promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  promise.then(val => {
    console.log("get val:", val);
  });
})();
