let A = function () {
  this.a = 1;
};
let a = new A();

console.log(a.__proto__.a)