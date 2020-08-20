// 1.call
// 实现
Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [];
  for(let i = 1; i < arguments.length; i++) {
    args.push('arguments['+i+']');
  }

  let r = eval('context.fn('+args+')');
  delete context.fn;
  return r;
}

// 测试
function f1() {
  console.log(1);
}

function f2() {
  console.log(2);
}

f1.call(f2);  // 1

f1.call.call.call(f2); // 2


// 2.apply
// 实现
Function.prototype.apply = function (context, args) {
  context = context ? Object(context) : window;
  context.fn = this;

  if(!args){
    return context.fn();
  }

  let r = eval('context.fn('+args+')');
  delete context.fn;
  return r;
}

// 测试
function f1() {
  console.log(1);
}

function f2() {
  console.log(2);
}

f1.apply(f2);  // 1


// 3.bind
// 实现
Function.prototype.bind = function (context) {
  let that = this;
  let bindArgs = Array.prototype.slice.call(arguments, 1);
  function Fn() {}
  function fBound() {
    let args = Array.prototype.slice.call(arguments);
    return that.apply(this instanceof fBound ? this : context, bindArgs.concat(args));
  }

  fn.prototype = this.prototype;
  fBound.prototype = new Fn();
  return fBound;
}

// 测试
// 用法一:
let person1 = {
  name: "Cherry",
}

function fn(name, age) {
  console.log(this.name+ '养了一只'+ name + '今年' + age + '了');
}

let bindFn1 = fn.bind(person1, '猫');

bindFn1(2); // Cherry养了一只猫今年2了

// 用法二：
let person2 = {
  name: "Cherry",
}

function fn(name, age) {
  this.say = '说话'
  console.log(this);  // fn {say: "说话"}
}

let bindFn2 = fn.bind(person2, '猫');
let instance2 = new bindFn2(9);

// 用法三：
let person3 = {
  name: "Cherry",
}

function fn(name, age) {
  this.say = '说话'
}

fn.prototype.flag = '哺乳类';
let bindFn3 = fn.bind(person3, '猫');
let instance3 = new bindFn3(9);
console.log(instance3.flag); // 哺乳类


// 4.new
// 实现
function mockNew() {
  let Constructor = [].shift.call(arguments);
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  let r = Constructor.apply(obj, arguments);
  return r instanceof Object ? r : obj;
} 

// 测试
// 用法一：
function Animal(type) {
  this.type = type;
}

Animal.prototype.say = function () {
  console.log('say');
}

let animal = mockNew(Animal, '哺乳类');

console.log(animal.type); // 哺乳类
animal.say(); // say

// 用法二：
function Animal(type) {
  this.type = type;
  return { name: 'dog' }
}

Animal.prototype.say = function () {
  console.log('say');
}

let animal = mockNew(Animal, '哺乳类');

console.log(animal);  // {name: "dog"}


// 5.map
// 实现
Array.prototype.map = function(fn) {
  let arr = [];
  for(let i = 0; i < this.length; i++) {
    arr.push(fn(this[i], i, this));
  }
  return arr;
};

// 测试
let array = [1, 2, 3].map((item) => {
  return item * 2;
});

console.log(array);  // [2, 4, 6]


// 6.filter
// 实现
Array.prototype.filter = function(fn) {
  let arr = [];
  for(let i = 0; i < this.length; i++) {
    fn(this[i]) && arr.push(this[i]);
  }
  return arr;
};

// 测试
let array = [1, 2, 3].filter((item) => {
  return item > 2;
});

console.log(array); // [3]


// 7.some
// 实现
Array.prototype.some = function(fn) {
  for(let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      return true;
    }
  }
  return false;
};

// 测试
let flag = [1, 2, 3].some((item) => {
  return item > 1;
});

console.log(flag); // true


// 8.every
// 实现
Array.prototype.every = function(fn) {
  for(let i = 0; i < this.length; i++) {
    if(!fn(this[i])) {
      return false
    }
  }
  return true;
};

// 测试：
let flag = [1, 2, 3].every((item) => {
  return item > 1;
});

console.log(flag); // false


// 9.find
// 实现
Array.prototype.find = function(fn) {
  for(let i = 0; i < this.length; i++) {
    if (fn(this[i])) return this[i];
  }
};

// 测试
let item = [1, 2, 3].find((item) => {
  return item > 1;
});

console.log(item); // 2


// 10.forEach
// 实现
Array.prototype.forEach = function(fn) {
  for(let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
};
// 测试：
[1, 2, 3].forEach((item, index, array) => {
  // 1 0 [1, 2, 3]
  // 2 1 [1, 2, 3]
  // 3 2 [1, 2, 3]
  console.log(item, index, array)  
});


// 11.reduce
// 实现
Array.prototype.reduce = function(fn, prev) {
  for(let i = 0; i < this.length; i++) {
    if (typeof prev === 'undefined') {
      prev = fn(this[i], this[i+1], i+1, this);
      ++i;
    } else {
      prev = fn(prev, this[i], i, this)
    }
  }
  return prev;
};
// 测试
let total = [1, 2, 3].reduce((prev, next, currentIndex, array) => {
  return prev + next;
}, 0);

console.log(total); // 6


// 12.instanceof
// 实现
function myInstanceof(left, right) {
  left = left.__proto__;
  while(true) {
    if (left === null) {
      return false;
    }
    if (left === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
};

// 测试
class A{};

const a = new A();
console.log(myInstanceof(a, A)); // true
console.log(myInstanceof(a, Object)); // true 
console.log(myInstanceof(a, Array)); // false


// 13.Object.create
// 实现
function create(proto) {
    function Fn() {};
    Fn.prototype = proto;
    Fn.prototype.constructor = Fn;
    return new Fn();
};
// 测试
let demo = {
    c : '123'
};
let cc = Object.create(demo);
console.log(cc.c);  // 123


// 14.curring
// 实现
const curring = (fn, arr = []) => {
  let len = fn.length;
  return function (...args) {
    arr = [...arr, ...args];
    if (arr.length < len) {
      return curring(fn, arr);
    } else {
      return fn(...arr);
    }
  };
};

// 测试
function sum(a, b, c, d, e) {
  return a+b+c+d+e;
};

let a = curring(sum)(1,2)(3,4)(5); 
console.log(a); // 15


// 15.uncurring
// 实现
Function.prototype.uncurring = function () {
  var self = this;
  return function () {
    return Function.prototype.call.apply(self, arguments);
  }
};

// 测试
let checkType = Object.prototype.toString.uncurring();

checkType(1); // [object Number]
checkType("hello"); // [object String]
checkType(true); // [object Boolean]

// 16.throttle
// 实现
const throttle = (fn, delay = 500) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};
// 测试
const throttleFn = throttle(fn, 300);


// 17.debounce
// 实现
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
// 测试
const debounceFn = debounce(fn, 300);


// 18.compose
// 实现
// 使用 ES5- reduceRight 实现
function compose(...fns) {
  return function (...args) {
    let lastFn = fns.pop();
    return fns.reduceRight((a, b) => {
      return b(a);
    }, lastFn(...args));
  };
}
// 使用 ES6 - reduceRight 实现
const compose = (...fns) => (...args) => {
  let lastFn = fns.pop();
  return fns.reduceRight((a, b) => b(a), lastFn(...args));
};
// 使用 ES6 - reduce 一行代码实现：
const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)));

// 测试
function sum(a, b) {
  return a+b;
}

function toUpper(str) {
  return str.toUpperCase();
}

function add(str) {
  return '==='+str+'==='
}

// 使用 compose 之前：
console.log(add(toUpper(sum('cherry', '27')))); // ===CHERRY27===
// 使用 compose 之后：
console.log(compose(add, toUpper, sum)('cherry', '27')); // ===CHERRY27===


// 18.pipe
// 实现
const pipe = function(){
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduce((res, cb) => cb(res), x);
  }
}
// 使用 ES5- reduceRight 实现
function pipe(...fns) {
  return function (...args) {
    let lastFn = fns.shift();
    return fns.reduceRight((a, b) => {
      return b(a);
    }, lastFn(...args));
  };
}
// 使用 ES6 - reduceRight 实现
const pipe = (...fns) => (...args) => {
  let lastFn = fns.shift();
  return fns.reduceRight((a, b) => b(a), lastFn(...args));
};
// 使用 ES6 - reduce 一行代码实现：（redux源码）
const pipe = (...fns) => (...args) => fns.reduce((a, b) => b(a), ...args);

// 测试
function splitString(str) {
  return str.split(' ');
}

function count(array) {
  return array.length;
}

// 使用 pipe 之前：
console.log(count(splitString('hello cherry'))); // 2
// 使用 pipe 之后：
console.log(pipe(splitString, count)('hello cherry')); // 2


// 20.template
// ===== my-template.html =====
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   {{name}}  {{age}}
//   {%arr.forEach(item => {%}
//       <li>{{item}}</li>
//   {%})%}
// </body>
// </html>


const fs = require('fs');
const path = require('path');

const renderFile = (filePath, obj, cb) => {
  fs.readFile(filePath, 'utf8', function(err, html) {
    if(err) {
      return cb(err, html);
    }

    html = html.replace(/\{\{([^}]+)\}\}/g, function() {
      console.log(arguments[1], arguments[2]);
      let key = arguments[1].trim();
      return '${' + key + '}';
    });

    let head = `let str = '';\r\n with(obj){\r\n`;
    head += 'str+=`';
    html = html.replace(/\{\%([^%]+)\%\}/g, function() {
      return '`\r\n' + arguments[1] + '\r\nstr+=`\r\n';
    });
    let tail = '`}\r\n return str;';
    let fn = new Function('obj', head + html + tail);
    cb(err, fn(obj));
  });
};

renderFile(path.resolve(__dirname, 'my-template.html'),{name: 'Cherry', age: 27, arr: [1, 2, 3]}, function(err, data) {
  console.log(data);
});














