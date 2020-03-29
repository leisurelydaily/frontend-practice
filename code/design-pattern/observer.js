/**
 * 观察者模式
 * 观察者模式，有两个角色：主题，与观察者。一个主题对应多个观察者。主题自己管理自己的更新。
 */

class Subject {
  constructor(content) {
    this.observers = [];
    this._content = content;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  update(val) {
    this._content = val;
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update(this._content);
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(subject) {
    console.log(`我是${this.name},我订阅的消息更新了：${subject}`);
  }
}

(function main() {
  const a = new Observer("a");
  const b = new Observer("b");
  const subject = new Subject("今天准时下班");
  subject.addObserver(a);
  subject.notify();
  subject.addObserver(b);
  subject.update("今天加班");
  subject.notify();
})();
