# devDependencies和dependencies是什么？

- devDependencies： 开发时所依赖的工具包；
- dependencies：项目正常允许时需要的依赖包；

如果只根据这两句话去思考，可能我们做不到真正的去理解devDependencies和dependencies，如果你想真正认识devDependencies和dependencies，请继续往下看。

### 什么包放在devDependencies？什么包放在dependencies？

要想搞明白这个问题，首先要清楚前端项目整个上线的一个流程：

- 本地开发完成后将代码push到gitlab；
- CI构建时会执行执行npm install；npm run build；从而编译出dist文件
- 将dist编译后的文件部署到线上；

这样我们每次访问系统的时候，都会去线上服务器获取dist文件执行。

#### 在一个项目内执行以下命令：

- npm install：安装devDependencies和dependencies的依赖
- npm install --production : 只安装dependencies的依赖(使用场景很少，如果在CI上配置这个命令，其实很容易导致项目构建失败，因为一旦判断错误，将应该放到dependencies的包放到devDependencies，就会导致构建失败)

#### 在一个项目内安装A组件：

- npm install A：A组件依赖的devDependencies不会被下载，只会下载A组件的dependencies

构建服务器配置的执行命令是npm install，其实我们的依赖包安装在devDependencies还是安装在dependencies，没有任何区别(前提项目不被别人依赖使用)，反正都会下载，但是如果开发的项目作为一个组件库的话，还是建议严格管理好

### devDependencies和dependencies。

**如果开发的是一个组件库**，那么建议将babel-loader、style-loader等打包相关的工具包放到devDependencies，因为如果放到dependencies，别人引用你的组件时，也会把这些工具包安装上，我们引用组件，其实引用的是lib里编译后的文件，所
以这些工具包我们是用不到的，所以如果开发时组件库，被业务代码使用的库安装在dependencies，其它的，例如打包相关、ESLint相关、Loader相关等等都要安装在devDependencies。

### 结论：

- 如果开发的是个工程项目，依赖包安装在devDependencies还是dependencies，虽然没有实质性的区别，但是为了规范，还是建议权衡一下对依赖做个区分；
- 如果开发的是组件库，建议将代码运行引用的库放到dependencies，其它的编译打包、eslint校验、开发相关的包放到devDependencies；


## peerDependencies

### npm2中的peerDependencies
再来看看peerDependencies。其实peerDependencies的含义很简单，那就是”如果你安装我，那么你最好也安装X“。

它的目的是解决依赖和宿主的共用依赖包不一致问题。

> peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。

比如：
```
  "peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
  }
```
它要求宿主环境安装react@>=16.0.0和react-dom@>=16.0.0的版本

### npm3+中的peerDependencies

npm3+之后，不会再要求宿主环境安装peerDependencies，而是会提示警告。

### npm7-8中的peerDependencies

npm7-8中，peerDependencies的行为和npm2一样，要求宿主环境安装peerDependencies。