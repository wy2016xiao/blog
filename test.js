let A = function () {}
let a = new A();
let b = new String('b');
let c = 1;
let d = [];
let e = {};

console.log(a.__proto__ === A.prototype);
console.log(b.__proto__ === String.prototype);
console.log(c.__proto__ === Number.prototype);
console.log(d.__proto__ === Array.prototype);
console.log(e.__proto__ === Object.prototype);