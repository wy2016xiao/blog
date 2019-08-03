最近对各种可以实现相同功能的api的性能问题很感兴趣。  
之前一直使用join来实现数组转字符串，今天突然看到Array.prototype.toString方法，和Array.prototype.join对于普通类型成员的数组来讲达到的效果一样，很好奇他们俩的性能如何。


```javascript
let array = [];
for (let index = 0; index < 10000000; index++) {
  array.push(index*50)
};

console.time('join')
array.join()
console.timeEnd('join')

console.time('tostring')
array.toString()
console.timeEnd('tostring')
```

次数\方法|join|toString
|-|-|-|
第一次|1718.668ms|1912.910ms
第二次|1732.183ms|1858.345ms
第三次|1673.615ms|1868.329ms
第四次|1713.594ms|1884.734ms
第五次|1756.379ms|1885.672ms
第六次|1723.155ms|1885.358ms
第七次|1771.698ms|1967.608ms

性能上join比toString要好一些，但差距其实不太大。以后还是继续使用join吧~