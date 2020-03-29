const Enum = function(obj, isNumber = true) {
  Object.defineProperty(this, "_sort", {
    writable: true,
    enumerable: false
  });
  this._sort = obj._sort;
  delete obj._sort;
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  if (!this._sort) {
    this._sort = Object.keys(this);
    if (isNumber) this._sort = this._sort.map(v => v - 0);
  }
};

Enum.prototype.toArray = function() {
  return this._sort;
};

(function main() {
  const STATUS_INIT = 1,
    STATUS_INPROGRESS = 2,
    STATUS_DONE = 3;
  const EnumStatus = new Enum({
    [STATUS_INIT]: "待办",
    [STATUS_INPROGRESS]: "进行中",
    [STATUS_DONE]: "已完成"
    // _sort: [STATUS_INIT, STATUS_DONE, STATUS_INPROGRESS]
  });
  console.log(Object.keys(EnumStatus));
  console.log(EnumStatus.toArray());
  EnumStatus.toArray().forEach(v => console.log(EnumStatus[v]));
})();
