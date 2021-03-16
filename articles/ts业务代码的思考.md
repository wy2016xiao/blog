我们一直在强调，`javascript`是弱类型语言，相应的`typescript`是强类型语言。

但我自身在写代码的时候，还是难免会依照写`javascript`的习惯去写代码。

思考下面代码：

```typescript
interface A{
  a: string
}

interface B{
  b: number
}
interface C{
  c: string
}
type ABC = A | B | C

const fn = (param: ABC) => {
  const {
    a = '1',
    b = 2,
    c = '3'
  } = param 

  // if ('b' in param) {
  //   obj = param.b
  // }
  return obj
}
```

这样的结构赋值写法就是典型的“弱类型语言”写法，也就是`javascript`习惯的写法。

这行代码相当于告诉编译器——我把`param`对象当做一个什么属性都可以有的万能对象来取值。

但在`typescript`的思维中，这里的`param`必须要符合某个类型，它是`A`或`B`或`C`都行，就是不能是“万能对象”。“万能对象”是`javascript`中才能存在的。

所以在这个demo中，我们需要先判断`param`的类型，再去取值，如同注释中的代码那样。