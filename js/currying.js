const isType = (type, value) => {
   return Object.prototype.toString.call(value) === `[object ${type}]`
}

const currying = (fn, arr=[]) => {
  let len = fn.length;
  return function(...args) {
    let concatValue=[...arr,...args];
    if(concatValue.length < len) {
      return currying(fn, concatValue)
    }else {
      return fn(...concatValue)
    }
  }
}
let isArray = currying(isType)('Array') 
let isString = currying(isType)('String')
console.log(isArray([]));
console.log(isArray('string'));
