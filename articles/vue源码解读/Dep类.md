dep是dependency的缩写，顾名思义，是一个依赖有关打的类。

### 静态属性：

`target` - 当前的watcher实例

### 属性：

`id` - 主键

`subs` - 依赖列表

### 方法：

`addSub` - 添加依赖

`removeSub` - 移除依赖

`depend` - 在当前target的deps列表中加入自己，调用`target`的`addDep`方法

`notify` - 通知所有`sub`更新，调用`subs`的`update`方法



### 其他：

额外的，有一些工具函数和变量来辅助`dep`类

#### 属性：

`targetStack` - 全局变量，保存所有存活的`watcher`

#### 方法：

`pushTarget` - 将传入的参数`target`压入栈

`popTarget` - 从全局`targetStack`中弹出最后一个`target`