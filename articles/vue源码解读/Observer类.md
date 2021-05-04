通常作为变量的`_ob_`的值存在，该类主要用来初始化对一个对象的监听。

### 属性

`value` - 被监听的对象

`dep` - `new Dep()`

`vmCount` - 实例数量

### 方法

`walk` - 遍历对象所有属性，全部应用`defineReactive`方法设置`getter` `setter`

`observeArray` - 给数组的每一个成员使用`new Observer()`

### 其他

`observe` - 对于一个待观察对象，vue不会直接进行`new Observer()`，而是调用`observe`方法，进行一些预处理，然后返回`Observer`类的实例。这个函数主要是用来动态返回一个`Observer`类实例，即`new Observer()`。首先判断value如果不是对象则返回`undefined`，然后检测该对象是否已经有`Observer`，有则直接返回，否则新建并将`Observer`保存在该对象的`__ob__`属性中（在构造函数中进行），然后将实例返回。

`defineReactive` - 将一个对象的属性变成响应式。

