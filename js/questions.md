#### this

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}

sayHi();
```

<details><summary><b>答案</b></summary>
<p>
undefined  ReferenceError

考察变量声明。

这里var关键词存在变量提升现象，js引擎会将其变量声明置顶。直到变量被赋值前，它的值都是undefined。

var的变量提升现象让人难以理解，所以let作为新的关键词纠正了这一现象。在这里是不会出现变量提升现象的（包括const关键词）。

参考
</p>
</details>


