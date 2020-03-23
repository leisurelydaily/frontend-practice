/***
 * 题目：手写防抖函数及节流函数。
 * 说明：防抖函数和节流函数是js开发中常见的性能优化函数。
 * ——————防抖：某函数持续触发，期望只响应最后一次。场景（scroll与resize）。
 * ——————节流：某函数高频触发，期望一定时间内只响应一次。场景（网络延迟时按钮被重复点击）。
 * 防抖与节流之所以作为js笔试时的高频面试题，主要是因为这道题目中有两个考点：
 * 1. js函数的语法（可以作为参数传递，可以通过某些方式改变函数执行的作用域，获取函数执行时的参数）
 * 2. setTimeout。
 */

let timer = require("./../utils/timer");

/**
 * 防抖函数
 * 思路：设置一个延迟时间，函数触发时启动一个setTImeout延迟执行，若延迟时间内再次被触发则取消原执行，启动新的setTimeout。
 * @param {*} fn 原函数
 * @param {*} delay 延迟时间
 */
function debounce(fn, delay) {
  let timeout;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

/**
 * 节流函数
 * 思路：设置一个间隔时间，在这个间隔时间内，若高频触发，则延迟执行最后一次函数。
 * @param {*} fn 原函数
 * @param {*} interval 间隔时间
 */
function throttle(fn, interval) {
  let lastTime = 0;
  let excuteTime = 0;
  let timeout;
  return function() {
    const now = Date.now();
    if (!lastTime) {
      // 优化第一次调用不节流，避免影响正常响应的体验。
      fn.apply(this, arguments);
      lastTime = Date.now();
    } else {
      if (now - lastTime < interval) {
        if (timeout) clearTimeout(timeout);
      } else {
        lastTime = Date.now();
      }
      excuteTime = interval - now + lastTime;
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
        lastTime = Date.now();
      }, excuteTime);
    }
  };
}

const hello = function(content) {
  timer.log("hello " + content);
};

async function testDebounce() {
  let helloDeb = debounce(hello, 500);
  helloDeb("content1"); // 第一次调用且500ms内无第二次调用，所以会在500ms时执行成功
  await timer.sleep(600);
  helloDeb("content2"); // 第二次调用，500ms内又被调用，执行被清除。
  await timer.sleep(100);
  helloDeb("content2.1"); // 第三次调用，500ms内无后溪调用，所以会在600+100+500ms时执行成功
  await timer.sleep(600);
}

async function testThrottle() {
  let helloThr = throttle(hello, 500);
  for (let i = 0; i < 20; i++) {
    helloThr("centent" + i);
    await timer.sleep(100);
  }
}

(async function main() {
  console.log("main start");
  timer.start();
  // testDebounce();
  testThrottle();
  await timer.sleep(9999);
  console.log("main end");
})();
