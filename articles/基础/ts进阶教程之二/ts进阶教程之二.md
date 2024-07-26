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

## 配置文件说明

当前的前端生态下，我们基本是不依靠t(j)sconfig.json文件的，因为大部分项目都是基于webpack/vite/rollup等打包工具的，他们有自己的配置文件。

但vscode的部分插件功能是依赖t(j)sconfig.json文件的，包括类型检查、代码导航、智能感知等功能。

以手术闭环项目为例，讲解配置文件的内容，可以快速熟悉ts相关配置：

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "jsx": "react",
    "esModuleInterop": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "root/*": ["src/*"],
      "@utils/*": [".meepo/src/utils/*"]
    },
    "allowSyntheticDefaultImports": true,
    "allowJs": true,
    "experimentalDecorators": true,
    "outDir": "."
  },
  "exclude": ["dist", "**/*.spec.ts", "lib", "fixtures", "examples", "./*.js"],
  "include": ["**/*", ".meepo/**/*.d.ts"]
}
```

### target

设定编译目标版本，也就是编译后的js代码版本

#### 默认值
ES3

#### 示例
es3 es5 es6 es2015 es2016 esnext

### module

指定生成的js代码使用哪个模块系统

#### 默认值

如果target是es3或者es5则为commonjs;

否则为es6

#### 示例

none commonjs amd umd system es6 es2020 esnext node16 nodenext

### moduleResolution

指定ts编译器的模块解析策略

#### 默认值

如果module字段为AMD、UMD、System、es6，则为Classic;

如果module字段为node16或者nodenext，则为node

#### 示例

classic node16 node10/node nodenext bundler

### importHelpers

是否引入降级操作。比如展开操作符、async关键字、extend关键字等。

### jsx

控制如何处理jsx代码。

#### 示例

preserve - 保留jsx代码，生成jsx文件

react-native - 保留jsx代码，生成js文件

react - jsx转译成React.createElement，生成js文件

react-jsx - jsx转译成_jsx函数调用，生成js文件

### esModuleInterop

是否使用es module来导入CommonJS模块。

默认值为false，在遇到CommonJS模块时，不能使用import a from 'a'的语法，要使用import * as a from 'a'的语法。

### sourceMap

是否生成sourceMap文件

### baseUrl

指定模块路径的基础路径。

比如：baseUrl: './src'。那么在import {a} from "utils"将会被视为src/utils。

### paths

指定路径别名，它相对于baseUrl。

allowSyntheticDefaultImports

如果设置为true，即使模块没有export default，也可以写import a from 'a'，不用硬写import * as a from 'a'。

### allowJs

控制ts编译器是否处理js文件。

一般情况下都配置为true，因为这可以让vscode将window等全局类型定义附加给js文件中的变量。

### experimentalDecorators

允许使用装饰器

### outDir

指定编译后的js输出位置

### types

控制允许全局使用的类型定义

更多可以看文档：[TSConfig Reference](https://ts.nodejs.cn/tsconfig#references)


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。