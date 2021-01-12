通常作为变量的`_ob_`的值存在，该类主要用来初始化对一个对象的监听。

### 属性

`value` - 被监听的对象

`dep` - `new Dep()`

`vmCount` - 实例数量

### 方法

`walk` - 遍历对象所有属性，全部应用`defineReactive`方法设置`getter` `setter`

`observeArray` - 给数组的每一个成员使用`new Observer()`

