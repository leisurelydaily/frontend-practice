/**
 * 手写一个函数实现new操作符
 * 知识点：js中的面向对象
 */

/**
 * new操作符，用于和函数组合，使函数成为构造函数，返回新的对象。
 * @param {*} fn
 * @param  {...any} args
 */
function createNew(constuctorFunc, ...objArgs) {
  const obj = {}; // 创建空对象
  obj.__proto__ = constuctorFunc.prototype; // 将对象私有原型指向构造函数原型 完成继承
  const res = constuctorFunc.apply(obj, objArgs); // 以空对象为调用者调用构造函数
  return res instanceof Object ? res : obj; // 构造函数返回null值时返回obj
}

(function main() {
  let arr = createNew(Array, 5);
  arr[1] = 2;
  arr[2] = 3;
  arr[3] = 4;
  console.log(arr);
  const Person=function(name,age){
      this.name=name;
      this.age=age;
  }
  Person.prototype.introduce=function(){console.log(`my name is ${this.name}.I am ${this.age} years old.`)};
  let person= createNew(Person,"john","22");
  person.introduce();
})();
