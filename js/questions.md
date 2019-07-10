1.输出是什么？
```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}

sayHi();
```

<details><summary><b>答案</b></summary>
<p>
undefined  ReferenceError

这里var关键词存在变量提升现象，js引擎会将其变量声明置顶。直到变量被赋值前，它的值都是undefined。

var的变量提升现象让人难以理解，所以let作为新的关键词纠正了这一现象。在这里是不会出现变量提升现象的（包括const关键词）。

考察：变量声明 es6

参考：
[阮一峰es6入门](http://es6.ruanyifeng.com/#docs/let)
</p>
</details>


2.输出是什么？
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

<details><summary><b>答案</b></summary>
<p>
3 3 3     

1 2 3

这里有两个点要注意，第一个是js事件循环（event loop），第二个是var和let的作用域。

由于js时间循环机制，这里的所有console，都是在for循环执行结束之后才开始执行的。

在第一个for循环当中，var相当于将i变量声明在了全局作用域（window.i）。同时内部的console所打印的以及++运算符所涉及的那个i，都是由作用域链所寻找到的那个window.i（他们是同一个i！）。由于js事件循环机制，使得console会在for循环的3次执行结束之后进行打印。而此时window.i已经加到了3，所以会打印出3个3

在第二个for循环当中，let关键词将i声明在了由{}组成的局部作用域内，这样每一个console都是访问的当时let的那个i，既1 2 3

>你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。


考察：
js事件循环 作用域

参考：
[阮一峰es6入门](http://es6.ruanyifeng.com/#docs/let)
</p>
</details>


3.输出是什么
```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter());
console.log(shape.perimeter());
```
<details><summary><b>答案</b></summary>
<p>
20
NaN

这道题关键点在于this指向的理解。
第一个console，this指向的是调用者shape对象，既这里的this.radius是10
第二个console要注意的是这里函数的定义方式。这里函数是通过箭头函数定义的，箭头函数中的this所指向的是定义时环境，在这里this其实是window，所以this.radius其实是undefined。所以数学计算中，如果出现非数学值，则一律返回NaN。

考察：变量声明 es6 this

参考：
[阮一峰es6入门](http://es6.ruanyifeng.com/#docs/let)
</p>
</details>


4.输出是什么？
```javascript
+true;
!"Lydia";
```
<details><summary><b>答案</b></summary>
<p>
1
false

+运算符带有隐式类型转换（这里转换成数字）。
|运算|值|
|---|---|
|+true|1|
|+false|0|
|+NaN|NaN|
|+undefined|NaN|
|+1|1|
|+0|0|
+'string'|NaN|

!是取反符号，这里数字取反为false。
|运算|值|
|---|---|
|!1|false|
|!0|true|
|!'string'|false|
|!undefined|true|
|!NaN|true|
考察：隐式类型转换

</p>
</details>


5.哪一个是错误的？
```javascript 
const bird = {
  size: "small"
};

const mouse = {
  name: "Mickey",
  small: true
};
```
* A: mouse.bird.size
* B: mouse[bird.size]
* C: mouse[bird["size"]]
* D: 全都不对

<details><summary><b>答案</b></summary>
<p>
A

js中对象的属性除了用.运算符取值之外，还可以使用类似数组的形式（object[key]）。

考察：对象
</p>
</details>


6.输出是什么？
```javascript
let c = { greeting: "Hey!" };
let d;

d = c;
c.greeting = "Hello";
console.log(d.greeting);
```

<details><summary><b>答案</b></summary>
<p>
"Hey!"

js中，对象类型赋值其实是赋值的指针。这里d、c都是指针，指向同一块存有{ greeting: "hey!" }对象的内存空间。
所以这里改变c.greeting其实也改变了d.greeting。

考察：js变量引用
</p>
</details>


7.输出是什么？
```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

<details><summary><b>答案</b></summary>
<p>
true
false
false

new Number(3)返回的，其实是一个对象（Object.prototype.toString(a) === "[object Object]"）。
==运算符有隐式类型转换，所以b在这里被转换成Number类型的数字。a == b
===则没有这种转换，由于变量类型不同，a和b，b和c都不等。

考察：js变量引用 变量声明
</p>
</details>


8.输出是什么？
```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
console.log(freddie.colorChange("orange"));
```

<details><summary><b>答案</b></summary>
<p>
TypeError

static关键字定义的函数无法被实例调用。

考察：类
</p>
</details>


9.输出是什么？
```javascript
let greeting
greetign = {} // Typo!
console.log(greetign)
```

<details><summary><b>答案</b></summary>
<p>
{}

(这种题目很容易看错，我觉得如果要考察变量声明应该更直观一点)
在js中，如果使用let/var等关键字，引擎会自动将其声明为全局变量。
这里的greetign是全局变量，并且被赋值为{}

考察：类
</p>
</details>


10.会发生什么？
```javascript
function bark() {
  console.log('Woof!')
}

bark.animal = 'dog'
```
* A: 正常运行!
* B: SyntaxError. 你不能通过这种方式给函数增加属性。
* C: undefined
* D: ReferenceError

<details><summary><b>答案</b></summary>
<p>
A

函数也是对象，所以是可以给一个函数添加属性的。
其实函数被声明出来后本身也是有各种属性的。length arguments name等

考察：函数
</p>
</details>


11.输出是什么？
```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());
```

<details><summary><b>答案</b></summary>
<p>
A

函数也是对象，所以是可以给一个函数添加属性的。
其实函数被声明出来后本身也是有各种属性的。length arguments name等

考察：函数
</p>
</details>


12.输出是什么？
```javascript
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')

console.log(lydia)
console.log(sarah)
```

<details><summary><b>答案</b></summary>
<p>
Person {firstName: "Lydia", lastName: "Hallie"}
undefined

第一个console是打印出了Person的实例
第二个console是打印出了函数Person的返回
函数Person实际上没有返回，所以是undefined

考察：类 函数
</p>
</details>


13.事件传播的三个阶段是什么？
* A: Target > Capturing > Bubbling
* B: Bubbling > Target > Capturing
* C: Target > Bubbling > Capturing
* D: Capturing > Target > Bubbling

<details><summary><b>答案</b></summary>
<p>
D

浏览器事件是先由根元素向下传播到事件元素（捕获），再由事件元素传回根元素（冒泡）。

考察：浏览器事件机制
</p>
</details>


14.输出是什么？
```javascript
function sum(a, b) {
  return a + b;
}

sum(1, "2");
```

<details><summary><b>答案</b></summary>
<p>
12

+运算符如果涉及到字符串，会将前后变量进行隐式转换然后进行字符串拼接。

考察：运算符
</p>
</details>