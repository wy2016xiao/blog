思路：
1. 返回Promise实例
2. 挨个执行参数里面的Promise
3. 一旦有一个错误，直接reject
4. 全部执行完之后，把then的返回值push进result数组

```javascript
Promise.myAll = function(...args){
     const result = [];
     let isFail = false;
     let errInfo;
     let j = args.length;
     for (let i = 0; i < args.length; i++){
         // 如果有错误就停止循环 
         if(isFail) {
            return Promise.reject(errInfo);
         };
         // 挨个运行promise
         args[i].then(res => {
            // 处理结果
            result.push(res); 
            j--;
            if(j === 0){
                return Promise.resolve(result);
            }
         }).catch(err => {
            // 设置停止循环的标志，存储错误信息
            isFail = true;
            errInfo = err;
         })
     }
}
```