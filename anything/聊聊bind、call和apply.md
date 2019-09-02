# 聊聊bind、call和apply
## bind
语法：
```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```
直接看例子：
```javascript
function laugh (arg1, arg2) {
  console.log(this.laughWord, arg1, arg2)
}
let a = {
  laughWord: '嘻嘻',
  laugh: laugh
}
let b = {
  laughWord: '哈哈',
}

a.laugh(1, 2); // '嘻嘻',1,2
b.laugh(1, 2); // TypeError: b.laugh is not a function
let c = laugh.bind(b, 1, 2); 
c(); // '哈哈',1,2
```
bind又称为硬绑定，它返回一个内部this被指向thisArg的函数。

## call
语法：
```javascript
fun.call(thisArg, arg1, arg2, ...)
```
例子：
```javascript
function laugh (arg1, arg2) {
  console.log(this.laughWord, arg1, arg2)
}
let a = {
  laughWord: '嘻嘻',
  laugh: laugh
}
let b = {
  laughWord: '哈哈',
}

a.laugh(1, 2); // '嘻嘻',1,2
b.laugh(1, 2); // TypeError: b.laugh is not a function
laugh.call(b, 1, 2) // '哈哈',1,2
```
call和bind不同，它是改变this指向的同时直接调用被改变后的函数。

## apply
语法：
```javascript
func.apply(thisArg, [argsArray])
```
例子：
```javascript
function laugh (arg1, arg2) {
  console.log(this.laughWord, arg1, arg2)
}
let a = {
  laughWord: '嘻嘻',
  laugh: laugh
}
let b = {
  laughWord: '哈哈',
}

a.laugh(1, 2); // '嘻嘻',1,2
b.laugh(1, 2); // TypeError: b.laugh is not a function
laugh.apply(b, [1,2]) // '哈哈',1,2
```
和call一样，apply也是改变this的同时直接调用改变后的函数。不同的是apply的参数调用采用数组形式。


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。