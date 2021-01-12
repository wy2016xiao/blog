

数据哨兵，核心功能是管理和Dep类的关系

核心属性除了dep系列属性以外，有一个cb函数，该函数才是数据更新时被触发的下一步操作，在双向绑定中意味着更新视图。



### 属性

`vm` - 实例

`expression` - 'a.b.c'或一个函数，每次函数的返回值发生改变的时候触发

`cb` - 当watcher被通知时,被调用的函数

`id` - 主键

`deep` - 是否需要深度监听

`user` - 是否是用户手动调用的this.$watch()

`lazy` - input输入框会由input触发改为onchange触发 也就是失去焦点时触发

`sync` - 更新时是否需要同步执行

`dirty` - 脏值,在异步update数据的时候需要

`active` - 是否活跃,不活跃的时候也就不需要通知了

`deps` - 该watcher对应的维护的发布器数组

`newDeps` - 该watcher对应的新的dep的缓冲

`depIds` - 该watcher对应的维护的发布器id

`newDepIds` - 该watcher对应的新的dep的id的缓冲

`before` - 

`getter` - 获取当前'a.b.c'或者传入函数的值,有一个可选参数,一般传入当前实例,代表this.a.b.c

`value` - 当前值

### 方法

`get` - 获取被watch的变量的最新值，同时触发getter

`addDep` - 如果新的deps里面没有,则把该dep加入到列表里面；如果同时需要检查dep自身的subs里面有没有自己；如果没有自己也要addSub

`cleanupDeps` - 清空实例的deps列表；把newdeps赋值给deps,同时清掉旧的deps

`update` - 更新数据,实际上是执行的run或者queueWatcher函数

`run` - 当值发生改变或是是个对象(对象无法确定是否值发生改变)或是需要深度观察时，调用cb

`evaluate` - 求值,赋值给value同时dirty重置为false

`depend` - 实际上就是调用了自己的addDep方法

`teardown` - 真正的销毁抹去一个watcher实例的存在；1.从所有的dep的subs中把自己移除；2.从实例的_watchers列表中把自己移除
