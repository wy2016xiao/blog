## TypeScript体操基础

TS是图灵完备的，也就是说它可以作为一个编程语言，实现任何算法。

换句话说，判断、递归、字符串操作、对象操作等等都是可以实现的。

## 基本类型操作

### 字符串操作

```typescript
type left = 'aaa';
type right = 'bbb';

type concat = `${left}${right}`; // 'aaabbb'

type ConcatStrings<T extends string, U extends string> = `${T}${U}`;

type result = ConcatStrings<'Hello, ', 'world!'>; // 'Hello, world!'
```

结合infer。

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

### 元组操作

```typescript
type A = [1, 2, 3];

type B = A['length'] // 3
type C = A[number] // 1 | 2 | 3
```

### 数组操作

```typescript
type A = string[];

type B = A['length'] // number
type C = A[number] // string
```

## 运算操作

### 提取

如上面所说，```infer```关键字是一个很强大的工具，可以用来提取类型。

当我们需要提取某些类型中的类型时，可以使用```infer```。

```typescript
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never;

type ParametersResult = GetParameters<(name: string, age: number) => string>
```

神奇的是，```infer```还可以用来提取字符串。

```typescript
type S<T extends string> = T extends `${infer R}${string}` ? R : never;

type A = S<'abc'>; // ["a"]
```

在这种字符串匹配中，```infer```的作用是提取字符串的第一个字符。

实际上，这里永远是惰性提取一个字符串，直到最后一个匹配类型会全部提取。

```typescript
type S<T extends string> = T extends `${infer A}${infer B}${infer C}${infer D}${infer E}` ? [A, B, C, D, E] : never;

type A = S<'abcdefghi'>; // ["a", "b", "c", "d", "efghi"]
```

### 变换

对于基于XXX生成XXX的操作，基本思路都是通过构造一个新的类型来实现。

```typescript
type CapitalizeStr<Str extends string> =
    Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}` : Str;

type CapitalizeResult = CapitalizeStr<'tang'>
```

### 循环

循环稍显复杂，TS本身不支持循环，但是可以通过递归来实现。

```typescript
type CreateArray<Len, Ele, Arr extends Ele[] = []> = Arr['length'] extends Len ? Arr : CreateArray<Len, Ele, [...Arr, Ele]>;

type ArrString = CreateArray<3, string>; // [string, string, string]
type ArrA = CreateArray<3, 'a'>; // ['a', 'a', 'a']
type ArrB = CreateArray<6, string, ['c']>; // ["c", string, string, string, string, string]
```

### 计数

类型编程本身不支持做加减乘除运算，但可以通过递归构指定长度数组，然后取数组长度的方式来实现。

比如加法运算：

```typescript
type createArray<Len, Ele, Arr extends Ele[] = []> =  Arr['length'] extends Len ? Arr : createArray<Len, Ele, [Ele, ...Arr]>

type Add<A extends number, B extends number> = [...createArray<A, 1>, ...createArray<B, 1>]['length']

type b = Add<2,3> // 5
```

### 判断 

判断很简单，直接使用```extends```关键字的能力就可以实现。

```typescript
type isNumber<T> = T extends number ? true : false;

type res = isNumber<1>; // true
```


## 类型体操

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


### 项目中的一个例子

```typescript
/** 配置中心-字典项 */
export interface DicItem {
  /** 字典项编码 */
  dicCode: string;
  /** 字典项名称 */
  dicName: string;
  /** 字典项说明 */
  description: string;
  /** 缩写 */
  abbreviation: string;
}

/** 手术状态 */
export const SURGERY_STATUS_MAP = {
  /** 未开始 */
  NOT_STARTED: 0,
  /** 送程中 */
  EN_ROUTE: 1,
  /** 进行中 */
  IN_PROGRESS: 2,
  /** 已完成 */
  COMPLETED: 3,
  /** 返程中 */
  RETURNING: 4,
  /** 已返回 */
  RETURNED: 5,
  /** 取消 */
  CANCELED: 6,
  /** 复苏中 */
  // RECOVERING: 7,
} as const;
```

根据```SURGERY_STATUS_MAP```生成```SurgeryStatus```类型。

写法非常多，这给出一个麻烦但不改动源代码的写法。

```typescript
type SurgeryStatusValues = (typeof SURGERY_STATUS_MAP)[keyof typeof SURGERY_STATUS_MAP];

/**
 * {
 *   0: { dicCode: 0, dicName: string, description: string, abbreviation: string },
 *   1: { dicCode: 1, dicName: string, description: string, abbreviation: string },
 *   ...
 * }
 */
type SurgeryStatusDicItemMap = {
    [K in SurgeryStatusValues]: Omit<DicItem, 'dicCode'> & { dicCode: K }
};

type SurgeryStatus = {
    [K in SurgeryStatusValues]: Omit<DicItem, 'dicCode'> & { dicCode: K }
}[SurgeryStatusValues][];
```

其实可以写一个递归来将它真正转换为```code```和```index```严格对应的形式，而不是现在这样的联合类型形式。

但这里存在考量，因为数组顺序不一定一致。```surgeryStatus[0].dicCode```不一定是```0```。

另外还有更简单的改法，那就是吧```DicItem```改成泛型。


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。