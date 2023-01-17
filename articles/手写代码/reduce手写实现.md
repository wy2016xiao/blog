# `reduce`手写实现

## `Array.prototype.reduce`

### 语法

>arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

### 参数

**callback**

执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：

*accumulator*

累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。

*currentValue*

数组中正在处理的元素。

*index（可选）*

数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。

*array（可选）*

调用reduce()的数组。

**initialValue（可选）**

作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

### 返回值

函数累计处理的结果

## 手写实现

### 思路

1. 常规判断  
这里我们主要要判断的是调用数组、传入参数

2. 初始化各个变量，为第一次执行函数做准备  
这里我们需要准备的变量有需要传入回调函数的4个参数  
accumulator, currentValue, currentIndex, sourceArray

3. 开始循环 
同时记得更新几个参数和返回结果

4. 返回结果

看下代码：

```javascript
Array.prototype.myreduce = function (fn, initialValue) {
  // fn(accumulator, currentValue, currentIndex, sourceArray)
  // 判断调用对象是否为数组
  if (Object.prototype.toString.call(this) !== '[object Array]') {
    throw new TypeError('not a array')
  }
  // 判断调用数组是否为空数组
  const sourceArray = this
  if (sourceArray.length === 0) {
    throw new TypeError('empty array')
  }
  // 判断传入的第一个参数是否为函数
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`)
  }

  // 第二步
  // 回调函数参数初始化
  let accumulator, 
  currentValue,
  currentIndex;
  if (initialValue) {
    accumulator = initialValue
    currentIndex = 0
  } else {
    accumulator = arr[0]
    currentIndex = 1
  }

  // 第三步
  // 开始循环
  while (currentIndex < sourceArray.length) {
    currentValue = sourceArray[currentIndex]
    accumulator = fn(accumulator, currentValue, currentIndex, sourceArray)
    currentIndex++
  }

  // 第四步
  // 返回结果
  return accumulator
}
```

是的，这里有些问题，我们用测试代码来试试：

```javascript
const rReduce = ['1', null, undefined, , 3, 4].reduce((a, b) => a + b, 3)
const mReduce = ['1', null, undefined, , 3, 4].myreduce((a, b) => a + b, 3)

console.log(rReduce); // 31nullundefined34
console.log(mReduce); // 31nullundefinedundefined34
```

问题来了，原生`reduce`会将数组中的空成员自动忽略，而在我们这里并没有做这样的过滤。

如何判断是否为空？

小知识点：`Object.prototype.hasOwnProperty`能够判断数组在某下标位是否为空

补上：
```javascript
// 第三步
while (currentIndex < sourceArray.length) {
  if (Object.prototype.hasOwnProperty.call(sourceArray, currentIndex)) {
    currentValue = sourceArray[currentIndex]
    accumulator = fn(accumulator, currentValue, currentIndex, sourceArray)
  }
  
  currentIndex++
}
```

测试一下：
```javascript
const rReduce = ['1', null, undefined, , 3, 4].reduce((a, b) => a + b, 3)
const mReduce = ['1', null, undefined, , 3, 4].myreduce((a, b) => a + b, 3)

console.log(rReduce); // 31nullundefined34
console.log(mReduce); // 31nullundefined34
```

完美！

贴一下完整代码：
```javascript
Array.prototype.myreduce = function (fn, initialValue) {
  // 判断调用对象是否为数组
  if (Object.prototype.toString.call([]) !== '[object Array]') {
    throw new TypeError('not a array')
  }
  // 判断调用数组是否为空数组
  const sourceArray = this
  if (sourceArray.length === 0) {
    throw new TypeError('empty array')
  }
  // 判断传入的第一个参数是否为函数
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`)
  }

  // 第二步
  // 回调函数参数初始化
  let accumulator, 
  currentValue,
  currentIndex;
  if (initialValue) {
    accumulator = initialValue
    currentIndex = 0
  } else {
    accumulator = arr[0]
    currentIndex = 1
  }

  // 第三步
  // 开始循环
  while (currentIndex < sourceArray.length) {
    if (Object.prototype.hasOwnProperty.call(sourceArray, currentIndex)) {
      currentValue = sourceArray[currentIndex]
      accumulator = fn(accumulator, currentValue, currentIndex, sourceArray)
    }
    
    currentIndex++
  }

  // 第四步
  // 返回结果
  return accumulator
}
```

同样的，为了清晰显示实现思路，这里不做代码优化工作~

---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。