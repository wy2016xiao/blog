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
