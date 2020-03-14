# Promises/A+规范实现

## Promises/A+规范概述

这个就不多概述了，直接贴规范链接好了：

[Promises/A+](https://promisesaplus.com)

规范中定义了许多细节，包括对`then`方法参数的处理等等

## Promise Pollyfill

### 一步步实现

* 一个名叫`MyPromise`的类，它内部有一个状态值，初始值为`pendding`

* 构造函数的参数是一个函数，需要传入我们熟知的`resolve` `reject`方法

* 定义成功、失败的参数函数

```javascript
class MyPromise {
  constructor (executor) {
    // 初始化状态
    this.status = 'pendding'
    let resolve = () => {
      if (this.status === 'pendding') {
        this.status = 'fulfilled'
      }
    }

    let reject = () => {
      if (this.status === 'pedding') {
        this.tatus = 'rejected'
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
}
```

* 定义`then`方法，储存失败、成功的值

```javascript
class MyPromise {
  constructor (executor) {
    // 初始化状态
    this.status = 'pendding'
    // 成功值
    this.value = undefined
    // 失败值
    this.reasion = undefined
    
    let resolve = value => {
      if (this.status === 'pendding') {
        this.status = 'fulfilled'
        this.value = value
      }
    }

    let reject = reason => {
      if (this.status === 'pedding') {
        this.tatus = 'rejected'
        this.reason = reason
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled,onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }

    if (this.status === 'rejected') {
      onRejected(this.rejected)
    }
  }
}
```

到目前为止，同步的`Promise`已经实现，接下来需要使它支持异步代码

当调用`then`方法时，有可能状态还处于pendding状态

此时需要将`then`中的函数存储起来，等待pendding状态改变，再执行

```javascript
class MyPromise {
  constructor (executor) {
    // 初始化状态
    this.status = 'pendding'
    // 成功值
    this.value = undefined
    // 失败值
    this.reasion = undefined
    // 成功存放的数组
    this.onResolvedCallbacks = []
    // 失败存放的数组
    this.onRejectedCallbacks = []
    
    let resolve = value => {
      if (this.status === 'pendding') {
        this.status = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if (this.status === 'pedding') {
        this.tatus = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // `then`函数要分两种情况考虑
  // 1. 同步：如果状态已经改变，就直接调用参数函数
  // 2. 异步：如果状态还未改变，就先存在数组里面，等`resolve`、`reject`参数函数调用时循环调用
  then(onFulfilled,onRejected) {
    if (this.state === 'fulfilled') {
      let x = onFulfilled(this.value);
    };
    if (this.state === 'rejected') {
      let x = onRejected(this.reason);
    };
    if (this.state === 'pending') {
      // 这里有个小知识，使用bind会将当前值传进去，而当前值其实是undefined
      // 使用函数包装起来，则此处的this.value只有在调用的时候才求值
      this.onResolvedCallbacks.push(()=>{
        let x = onFulfilled(this.value);
      })
      this.onRejectedCallbacks.push(()=>{
        let x = onRejected(this.reason);
      })
    }
  }
}
```


```javascript
class MyPromise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // 声明返回的promise2
    let promise2 = new MyPromise((resolve, reject)=>{
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        this.resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        this.resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          this.resolvePromise(promise2, x, resolve, reject);
        })
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          this.resolvePromise(promise2, x, resolve, reject);
        })
      }
    });
    // 返回promise，完成链式
    return promise2;
  }

  /**
   * @params {Promise} promise2 then返回的promise
   * @params {Promise} x then传入的参数函数的返回值
   * @params {function} resolve then返回的promise的resolve
   * @params {function} reject then返回的promise的reject
   */
  resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    // let a = new MyPromise(fn)
    // a.then(() => a.then())
    // 此时x === a.then() === promise2
    if(x === promise2){
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    // 防止多次调用
    let called;
    // 对then的参数函数的返回值类型进行检查，如果符合promises/A+规范，就继续解析
    // 如果不是promise就直接resolve
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认上一个then的参数是一个promise了
        if (typeof then === 'function') { 
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
          })
        } else {
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e); 
      }
    } else {
      resolve(x);
    }
  }
}

```


最后，解决部分零散问题
```javascript
class MyPromise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 模拟异步执行，保证执行顺序（符合时间循环）
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // 返回promise，完成链式
    return promise2;
  }
  /**
   * @params {Promise} promise2 then返回的promise
   * @params {Promise} x then传入的参数函数的返回值
   * @params {function} resolve then返回的promise的resolve
   * @params {function} reject then返回的promise的reject
   */
  resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    // let a = new MyPromise(fn)
    // a.then(() => a.then())
    // 此时x === a.then() === promise2
    if(x === promise2){
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    // 防止多次调用
    let called;
    // 对then的参数函数的返回值类型进行检查，如果符合promises/A+规范，就继续解析
    // 如果不是promise就直接resolve
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认上一个then的参数是一个promise了
        if (typeof then === 'function') { 
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
          })
        } else {
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e); 
      }
    } else {
      resolve(x);
    }
  }
}
```