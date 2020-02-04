# 可能是最详细的apply、call、bind手写实现教学

>最近在看一些手写实现的文章。  
只要是涉及到手写实现的，一定会写到call、apply、bind。  
call和apply原理比较简单，所以没什么问题。但是bind我看很多人都只是贴了代码，但并没有解释清楚如何写，为什么这么写以及思路。  
于是今天来写一篇和this有关的这三个api的文章。  

ps: 该文章内容主要以API面试为主，大牛可以略过。

# call和apply

## Function.prototype.call

### 语法

>```fun.call(thisArg[,arg1[,arg2[, ...]]])```

### 参数

>thisArg  

在fun运行时指定的```this```值。

>arg1, arg2, ...  

给到```fun```的参数列表。

### 返回值

使用调用者提供的```this```值和参数调用该函数的返回值。若该方法没有返回值，则返回```undefined```。

## Function.prototype.apply

### 语法

>```fun.apply(thisArg, [argsArray])```

### 参数

>thisArg  

在fun运行时指定的```this```值。

>[argsArray]   

给到```fun```的参数数组。

### 返回值

使用调用者提供的```this```值和参数调用该函数的返回值。若该方法没有返回值，则返回```undefined```。

## apply、call的区别

apply和call所做的事情都相同，那就是改变函数内部的this指向并调用它。

唯一的区别在于调用时所传递给被调用函数的参数的书写形式。

call传递的参数以逗号分隔；apply传递的参数为数组形式。

## 手写实现apply

apply手写实现很简单，思路如下：

1. 检查调用```apply```的对象是否为函数

2. 将函数作为传入的```context```对象的一个属性，调用该函数

3. 不要忘了调用之后删除该属性

代码如下：

```javascript
Function.prototype.apply = function (context, args) {
  // 检查调用```apply```的对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }

  // 将函数作为传入的```context```对象的一个属性，调用该函数
  const fn = Symbol()
  context[fn] = this
  context[fn](...args)
  
  // 不要忘了调用之后删除该属性
  delete context[fn]
}
```

详解：

手写实现该API的核心知识点是关于this的指向确认。这一知识点可以在我的另一篇文章[如何判断this指向](https://github.com/wy2016xiao/blog/blob/master/anything/%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%ADthis%E6%8C%87%E5%90%91.md)中了解到。

apply的语法为```fun.apply(thisArg, [argsArray])```，我们知道如果有诸如```obj.func```形式的函数调用，那么这里```func```内部的```this```就是指向```obj```的。所以我们这里书写的```this```，其实就是将来以```func.bind()```形式使用```bind```时那个被调用的函数```func```。所以第一步如何写就解决了。

第二步，利用第一步的那个关于this的知识点，我们将被调用函数```this```作为传入对象的属性进行调用，就能让被调用函数内部的```this```指向该对象。如此一来我们就完成了该API最大的功能，改变被调用函数内的```this```指向。

我在这里使用到了新的```Symbol```数据类型，主要是避免在把函数赋值给```context```对象的时候，因为属性名冲突而覆盖掉原有属性。至于为什么使用```Symbol```作为属性名不会发生冲突，可以看看**阮一峰**大大的解释[ECMAscript-Symbol](http://es6.ruanyifeng.com/#docs/symbol)。

第三步，删掉该属性，避免对传入对象造成污染。

## 手写实现call

call和apply唯一区别就是传给被调用函数的参数写法不同，这里只贴个代码，不多写废话了。

代码如下：

```javascript
Function.prototype.call = function (context, ...args) {
  // 检查调用```apply```的对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }

  // 将函数作为传入的```context```对象的一个属性，调用该函数
  const fn = Symbol()
  context[fn] = this
  context[fn](...args)
  
  // 不要忘了调用之后删除该属性
  delete context[fn]
}
```

没错，比apply多了三个点。

# new操作符

在手写实现bind之前，我们必须先掌握另一个关键字的——```new```操作符的手写实现。

当然，手写实现```new```操作符也是常见面试题之一。

让我们先来看看[MDN-new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)上对new操作符的介绍。

>```new```运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
>1. 创建一个空的简单JavaScript对象（即{}）；
>2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
>3. 将步骤1新创建的对象作为this的上下文 ；
>4. 如果该函数没有返回对象，则返回this。

MDN的描述有些拗口，我来解释下：

1. 创建一个空的简单对象{}；

2. 将这个空对象的构造函数指定为```new```操作符操作的函数（即定义中说的另一个对象）。其实就是原型链绑定，相关知识可以看我的另一篇文章[原型与继承](https://github.com/wy2016xiao/blog/blob/master/anything/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E7%BB%A7%E6%89%BF.md)；

3. 将操作符操作的函数的this指向步骤1创建的空对象；

4. 运行该函数，如果该函数没有返回对象，则返回this。

看下代码：

```javascript
function myNew (fn, ...args) {
  // 第一步，创建一个空的简单JavaScript对象（即{}）；
  let obj = {}

  // 第二步，原型链绑定
  fn.prototype !== null && (obj.__proto__ = fn.prototype)

  // 第三步，改变this指向并运行该函数
  let ret = fn.call(obj, ...args)

  // 第四步，如果该函数没有返回对象，则返回this
  // 别忘了 typeof null 也返回 'object' 的bug
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret 
  }
  return obj
}
```

# bind

好了，让我们来看看bind

## Function.prototype.bind

### 语法

>```function.bind(thisArg[,arg1[,arg2[, ...]]])```

### 参数

>thisArg  

在fun运行时指定的```this```值。

>arg1, arg2, ...  

给到```fun```的参数列表。

### 返回值

返回一个原函数的拷贝，并拥有指定的```this```值和初始参数。

## 手写实现bind

bind和call、apply能力一样，都是改变某个函数内部的this指向

不同的是bind并不是立即调用该函数，而是返回一个原函数的拷贝

下面我们来一步一步实现一个bind

### 第一步

首先，看看bind做了些什么：bind返回一个改变了```this```指向的函数，该函数是原函数的拷贝，并且可以带入部分初始参数

```javascript
Function.prototype.bind = function (context, ...outerArgs) {
  return (...innerArgs) => {
    this.call(context, ...outerArgs, ...innerArgs)
  }
}
```

实现很简单，我们返回一个函数，里面使用```call```更改```this```指向就好了

### 第二步

其实事情并没有这么简单，由于bind会返回一个函数，理所当然的可以对其使用new操作符

如果你对```bind```返回的函数使用```new```操作符，会发现有些问题

首先你会遇到报错

```TypeError: thovinoEat is not a constructor```

这是因为上面我用了箭头函数，```new```操作符无法改变```this```指向了

修改一下：

```javascript
Function.prototype.bind = function (context, ...outerArgs) {
  let that = this;
  return function (...innerArgs) {
    that.call(context, ...outerArgs, ...innerArgs)
  }
}
```

接着我们来测试一下
```javascript
// 声明一个上下文
let thovino = {
  name: 'thovino'
}

// 声明一个构造函数
let eat = function (food) {
  this.food = food
  console.log(`${this.name} eat ${this.food}`)
}
eat.prototype.sayFuncName = function () {
  console.log('func name : eat')
}

// bind一下
let thovinoEat = eat.bind(thovino)

let instance = new thovinoEat('orange') // thovino eat orange

console.log('instance:', instance) // {}
```

运行一下，你会发现好像有些问题。生成的实例居然是个空对象！

不要着急，一步一步分析一下为什么

还记得```new```干了哪些事情吗？

在```new```操作符执行时，我们的```thovinoEat```函数可以看作是这样：

```javascript
function thovinoEat (...innerArgs) {
  eat.call(thovino, ...outerArgs, ...innerArgs)
}
```

在new操作符进行到第三步的操作```thovinoEat.call(obj, ...args)```时，这里的```obj```是new操作符自己创建的那个简单空对象```{}```，但它其实并没有替换掉```thovinoEat```函数内部的那个上下文对象```thovino```。这已经超出了```call```的能力范围，因为这个时候要替换的已经不是```thovinoEat```函数内部的```this```指向，而应该是```thovino```对象。

换句话说，我们希望的是```new```操作符将```eat```内的```this```指向操作符自己创建的那个空对象。但是实际上指向了```thovino```，```new```操作符的第三步动作并没有成功！

清楚这一点之后，我们就知道应该如何进行修改了：

```javascript
Function.prototype.bind = function (context, ...outerArgs) {
  let that = this;
  function ret (...innerArgs) {
    if (this instanceof ret) {
      // new操作符执行时
      // 这里的this在new操作符第三步操作时，会指向new自身创建的那个简单空对象{}
      that.call(this, ...outerArgs, ...innerArgs)
    } else {
      // 普通bind
      that.call(context, ...outerArgs, ...innerArgs)
    }
  }

  return ret
}
```

### 第三步

用回第二步的测试代码，发现还有最后一个小问题没有解决，那就是```eat.prototype.sayFuncName```函数没有继承到。

要解决这个问题非常简单，只需要将返回的函数链接上被调用函数的原型就可以实现方法继承了：

```javascript
Function.prototype.bind = function (context, ...outerArgs) {
  let that = this;

  function ret (...innerArgs) {
    if (this instanceof ret) {
      // new操作符执行时
      // 这里的this在new操作符第三步操作时，会指向new自身创建的那个简单空对象{}
      that.call(this, ...outerArgs, ...innerArgs)
    } else {
      // 普通bind
      that.call(context, ...outerArgs, ...innerArgs)
    }
  }

  ret.prototype = this.prototype

  return ret
}
```

这里我写的非常原始，是因为这样保留了**实现步骤**，让大家更好的看懂```bind```的实现原理。

至此，整个```bind```实现完成，剩下的就是如何精简代码，将代码写的更优雅一些。


贴一个VUE源码中的bind手写实现：
```javascript
function polyfillBind (fn: Function, ctx: Object): Function {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length
  return boundFn
}
```

---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。