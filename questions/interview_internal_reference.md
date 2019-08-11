还是面试题~

[腾讯前端面试篇（一）](https://juejin.im/post/5c19c1b6e51d451d1e06c163)
1. 知道什么是事件委托吗？
2. 对Promise了解吗？
3. window的onload事件和domcontentloaded谁先谁后？
4. 你之前遇到过跨域问题吗？是怎么解决的。
5. 有一个类如下：
    ```javascript
    function Person(name) {
      this.name = name
    }
    let p = new Person('Tom');
    ```
    1. p.__proto__等于什么？
    2. Person.__proto__等于什么？
    3. 若将题干改为
    ```javascript
    function Person(name) {
      this.name = name
      return name;
    }
    let p = new Person('Tom');
    ```
    实例化Person过程中，Person返回什么（或者p等于什么）？
    4.若将题干改为
    ```javascript
    function Person(name) {
        this.name = name
        return {}
    }
    let p = new Person('Tom');
    ```
    实例化Person过程中，Person返回什么（或者p等于什么）？
6. typeof和instanceof的区别？
7. 如果Student inherit from Person（Student类继承Person，需是基于原型的继承），let s = new Student('Lily')，那么s instanceof Person返回什么？
8. new和instanceof的内部机制？
9. for...in迭代和for...of有什么区别？
10. 下面代码输出什么？
    ```javascript
    for(var i = 0; i < 10; i++) {
        setTimeout(() => {
            console.log(i)
        }, 0)
    }
    ```
    若要输出从0到9，怎么办？
11. 刚刚我们用到了箭头函数，说一下箭头函数This指向问题？
12. 说一下你对generator的了解？
13. 使用过flex布局吗？flex-grow和flex-shrink属性有什么用？
14. 说一下macrotask 和 microtask？并说出下面代码的运行结果。
15. Http请求中的keep-alive有了解吗。
16. React中的controlled component 和 uncontrolled component区别（受控组件和不受控组件）。
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