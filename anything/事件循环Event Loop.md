## 开门见山的说
javascript是单线程的。不管是什么新框架新语法糖实现的所谓异步，其实都是用同步的方法去模拟的，牢牢把握住单线程这点非常重要。  
而事件循环是js实现异步的一种方法，也是js的执行机制。

如下图：



## macrotask与microtask
macrotask（宏任务）：整体script（即同步任务），setInterval， setTimeout，UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)  
microtask（微任务）：promise，mutation observable，process.nextTick（Node.js 环境）


先来看一个简单的例子：
```javascript
console.log(1)
setTimeout( function () {
  console.log(2)
}, 0)
console.log(3)
// 1
// 3
// 2
```
让我们一步步分析：  
* 按照事件循环顺序，先执行第一个macrotask（整体script代码），遇到```console.log(1)```打印出```1```。  
<font size="2">**（macrotask：[]，microtask：[]）**</font>

* 遇到```setTimeout```，将其中的回调函数丢到下一个macrotask。  
<font size="2">**（macrotask：[回调函数]，microtask：[空]）**</font>

* 遇到```console.log(3)```，打印出```3```。  
<font size="2">**（macrotask：[回调函数]，microtask：[空]）**  
至此，代码执行完毕，即第一个macrotask（整体script）执行完。引擎开始检查microtask是否有任务。这里我们的microtask里面也为空，那么开始执行下一个macrotask内的任务。</font>

* 4ms后（HTML标准中setTimeout最低为4ms）执行回调函数，打印```2```，代码执行完毕。  
<font size="2">**（macrotask：[空]，microtask：[空]）**</font>  

至此，所有代码执行完毕。


看看两种类型任务混合起来的例子：
```javascript
setTimeout(function() {
  console.log('1 setTimeout callback');
}, 0)

new Promise(function(resolve) {
  console.log('2 promise create');
  resolve()
}).then(function() {
  console.log('3 promise then');
})

console.log('4 outer console');
// 2 promise create
// 4 outer console
// 3 promise then
// 1 setTimeout callback
```
还是一步步分析，为了方便我们给所有console编号：

* 执行整体script，遇到```setTimeout```，将回调丢到macrotask。  
<font size="2">**（macrotask：[回调函数1]，microtask：[空]）**</font>

* 遇到```new Promise```执行内部的创建函数，打印出```2 promise create```。同时将then中的回调函数丢到microtask。  
<font size="2">**（macrotask：[回调函数1]，microtask：[回调函数3]）**</font>

* 遇到末尾的```console```打印出```4 outer console```。  
<font size="2">**（macrotask：[回调函数1]，microtask：[回调函数3]）**  
此时开始到下一步，发现microtask中有任务，执行microtask内部任务。</font>

* 执行回调函数3，打印出```3 promise then```  
<font size="2">**（macrotask：[回调函数1]，microtask：[空]）**  
microtask队列清空，执行下一个macrotask任务。</font>

* 执行回调函数1，打印出```1 setTimeout callback```  
<font size="2">**（macrotask：[空]，microtask：[空]）**</font>  

至此，所有代码执行完毕。

即使是互相嵌套，也依然遵守事件循环的规则：
```javascript
setTimeout(function() {
  console.log('1 setTimeout callback');
}, 0)

new Promise(function(resolve) {
  setTimeout(function() {
    console.log('2 promise setTimeout create');
  }, 0)
  resolve()
}).then(function() {
  console.log('3 promise then');
})

console.log('4 outer console');
// 4 outer console
// 3 promise then
// 1 setTimeout callback
// 2 promise setTimeout create
```
解析：
* 执行整体script，遇到```setTimeout```，将回调丢到macrotask。  
<font size="2">**（macrotask：[回调函数1]，microtask：[空]）**</font>

* 遇到```new Promise```执行内部的创建函数，遇到```setTimeout```，将回调丢到macrotask。同时将then中的回调函数丢到microtask。  
<font size="2">**（macrotask：[回调函数1，回调函数2]，microtask：[回调函数3]）**</font>

* 遇到末尾的```console```打印出```4 outer console```。  
<font size="2">**（macrotask：[回调函数1，回调函数2]，microtask：[回调函数3]）**  
此时开始到下一步，发现microtask中有任务，执行microtask内部任务。</font>

* 执行回调函数3，打印出```3 promise then```  
<font size="2">**（macrotask：[回调函数1，回调函数2]，microtask：[空]）**  
microtask队列清空，执行下一个macrotask任务。</font>

* 执行回调函数1，打印出```1 setTimeout callback```  
<font size="2">**（macrotask：[回调函数2]，microtask：[空]）**</font>  

* 执行回调函数2，打印出```2 promise setTimeout create```  
<font size="2">**（macrotask：[空]，microtask：[空]）**</font>  

至此，所有代码执行完毕。