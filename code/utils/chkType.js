let ChkType = (function() {
  const _typeMap = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  return {
    isArray: obj => Array.isArray(obj),
    notNull: obj => obj !== null && obj !== undefined,
    getType: obj => {
      let objType;
      if (obj instanceof Element) {
        objType = "element";
      } else {
        const typeStr = Object.prototype.toString.call(obj);
        objType = _typeMap[typeStr];
      }
      return objType;
    }
  };
})();

export { ChkType };
