let A = function () {};
let a = new A();

console.log(a.__proto__.constructor === A)
console.log(a.constructor === A)
console.log(a instanceof A)
console.log(a.__proto__ instanceof A)