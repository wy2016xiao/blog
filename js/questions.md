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


js事件循环 作用域

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

</p>
</details>


15.输出是什么？
```javascript
let number = 0
console.log(number++)
console.log(++number)
console.log(number)
```

<details><summary><b>答案</b></summary>
<p>
0
2
2

一元后自增运算符，是先返回然后自增。
前自增运算符是先自增再返回。

</p>
</details>


16.输出是什么？
```javascript
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`
```

<details><summary><b>答案</b></summary>
<p>
['', ' is ', ' uears old'], 'Lydia', 21

使用标记模板字面量作为参数可以写作funcName``的形式，第一个参数是将字面量以其中的变量作为分隔的数组，后面是按顺序排列的变量。
特别的，首或位为变量时，会多解析出一个空字符串。

</p>
</details>


17.输出是什么？
```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!')
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.')
  } else {
    console.log(`Hmm.. You don't have an age I guess`)
  }
}

checkAge({ age: 18 })
```

<details><summary><b>答案</b></summary>
<p>
`Hmm.. You don't have an age I guess`

在判断对象相等时，无论是==还是===，都是对他们的引用进行的比较。
这里的data和{ age: 18 }明显㐊同一引用，所以都不等。

</p>
</details>


18.输出是什么？
```javascript
function getAge(...args) {
  console.log(typeof args)
}

getAge(21)
```

<details><summary><b>答案</b></summary>
<p>
object

扩展运算符基本用法，...args结果为21，那么args就是[21]，typeof [21]为object

</p>
</details>


19.输出是什么？
```javascript
function getAge() {
  'use strict'
  age = 21
  console.log(age)
}

getAge()
```

<details><summary><b>答案</b></summary>
<p>
ReferenceError: age is not defined

这里在函数内部使用了严格模式，age = 21这种写法不会再被认为是声明了全局变量，在这里只会被认为是给age变量赋值。然而我们从来没有声明过age变量，所以报错了。

</p>
</details>

20.输出是什么？
```javascript
const sum = eval('10*10+5')
```

<details><summary><b>答案</b></summary>
<p>
105

</p>
</details>    


21. cool_secret 可访问多长时间？
```javascript
sessionStorage.setItem('cool_secret', 123)
```

<details><summary><b>答案</b></summary>
<p>
当用户关掉标签页时。

</p>
</details>


22.输出是什么？
```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)
```

<details><summary><b>答案</b></summary>
<p>
true true false true

所有对象的键，在底层都是字符串。所以对象访问也可以使用obj['1']的形式。
set和对象不一样，在set中没有字符串1的成员。
同理，数组[1,2,3,4,5]也没有成员'1'。

</p>
</details>


23.输出是什么？
```javascript
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

<details><summary><b>答案</b></summary>
<p>
{ a: "three", b: "two" }

这里在第三个属性上的a覆盖了第一个属性a。

</p>
</details>


24.JavaScript 全局执行上下文为你做了两件事：全局对象和 this 关键字。
* A: true
* B: false
* C: it depends

<details><summary><b>答案</b></summary>
<p>
A

</p>
</details>


25.输出是什么？
```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
```

<details><summary><b>答案</b></summary>
<p>
1 2 4

</p>
</details>


26.输出是什么？
```javascript
String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()
```

<details><summary><b>答案</b></summary>
<p>
'Just give Lydia pizza already!'

所有对象都可以访问其原型上的方法。

</p>
</details>


27.输出是什么？
```javascript
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])
```

<details><summary><b>答案</b></summary>
<p>
456

对象的键会被自动转换成为字符串。
这里b和c被转换成字符串成为'[object object]'。
即：
a['[object object]'] = 123
a['[object object]'] = 456

</p>
</details>


28.输出是什么？
```javascript
const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'))
const baz = () => console.log('Third')

bar()
foo()
baz()
```

<details><summary><b>答案</b></summary>
<p>
First Third Second

setTimeout中的回调会在第二个任务队列中执行。在第一个任务队列中，只会执行setTimeout。

</p>
</details>


29.当点击按钮时，event.target是什么？
```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
```
* A: Outer div
* B: Inner div
* C: button
* D: 一个包含所有嵌套元素的数组。
<details><summary><b>答案</b></summary>
<p>
C

有一个简单办法来确认event.target，那就是寻找到那个导致事件最深的元素。

</p>
</details>


30.当您单击该段落时，日志输出是什么？
```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
```

<details><summary><b>答案</b></summary>
<p>
div p div 

默认情况下，事件处理程序在冒泡阶段执行。除非useCapture设置为true。

</p>
</details>


31.输出是什么？
```javascript
const person = { name: 'Lydia' }

function sayHi(age) {
  console.log(`${this.name} is ${age}`)
}

sayHi.call(person, 21)
sayHi.bind(person, 21)
```

<details><summary><b>答案</b></summary>
<p>
Lydia is 21
function

call和bind都是改变this指向。
不同的是bind是返回一个函数，call是直接就调用了。

</p>
</details>


32.下面哪些值是falsy?
```javascript
0
new Number(0)
('')
(' ')
new Boolean(false)
undefined
```

<details><summary><b>答案</b></summary>
<p>
0, (''), (' '), undefined

构造函数声明的值，都是truthy

</p>
</details>


33.输出是什么？
```javascript
console.log(typeof typeof 1)
```

<details><summary><b>答案</b></summary>
<p>
string

typeof 1 返回字符串"number"。typeof字符串返回 "string"。

</p>
</details>


34.输出是什么？
```javascript
const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers)
``` 

<details><summary><b>答案</b></summary>
<p>
[1, 2, 3, 7 x empty, 11]

如果设置了超过长度的值，会自动填充empty在中间。
他们的值为undefined（没有什么值是empty，除非是个字符串）。
</p>
</details>


35.输出是什么？
```javascript
function sayHi() {
  return (() => 0)()
}

typeof sayHi()
```

<details><summary><b>答案</b></summary>
<p>
number

箭头函数的函数体如果没有花括号包裹，就是默认返回函数体的值。
sayHi函数返回数字0

</p>
</details>


36.输出是什么？
```javascript
(() => {
  let x, y
  try {
    throw new Error()
  } catch (x) {
    (x = 1), (y = 2)
    console.log(x)
  }
  console.log(x)
  console.log(y)
})()
```

<details><summary><b>答案</b></summary>
<p>
1 undefined 2

catch中的x属于catch块作用域中的x，这里的赋值不会影响外层作用域的x。而由于catch块中没有y，这里的赋值是赋值给了外层作用域的y。

</p>
</details>


37.JavaScript 中的一切都是？
* A: 基本类型与对象
* B: 函数与对象
* C: 只有对象
* D: 数字与对象

<details><summary><b>答案</b></summary>
<p>
A

</p>
</details>


38.输出是什么？
```javascript
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur)
  },
  [1, 2]
)
```

<details><summary><b>答案</b></summary>
<p>
C

</p>
</details>


39.输出是什么？
```javascript
!!null
!!''
!!1
```

<details><summary><b>答案</b></summary>
<p>
false false true

6种falsy值：
* undefined
* null
* NaN
* 0
* '' (empty string)
* false

</p>
</details>


40.setInterval 方法的返回值是什么？
```javascript
setInterval(() => console.log('Hi'), 1000)
```
* A: 一个唯一的id
* B: 该方法指定的毫秒数
* C: 传递的函数
* D: undefined
<details><summary><b>答案</b></summary>
<p>
A

setInterval返回一个唯一的id，这个id可以用来clearInterval清除定时。

</p>
</details>


41.输出是什么？
```javascript
[...'Lydia']
```
<details><summary><b>答案</b></summary>
<p>
["L", "y", "d", "i", "a"]

</p>
</details>


42.输出是什么？
```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```
<details><summary><b>答案</b></summary>
<p>
10 20

</p>
</details>


43.返回值是什么？
```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```
<details><summary><b>答案</b></summary>
<p>
two

</p>
</details>


44.输出是什么？
```javascript
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);
```
<details><summary><b>答案</b></summary>
<p>
[{ name: "Lydia" }]

这里的person放的只是一个指向{ name: "Lydia" }对象的内存地址（指针）。当给person重新赋值时，对象依旧存在，只是person不再代表对象的地址而已。
members数组中放的也是指针，所以不管person变量被赋值成什么，数组依旧不变。

</p>
</details>


45.输出是什么？
```javascript
const person = {
  name: "Lydia",
  age: 21
};

for (const item in person) {
  console.log(item);
}
```
<details><summary><b>答案</b></summary>
<p>
'name' 'age'
</p>
</details>


46.输出是什么？
```javascript
console.log(3 + 4 + "5");
```
<details><summary><b>答案</b></summary>
<p>
'75'

</p>
</details>


47.num的值是什么？
```javascript
const num = parseInt("7*6", 10);
```
<details><summary><b>答案</b></summary>
<p>
7

parseInt从左往右解析，在遇到第一个非数字字符时停下并返回。

</p>
</details>


48.输出是什么？
```javascript
[1, 2, 3].map(num => {
  if (typeof num === "number") return;
  return num * 2;
});
```
<details><summary><b>答案</b></summary>
<p>
[undefined,undefined,undefined]

这里的return;其实就是return undefined。

</p>
</details>


49.输出是什么？
```javascript
function getInfo(member, year) {
  member.name = "Lydia";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);
```
<details><summary><b>答案</b></summary>
<p>
{ name: "Lydia" }, "1997"

在函数传参时，分为引用传递和值传递。
在这里，对象是引用传递，传递的是指向person对象内存中的地址（指针）。所以改变函数中的member对象的name时，其实就是在改变person所指向的那个对象{ name: "Sarah" }中的name。

</p>
</details>


50.输出是什么？
```javascript
function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error!", e);
  }
}

sayHi();
```
<details><summary><b>答案</b></summary>
<p>
"Oh no an error: Hello world!

</p>
</details>


51.输出是什么？
```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```
<details><summary><b>答案</b></summary>
<p>
number number

y = 10返回10，这里相当于y = 10;let x = 10;

</p>
</details>


52.输出是什么？
```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```
<details><summary><b>答案</b></summary>
<p>
Woof I am Mara
TypeError

</p>
</details>


53.输出是什么？
```javascript
// counter.js
let counter = 10;
export default counter;
```
```javascript
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
```
<details><summary><b>答案</b></summary>
<p>
Error

es6的模块定义规定引入的模块是只读的。

考察；es6
</p>
</details>


54.输出是什么？
```javascript
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```
<details><summary><b>答案</b></summary>
<p>
false true

delete关键字返回true false来判断是否删除成功。
这里name由const关键字定义，无法删除。

</p>
</details>


55.输出是什么？
```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```
<details><summary><b>答案</b></summary>
<p>
1

</p>
</details>


56.输出是什么？
```javascript
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```
<details><summary><b>答案</b></summary>
<p>
{ admin: true, name: "Lydia", age: 21 }

</p>
</details>


57.输出是什么？
```javascript
const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));
```
<details><summary><b>答案</b></summary>
<p>
{ name: "Lydia", age: 21 }, ["name"]

defineProperty声明的属性默认不可枚举，enumerable为false。不止enumerable,writable、configurable默认都为false。
Object.keys只会返回可枚举的属性。
</p>
</details>


58.输出是什么？
```javascript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```
<details><summary><b>答案</b></summary>
<p>
"{"level":19, "health":90}"

JSON.stringify的第二个参数如果是数组，那么就只有包含在数组中的属性将会被转化为字符串。
</p>
</details>


59.输出是什么？
```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```
<details><summary><b>答案</b></summary>
<p>
10 10

++后置，先返回再相加。
</p>
</details>


60.输出是什么？
```javascript
const value = { number: 10 };

const multiply = (x = { ...value }) => {  
  console.log(x.number *= 2);
};

multiply();
multiply();
multiply(value);
multiply(value);
```
<details><summary><b>答案</b></summary>
<p>
20, 20, 20, 40

前两次没有传参数的情况下使用默认值。这里对value进行了结构，实为值传递。
</p>
</details>


61.输出是什么？
```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```
<details><summary><b>答案</b></summary>
<p>
1 2  
undefined 3 
undefined 4

reduce如果没有第二个参数，默认从第二次循环开始。所以第一次打印为1 2。
</p>
</details>


62.使用哪个构造函数可以成功继承Dog类?
```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1 
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4 
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};
```
<details><summary><b>答案</b></summary>
<p>
2

在使用super之前无法访问this关键字
super实际上是调用父类构造函数，所以需要有name参数。
</p>
</details>


63.输出是什么？
```javascript
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```
<details><summary><b>答案</b></summary>
<p>
running sum.js, running index.js, 3

es6的import模块化方案，是在编译阶段执行的。所以sum.js中的内容会先执行。
</p>
</details>


64.输出是什么？
```javascript
console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))
```
<details><summary><b>答案</b></summary>
<p>
true true false

Symbol符号是独一无二的。
Number函数是将参数转换为数字，和new Number()不同，要注意区别。
</p>
</details>


65.输出是什么？
```javascript
const name = "Lydia Hallie"
console.log(name.padStart(13))
console.log(name.padStart(2))
```
<details><summary><b>答案</b></summary>
<p>
' Lydia Hallie'
'Lydia Hallie'

考察padStart用法，如果大于字符长度，则填充，不穿第二个参数则用空格填充。
如果小于字符长度，不做填充，返回原字符串。
</p>
</details>


66.输出是什么？
```javascript
console.log("🥑" + "💻");
```
<details><summary><b>答案</b></summary>
<p>
"💻🥑"

连字符将字符串拼接
</p>
</details>


67.如何能打印出console后面注释掉的值？
```javascript
function* startGame() {
  const answer = yield "Do you love JavaScript?";
  if (answer !== "Yes") {
    return "Oh wow... Guess we're gone here";
  }
  return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```
<details><summary><b>答案</b></summary>
<p>
game.next().value
game.next("Yes").value

next中的参数会在yield中返回，这里要想answer被赋值为'yes'，就要给next函数传入'yes'。
</p>
</details>


68.输出是什么？
```javascript
console.log(String.raw`Hello\nworld`);
```
<details><summary><b>答案</b></summary>
<p>
'Hello\nworld'

String.raw函数是用来获取一个模板字符串的原始字符串的，它返回一个字符串，其中忽略了转义符（\n，\v，\t等）。
可以理解为打印出来的斜杠就是斜杠，不会被转义成为换行符等。
</p>
</details>


69.输出是什么？
```javascript
async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);
```
<details><summary><b>答案</b></summary>
<p>
Promise {<pending>}

这里有个误导点，getData是一个异步函数，异步函数始终返回一个promise，这里要么data.then()，要么写进一个异步函数中使用await去处理。
如：
async function a() {
  const data = await getData();
  console.log(data);
}
a()
</p>
</details>


70.输出是什么？
```javascript
function addToList(item, list) {
  return list.push(item);
}

const result = addToList("apple", ["banana"]);
console.log(result);
```
<details><summary><b>答案</b></summary>
<p>
2

push方法，返回的并不是操作之后的数组，而是操作之后的数组长度。
</p>
</details>


71.输出是什么？
```javascript
const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;
console.log(shape)
```
<details><summary><b>答案</b></summary>
<p>
{ x: 10, y: 20 }

Object.freeze使得无法添加、删除或修改对象的属性（除非属性的值是另一个对象）。
</p>
</details>


72.输出是什么？
```javascript
const { name: myName } = { name: "Lydia" };

console.log(name);
```
<details><summary><b>答案</b></summary>
<p>
ReferenceError

这里是myName = "Lydia"，跟name没关系，name没有被声明。
</p>
</details>


73.以下是个纯函数吗？
```javascript
function sum(a, b) {
  return a + b;
}
```
<details><summary><b>答案</b></summary>
<p>
是

纯函数一种若输入参数相同，则永远会得到相同输出的函数。
</p>
</details>


74.输出是什么？
```javascript
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```
<details><summary><b>答案</b></summary>
<p>
Calculated! 20 From cache! 20 From cache! 20

考察闭包理解，key in object中in关键字。
</p>
</details>