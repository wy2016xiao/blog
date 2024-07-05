# TypeScript体操基础

TS是图灵完备的，也就是说它可以作为一个编程语言，可以实现任何算法。

也就意味着，判断、递归、字符串操作、对象操作等等都是可以实现的。

## 判断

```typescript
type isNumber<T> = T extends number ? true : false;
```

## 字符串操作

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

## 对象操作

构造对象和对象取值也很简单

```typescript
type obj = {
    a: 1,
    b: 2
}

type obja = obj['a']; // 1
```

## 递归

递归稍微复杂一点，主要用到了extends进行递归终止判断。

```typescript
type FlattenKeys<T> = T extends object
  ? { [K in keyof T]: K extends string ? K | FlattenKeys<T[K]> : never }[keyof T]
  : '';

type NestedObject = {
  a: {
    b: {
      c: string;
    };
    d: string;
  };
  e: number;
};

type Keys = FlattenKeys<NestedObject>; // "a" | "b" | "c" | "d" | "e"
```

```typescript
type CreateArray<Len, Ele, Arr extends Ele[] = []> = Arr['length'] extends Len ? Arr : CreateArray<Len, Ele, [...Arr, Ele]>;

type ArrString = CreateArray<3, string>; // [string, string, string]
type ArrA = CreateArray<3, 'a'>; // ['a', 'a', 'a']
type ArrB = CreateArray<6, string, ['c']>; // ["c", string, string, string, string, string]
```


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。