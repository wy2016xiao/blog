## TypeScript体操基础

TS是图灵完备的，也就是说它可以作为一个编程语言，实现任何算法。

换句话说，判断、递归、字符串操作、对象操作等等都是可以实现的。

### 判断

```typescript
type isNumber<T> = T extends number ? true : false;
```

### 字符串操作

```typescript
type left = 'aaa';
type right = 'bbb';

type concat = `${left}${right}`; // 'aaabbb'

type ConcatStrings<T extends string, U extends string> = `${T}${U}`;

type result = ConcatStrings<'Hello, ', 'world!'>; // 'Hello, world!'
```

联合infer。

```typescript
type a = 'aaa,bbb';

type c = a extends `aaa,${infer rest}` ? rest : never; // 'bbb'
```

### 对象操作

构造对象和对象取值也很简单

```typescript
type obja = {
    a: 1,
    b: 2,
}

type objb = {
    b: 2,
    c: 3,
}

// 对象取值
type objaa = obja['a']; // 1
// 对象合并
type objab = obja & objb; // { a: 1, b: 2, c: 3 }
// 复制对象
type bkObj = {
    [key in keyof obja]: obja[key];
}
```

### 递归
递归稍微复杂一点，主要用到了extends进行递归终止判断。

```typescript
type CreateArray<Len, Ele, Arr extends Ele[] = []> = Arr['length'] extends Len ? Arr : CreateArray<Len, Ele, [...Arr, Ele]>;

type ArrString = CreateArray<3, string>; // [string, string, string]
type ArrA = CreateArray<3, 'a'>; // ['a', 'a', 'a']
type ArrB = CreateArray<6, string, ['c']>; // ["c", string, string, string, string, string]
```



## 类型体操

### 数字加法

ts没有运算符，所以只能通过构造数组再取长度的方式来实现加法。

```typescript
type createArray<Len, Ele, Arr extends Ele[] = []> =  Arr['length'] extends Len ? Arr : createArray<Len, Ele, [Ele, ...Arr]>

type Add<A extends number, B extends number> = [...createArray<A, 1>, ...createArray<B, 1>]['length']

type b = Add<2,3>
```

### 把字符串重复n次

这里用到的基本运算是递归+模板字符串。

```typescript
type RepeactStr<Str extends string,
                Count, 
                Arr extends Str[] = [],
                ResStr extends string = ''> 
 = Arr['length'] extends Count 
 ? ResStr 
 : RepeactStr<Str, Count, [Str, ...Arr], `${Str}${ResStr}`>;
```

### 取出对象中的数字属性

```typescript
type filterNumberProp<T extends Object> = { 
    [Key in keyof T] : T[Key] extends number ? T[Key] : never
 }[keyof T];
```

### 实现内置Pick泛型类型

```typescript
type IPick<O extends object, strs extends keyof O> = {
    [k in strs]: O[k]
}
type Ojb = {
    a: 1
    b: 2
    c: 3
}

type res = IPick<Ojb, 'a' | 'b'> // { a: 1, b: 2 }
```

### 取数组第一个
```typescript
type FirstofArray<Arr extends any[]> = Arr extends any[] ? Arr[0] : never;
// type FirstofArray<Arr extends any[]> = Arr extends [infer A, ...infer rest] ? A : never

type a = FirstofArray<[string, any, string]>
```

### 实现push
```typescript
type Push<Arr extends any[], I> = [...Arr, I];

type a = Push<[2,3], 's'>
```

### -1
```typescript
type MinusOne<T extends number, A extends 1[] = [], B extends 1[] = []> =T extends A['length'] ? B['length'] : MinusOne<T, [ ...A, 1], [...A]>;

type a = MinusOne<56>
```

实际上，这种实现是有问题的。问题在于ts的递归深度有限制，所以这种递归实现是有限制的。

看下下面这个算法。

### 乘法


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。