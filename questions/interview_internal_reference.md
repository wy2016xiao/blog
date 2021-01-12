还是面试题~

[腾讯前端面试篇（一）](https://juejin.im/post/5c19c1b6e51d451d1e06c163)

1. 知道什么是事件委托吗？
    通常我们将onChange input等事件直接绑定在触发事件的DOM元素上。

    如果是使用v-for等循环渲染API进行重复渲染的场景，会因为在多个DOM上绑定相同的事件监听而导致不必要的开销。
    
    此时我们可以选择将事件绑定在父元素上，利用事件冒泡的特性触发事件监听函数。同时利用event.target属性获取触发事件的DOM。
    
    
    
2. 对Promise了解吗？

   promise是一个异步编程的解决方案。

   它有三种状态，pendding、resolved、rejected。当状态转变时会执行相应的方法，状态一旦改变便不再变更。

   Promise含有一个then方法，它接收两个函数参数，第一个为onFulfilled，第二个为onRejected。then方法返回一个Promise。

   

3. window的onload事件和domcontentloaded谁先谁后？

   window.onLoad事件在页面上所有资源（DOM CSS JS 图片 flash等）全部加载完成后触发

   documentloaded时间在DOM树构建完成后触发

   

4. 你之前遇到过跨域问题吗？是怎么解决的。

   之前遇到的跨域问题，基本上都使用反代来解决。

   架设反代，和请求页面同源。反代代理后端服务器。

   当然我们通常也会讲说JSONP。

   JSONP显然没有反代来得灵活，不过少了一个服务器也是降低开销的不错选择。

   JSONP通常是前端生成一个script标签，script标签的src属性是允许跨域的，这样我们就能进行一个请求。

   此时后端根据请求参数，返回一个js文件，里面通常是一个函数调用，通常将真正需要的数据放在函数参数里面，函数名则是前端已有的全局函数。

   这样就能正确调用函数，让前端接收到数据。

   

5. 有一个类如下：
    ```javascript
    function Person(name) {
      this.name = name
    }
    let p = new Person('Tom');
    ```
    1. p.__proto__等于什么？

       等于Person.prototype

    2. Person.__proto__等于什么？

       等于Function.prototype

       任何对象的原型都是它的构造函数的prototype属性

       而构造函数的原型如何找？构造函数的构造函数是Function，那么它的原型就是Function.prototype

    3. 若将题干改为
    ```javascript
    function Person(name) {
      this.name = name
      return name;
    }
    let p = new Person('Tom');
    ```
    实例化Person过程中，Person返回什么（或者p等于什么）？

    ```	{name: 'Tom'}```

    4.若将题干改为

    ```javascript
    function Person(name) {
        this.name = name
        return {}
    }
    let p = new Person('Tom');
    ```
    实例化Person过程中，Person返回什么（或者p等于什么）？

    ```{}```

    构造函数如果返回一个对象，那么实例为这个对象。否则作继承

6. typeof和instanceof的区别？

   typeof返回字符串，```  string number object``` 判断数据的类型

   instanceof返回boolean 判断数据是否为一个对象的实例

7. 如果Student inherit from Person（Student类继承Person，需是基于原型的继承），let s = new Student('Lily')，那么s instanceof Person返回什么？

   true

   Instanceof 内部会不断向上查找```__proto__```属性是否等于右边的prototype属性，直到```__proto__```为null

8. new和instanceof的内部机制？

   new的实现：

   1. 创建一个空对象
   2. 将该对象作为作为this执行构造函数的方法，缓存返回值
   3. 将该对象的```__proto__```指向构造函数的prototype属性
   4. 判断第二步的返回值类型，如果是null、object、function则返回返回值，否则返回该对象

   instanceof的实现：

   1. 取左边的值的```__proto__```属性L，取右边值的```prototype```属性R
   2. 比较L和R是否相等，如果不相等，向上查找L的```__proto__```属性
   3. 直到想等或者L为null

9. for...in迭代和for...of有什么区别？

   for...in一般用来遍历对象。如果用来遍历数组，key是字符串，并且是乱序的，同时会遍历所有可枚举属性包括原型

   for...of一般用来遍历非对象的有迭代器的对象，可以正确相应break continue return

10. 下面代码输出什么？
   ```javascript
   for(var i = 0; i < 10; i++) {
       setTimeout(() => {
           console.log(i)
       }, 0)
   }
   ```
   0

   若要输出从0到9，怎么办？

   用let const或者闭包保存这个i

11. 刚刚我们用到了箭头函数，说一下箭头函数This指向问题？

    箭头函数的this其实和函数外层作用域的this是同一个

12. 说一下你对generator的了解？

    

13. 使用过flex布局吗？flex-grow和flex-shrink属性有什么用？

    Flex-grow: 当有剩余空间时，分配剩余空间的比例

    flex-shrink：当没有剩余空间时，自身被缩小的比例

14. 说一下macrotask 和 microtask？并说出下面代码的运行结果。

    此处说的是宏任务和微任务

    简单讲就是浏览器所有代码执行以任务队列方式进行

    分为宏任务和微任务

    每一个宏任务完成后会检查微任务队列中是否有微任务，如果有就取出完成，直到没有微任务。然后进行下一个宏任务。

15. Http请求中的keep-alive有了解吗。

    http1.1是默认开启keep-alive的，除非connection的值为close

    tcp默认每一次请求时，服务器发送回所有数据后就会关闭连接。

    开启后就不会了，这是http中的keep-alive，当然还有tcp的keep-alive。前者我们主要目的是TCP连接重用，后者是保持TCP连接存货，也就是发送心跳包。

    在我们的BFF中也是使用的长连接进行GRPC服务建立。也会有心跳包的发送来探活

16. React中的controlled component 和 uncontrolled component区别（受控组件和不受控组件）。

    通常我们设置input的value属性为我们的state，通过onchange来改变state，使input的值改变，这种组件成为受控组件。

    反之就是不受控组件，通常利用ref进行获取值

17. 了解过react-router内部实现机制吗？

    

18. 数组扁平化处理：实现一个flatten方法，使得输入一个数组，该数组里面的元素也可以是数组，该方法会输出一个扁平化的数组。

19. 如果在17问的前提下，要做去重和排序处理又该怎么做（不用给出具体代码）。  

[腾讯前端面试篇（二）](https://juejin.im/post/5c1869ab6fb9a049f154207a)
1. 从输入URL到页面加载发生了什么？
2. 说一下缓存相关的知识吧？
3. 请描述一下DNS解析的具体过程？
4. TCP是如何发起连接和关闭连接的？
5. 你知道哪些状态码？
6. 刚刚你说的整个过程中，有哪些优化手段可以优化提高网页响应速度？
7. 5点15分，时钟和分钟的夹角？
8. 用原生js实现，要求：不能搜索网上资源，做到组件化，时间100 min。
    1. 实现一个div滑动的动画，由快至慢5s结束（不准用css3)。
    2. 页面内有一个input输入框，实现在数组arr查询命中词并要求autocomplete效果。
9. 实现超出整数存储范围的两个大整数相加function add(a,b)。注意a和b以及函数的返回值都是字符串。

[腾讯面试篇（三）——终章](https://juejin.im/post/5c1eec7bf265da61477034ae)
1. 你在做这个系统是如何确保消息实时推送的？
2. 消息撤回功能是如何实现的？
3. websocket有时会出现掉线的问题，怎么解决？
4. 排序算法使用过哪些？
5. 描述一下归并排序是怎么实现的？
6. 有没有理解过react内部的diff算法是怎么样的？如果让你来设计你会怎么设计。
7. 你了解的安全性问题？（这里不展开讲，这里问的挺多的）