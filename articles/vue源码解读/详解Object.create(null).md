# 详解Object.create(null)
在Vue和Vuex的源码中，尤大都使用了```Object.create(null)```来初始化一个新对象。为什么不用更简洁的```{}```呢？

看了很多人的讨论，在这里总结一下。

## Object.create()定义
>Object.create(proto[, propertiesObject])

proto:指定新创建对象的原型对象。  

propertiesObject:可选。未定义时为```undefined```。定义要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。

该API以某对象为原型，新创建一个对象。同时有一个可以省略的参数，能够设置新创建的对象的```properties属性```，这些属性对应```Object.defineProperties()```中的属性。
```javascript
let orgObj = {
  name: 'origin',
  say () {
    console.log('xixi')
  }
}

let insObj = Object.create(orgObj, {
  name: {
    value: 'instance',
    enumerable: true
  }
});

insObj.name = 'wolala'

console.log(insObj)
```

## Object.create()和{}
先来看看```{}```和```Object.defineProperties(null)```是什么样子：
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g7d2ldm887j30jw0ds411.jpg)
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g7d3f74shlj309u032jre.jpg)

这里用```{}```生成的对象拥有原型对象而```Object.defineProperties(null)```生成的对象没有原型对象。

## Object.create(null)使用场景
实际上，尤大在这里使用```Object.defineProperties(null)```并非javascript生成对象的最佳实践，毕竟没有了原型方法，新创建出来的对象哪怕添加了属性也非常的“难用”。

但观察源码会发现，这里生成的对象可以当做一个非常纯净的“字典对象”来使用。

同时我们可以自己添加```toString```、```hasOwnProperty```等方法，对该对象进行扩展。

## 总结
总结：
1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
2. 想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候