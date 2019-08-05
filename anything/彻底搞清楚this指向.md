有关this的指向，在我们进行判断的时候，可以按照以下规则来进行。
## 默认绑定
首先是默认规则，即在所有规则都不适用时的默认指向。  
直接上代码：
```javascript
var a = '嘻嘻';

function foo () {
  console.log(this.a)
}

foo() // '嘻嘻'
```
首先需要知道的是，上述代码可以被理解成这样：
```javascript
window.a = '嘻嘻';

window.foo = function () {
  console.log(this.a)
}

window.foo() // '嘻嘻'
```

显而易见的，这里的this指向全局对象window。但要注意的是，在严格模式下，thi是被禁止指向全局对象的。如果是严格模式，此处的this将是`undefined`。

## 隐式绑定
隐式绑定也可以被看作是调用上下文绑定。  
还是直接上代码：
```javascript
var obj = {
  a: '哈哈',
  foo: function () {
    console.log(this.a)
  }
}

obj.foo() // '哈哈'
```
严格来说，这个函数不管是直接用字面量定义在obj的属性上还是被赋值在obj的属性上，这个函数都不属于这个对象。  
但是当你使用obj.foo()的形式来调用它时，它的调用上下文是obj，那么隐式绑定规则会将this指向obj函数。因此this.a和obj.a是一样的。

当然，类似obj1.obj2.foo()这样的链式调用，foo中this的指向会被绑定到obj2身上。隐式绑定只会绑定在最后一层。

有时候，我们会被一些代码迷惑：
```javascript
var a = '嘻嘻';
var obj = {
  a: '哈哈',
  foo: function () {
    console.log(this.a)
  }
}

var boo = obj.foo;

boo(); // 嘻嘻
```
是不是很疑惑？
其实这里涉及到引用赋值的一些细节，此处不做讨论。你只需要知道的是，这里的`boo = obj.foo`做的操作其实是把那个函数本身赋值给了boo。因此这里应该用默认绑定规则。

同样的，考虑一下以下代码：
```javascript
var a = '哈哈';

function foo () {
  console.log(this.a)
}

function boo (fn) {
  fn()
}

var obj = {
  a: '嘻嘻',
  foo: foo
}

boo(obj.foo) // 哈哈
```
这里的boo参数是foo函数，其实也是用的引用赋值，在boo内部，等同于运行了`foo()`。

为了更好的理解这里出现的难以理解的this指向，我们看下面的代码：
```javascript
var a = '哈哈'
var obj = {
  a: '嘻嘻',
  foo: function () {
    console.log(this.a)
  }
}

obj.foo() // '嘻嘻'

var a = obj.foo;
a() // '哈哈'
```
想要搞清楚这其中到底发生了什么，你需要深入了解一下js的引用类型和值类型。

## 显示绑定
为了更清晰地指定this的指向，js给了提供了一些函数用来显示的绑定他们。
### call、apply和bind
我们经常能在各种面试题中看到这三个函数，他们的共同点就是显示的指定this指向。

```javascript
function foo () {
  console.log(this.a)
}
var obj = {
  a: '嘻嘻'
}

foo.call(obj) // '嘻嘻'
```
他们的区别体现在函数参数和返回值上，但这不是这篇文章的重点。

## new绑定
思考下面代码：
```
function foo () {
  this.a = '嘻嘻'
}

var boo = new foo();

console.log(boo.a) // '嘻嘻'
```
在js中，使用new操作符时，会创建一个新的对象并将它绑定到this上。

## 箭头函数
思考以下代码：
```javascript
function foo () {
  return (a) => {
    console.log(this.a)
  }
}

var obj1 = {
  a:'嘻嘻'
}

var obj2 = {
  a: '哈哈'
}
var boo = foo.call(obj1);
boo.call(obj2); // '嘻嘻'
```
箭头函数最大的不同是，他依赖外层作用域（上层或全局）来决定this的指向。
这里的`foo.call(obj1)`将foo函数的this指向了obj1，那么内部的箭头函数this自然也指向了obj1。另一个要注意的是，箭头函数的this绑定无法被修改，这也是`boo.call(obj2)`没有改变this指向的原因。