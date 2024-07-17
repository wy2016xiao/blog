# 不常用知识点

## 泛型

先来回顾一下泛型。

泛型可以用```javascript```中的函数来辅助理解。

它用来代替即将传入的参数类型。当我们的类型定义中的类型不确定且有关联时，我们可以使用泛型。

### 基本用法

泛型可以用在函数、类、接口等地方，用来表示类型参数。

比如变量声明空间：

```typescript
// 箭头函数
const identity: <T = string>(arg: T) => T = (arg) => {
    return arg;
};

// interface形式写法
const identity2: { <Type = number>(arg: Type): Type } = identity;

// 具名函数
function identity3<T = 1>(arg: T): T {
    return arg;
};
```

比如类型声明空间：


```typescript
// 在调用函数时指定泛型参数 const b: Identity2 = (a) => a;
interface Identity {
    <T>(arg: T): T;
}

// b<string>('1');
// b('1');

// 在定义函数时指定泛型参数 const a: Identity<number> = (a) => a;
interface Identity2<T> {
    (arg: T): T;
}

//const b: Identity2<string> = (a) => a;

// 在调用函数时指定泛型参数 const b: Identity2 = (a) => a;
type Identity3 = <T>(arg: T) => T;

// 在定义函数时指定泛型参数 const a: Identity<number> = (a) => a;
type Identity4<T> = (arg: T) => T;

```

### 泛型约束

接下来我们介绍一下**泛型约束**的概念。

```typescript
const Identity = (a: string) => a;
```

如果我们想限制函数参数的类型，那么只需要冒号+类型就可以。

那如果我们想限制泛型参数的类型呢？

**泛型约束**可以用来限制泛型参数的类型，比如只允许传入包含length属性的类型。

它使用```extends```关键字进行约束。

类比```javascript```就相当于函数参数的类型定义。

```typescript
type Identity = <T extends Lengthwise>(arg: T) => T;
```

比如上面的例子，```T extends Lengthwise```就是泛型约束，限制了```T```的类型，它就相当于我们在```(a: string) => a```中限制了```a```的类型一样。

在TS中，```extends```关键字除了继承，还可以用来约束泛型的类型，```A extends B```代表着类型A要能分配给类型B。（分配的含义在下面的类型兼容会展开讲到）

## 条件类型

依旧是```extends```关键字，```ts```赋予它类型的约束能力时的同时，理所当然也会赋予它条件判断的能力。

```typescript
type I = number extends string ? true : false; // false

type II = (never | string) extends string ? true : false; // true

type III = string extends (number | string) ? true : false; // true

type isNumber<T> = T extends number ? true : false;
```

### 条件类型推断

有时候，我们需要在判断之后使用泛型参数，甚至需要使用泛型参数的某个子类型。

```ts```团队提供了一个关键字来实现这一功能——```infer```。

它最大的作用就是推导出泛型参数，用来在之后使用。

```typescript
// 获取数组类型的元素类型
type GetArrItemType<T> = T extends Array<infer Item> ? Item : T;

type PageDataList = {
    id: number;
    name: string;
}[]

const pageDataList: PageDataList = [];
const curPageData: GetArrItemType<PageDataList> = pageDataList[1]; // PageData
```

比如内置映射类型```ReturnType```，它可以帮助我们推断出函数的返回值类型。

下面是内置类型```ReturnType```的实现源码：

```typescript
// typescript/lib/lib.es5.d.ts
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

首先泛型约束了```T```，它必须是一个函数类型，然后使用```infer```关键字推断出返回值类型。

### 分布式条件类型

思考下面两行代码：

```typescript
type A = 'x' | 'y' extends 'x' ? 1 : 2; // 2

type P<T> = T extends 'x' ? 1 : 2;
type A2 = P<'x' | 'y'>; // 1 | 2
```

ts在很多地方都对字面量类型定义有不同的处理方式。

当条件是字面量类型是，会被看做一个联合类型整体处理。

但当同为联合类型，只不过是作为泛型参数传入时，则会分开单独处理，最后以联合类型返回。

这被称为**分布式条件类型**。

基于这种特性，条件类型也可以用来做过滤，比如过滤掉联合类型中的某个类型。

```typescript
type P<T> = T extends string ? T : never;
type A = P<'x' | 'y' | 3>; // 'x' | 'y'
```

它在类型体操中非常常用。

要解决也很简单，ts提供了```[]```来包裹泛型参数形成元祖，使其不被分布。

```typescript
type P<T> = [T] extends ['x'] ? 1 : 2;
type A = P<'x' | 'y'>; // 2
```

## 映射类型

映射类型是一种特殊的类型，它可以根据一个已知的类型生成一个新的类型。

```typescript
type I = {
  [key: string]: boolean;
};

const conforms: I = {
  del: true,
  rodney: false,
};

// ts内置Pick的实现
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

映射类型建立在索引签名语法上，用来声明未提前声明的属性的类型。

### 映射修饰符

映射类型在结合泛型时用途很广，比如它可以用来将一个类型的所有属性变为只读。

修饰符```readonly```、```?```、```-```可以用来修饰映射类型中的属性，分别代表只读和可选。

```typescript
// ts内置的readonly实现
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// ts内置的Partial实现
type Partial<T> = {
    [P in keyof T]?: T[P];
};

```

修饰符```+```、```-```可以用来移除或者添加这两个修饰符，如果不指定，默认为+。

```typescript
// ts内置的Required实现
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

in关键字用来遍历联合类型，相当于给后面的联合类型用了```map```函数。

in在这里不仅可以映射 ```string | number | symbol```，它可以映射任何类型，下面在```as```关键字中会讲到。

### 映射类型中的as

映射类型中，可以使用as来指定一个类型，用来覆盖原有的类型。

比如我们有一个字典类型：
```typescript
type BaseWardType = {
    'nursing': '护理',
    'surgery': '手术'
}
```

在另一处，我们会构建总院字典：
```typescript
type GeneralWardType = {
    'generalNursing': '总院-护理',
    'generalSurgery': '总院-手术'
}
```

我们知道，这样声明其实是不优雅的，最佳实践应该是基于```BaseWardType```构建```GeneralWardType```。

```typescript
type BaseWardType = {
    'nursing': '护理',
    'surgery': '手术'
}

// 使用模板字符串来生成新的属性名
type GeneralWardType = {
    [Key in keyof BaseWardType as `general${Capitalize<string & Key>}`]: () => `总院-${BaseWardType[Key]}`
};
```

来看一个更复杂的，如果我们需要根据一个联合类型生成一个新的类型，诸如：
```typescript
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
//type Config = {
//     square: (event: SquareEvent) => void;
//     circle: (event: CircleEvent) => void;
// }
```

该怎么实现这里的```EventConfig```呢？

```typescript
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
```

上面的映射意思为，对于```Events```联合类型的每一个成员，将```E["kind"]```作为新的属性名，对应的值为(event: E) => void。

```E in Events```成为```SquareEvent | CircleEvent```，然后将两个成员全都换成```kind```属性的值。

## 交叉类型

语义上，交叉类型指的是两个类型的合并。

```typescript
interface A  {a: 1, b: 2};
interface B  {a: 1, c: 4};

type C = A & B;

const c: C = {a: 1, b: 2, c: 4}; // ok
```

交叉类型不能有同属性冲突：

```typescript
interface A  {a: 1, b: 2};
interface B  {b: 3, c: 4};
type C = A & B; // never

const c: C = {a: 1, b: 2, c: 4}; // error

```

所以交叉类型使用必须非常注意，尤其是作为泛型使用。

一个经典去重体操：
```typescript
type A<T, U> = Exclude<T | U, T & U>;
type B = A<1 | 2, 1 | 3>; // 2 | 3
```

## 类型系统

强类型编程语言都有类型系统，然而作为弱类型语言的js没有，这也是TS诞生的原因。

### 名义类型

名义类型是指只有名字相同的类型才是兼容的（不讨论名义子类型）。如果你懂java，它就是典型的名义类型系统。

```typescript
class A {
    constructor(public x: number, public y: number) {}
}

class B {
    constructor(public x: number, public y: number) {}
}

let point: A = new B(1, 1); // Error
let location: B = new A(2, 2); // Error
```

名字不同，哪怕结构相同也不兼容。

### 结构类型

结构类型是指只要两个类型的结构相同，就认为它们是兼容的。

它是典型的鸭子类型。（不讨论结构子类型）

```typescript
interface A{
    a: number;
    b: string;
}

interface B{
    a: number;
    b: string;
}

let a: A = {a: 1, b: 'b'};
let b: B = {a: 1, b: 'b'};

a = b; // ok

b = a; // ok
```

如果是名义类型系统，这里的代码会报错。因为两者并没有显示的继承。

虽然A和B是不同的类型，但在TS中他们是兼容的。

在类中也是如此：

```typescript

class A {
    constructor(public x: number, public y: number) {}
}

class B {
    constructor(public x: number, public y: number) {}
}

let point: A = new B(1, 1); // Ok
let location: B = new A(2, 2); // Ok

```

### TS的选择

如果你看过或者写过Flow，你就会对这两个类型有更深的理解。因为Flow是名义类型+结构类型，而TS是结构类型。

## 类型兼容

类型兼容是指在某些情况下，一个类型可以被分配给另一个类型。

在类型系统中并没有**兼容**这种说法，而是**可分配**和**子类型**。在ts中，类型的兼容性取决于是否可分配。

### 可分配

如果TypeA类型的变量a，可以分配给TypeB类型的变量b，那么就说“TypeB是兼容TypeA的”。

### 子类型

子类型有两种，一种就是名义类型系统中的名义子类型，这种子类型就是两个类型之间通过显示的声明（比如继承）形成父子类型关系；

另一种就是结构类型系统中的结构子类型，两个类型之间无需通过显示得声明，而是仅从结构上就可以形成父子类型关系。

TS的类型兼容性虽然是基于结构子类型的，但在它的原则上扩展了许多规则。

为什么是扩展而不是替代？看下下面这个类型定义：

```typescript
const a: any = 1;
```

无论是TS的规定，还是语义上的理解，它都是“兼容”的。

但```number```不是```any```的子类型。

只能说是可分配给```any```。

### 结构子类型

```typescript
interface Pet {
  name: string;
}
let pet: Pet;

let dog = { name: "Lassie", owner: "Rudd Weatherwax" };

pet = dog; // ok

function greet(pet: Pet) {
  console.log("Hello, " + pet.name);
}
greet(dog); // OK
```

对象字面量只能指定已知属性：

```typescript
let pet: Pet = { name: "Lassie", owner: "Rudd Weatherwax" };
```

这样写就不行，因为对象字面量只能指定已知属性，而Pet接口只有name属性。

### 函数兼容

函数兼容是相反的，只能把子集赋给父集，不能把父集分配给子集。

因为函数参数通常可以省略。

这一点就不符合结构化子类型的原则。

所以，如果一定要说TS类型兼容基于什么原则，那就是——可分配。

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // OK
x = y; // Error
```

### Freshness

即严格对象字面量检查。在上面的结构化子类型的例子中已经提到，如果是使用字面量对象赋值，那么属性应该严格对应；

如果采用另一个变量，是允许多余属性的，只要满足结构化子类型的原则就行。

```typescript
interface A {
    a?: string;
    b?: number;
}

function fn(params: A): { a: string; area: number } {
    let obj = { a: 'white', area: 100 };
    if (params.a) {
        obj.a = params.a;
    }
    if (params.b) {
        obj.area = params.b * params.b;
    }
    return obj;
}

// 场景一：赋值给变量
let obj1: A;
obj1 = { a: 'red' }; // Ok
obj1 = { a: 'red', b: 100 }; // ok
obj1 = { a: 'red', b: 100, c: 200 }; // Error
\
let obj2 = { a: 'red', b: 100, c: 200 };
let obj3:A = obj2 // Ok

// 场景二：作为参数传递
fn({ a: 'red' }); // OK
fn({ a: 'red', b: 100 }); // ok
fn({ a: 'red', b: 100, c: 200 }); // Error
fn(obj2); // ok

// 对于字面量对象赋值给变量或则作为参数传递时会进行额外的属性检查
// 解决方式可以有以下几种方案

// 方案一：使用类型断言
let obj4 = fn({ b: 100, opacity: 0.5 } as A); // Ok

// 方案二：就是将这个字面量对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错。
let obj5 = { a: 'red', b: 100 };
let obj6 = fn(obj5); // Ok

// 方案三：修改接口定义
interface A {
    a?: string;
    b?: number;
    [propName: string]: any;
}
let obj7 = fn({ a: 'red', b: 100 }); // Ok
```

### any type

严格来说，与其形容它是任何类型，不如说它会跳过类型检查——因为它可以赋值给任何类型，也可以接受任何类型的赋值，除了分配给never。

```typescript
let num = 1;
let str = '1';
let bool = true;
let obj = {a: 1};
function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

let n: never = throwError('This function throws an error and never returns!');
let any: any;
let unkonw: unknown;
function returnVoid(): void {
    return;
}
let voidVar: void = returnVoid();
let nullVar: null = null;
let undefinedVar: undefined = undefined;


num = any; // ok
str = any; // ok
bool = any; // ok
obj = any; // ok
unkonw = any; // ok
voidVar = any; // ok
nullVar = any; // ok
undefinedVar = any; // ok
n = any; // Error

any = num; // ok
any = str; // ok
any = bool; // ok
any = obj; // ok
any = unkonw; // ok
any = n; // ok
any = voidVar; // ok
```

### unknow type

```unknow```可以接受任何类型，但它只能赋值给```any```。

在考虑使用```any```类型之前，你应该优先考虑是否可以用```unkonw```类型代替。

> ```unknown```类型代表任何值。这类似于```any```类型，但更安全，因为使用```unknown```值做任何事情都是不合法的。

```typescript
unkonw = num; // ok
unkonw = str; // ok
unkonw = bool; // ok
unkonw = obj; // ok
unkonw = n; // ok
unkonw = any; // ok
unkonw = voidVar; // ok

any = unkonw; // ok
num = unkonw; // Error
str = unkonw; // Error
bool = unkonw; // Error
obj = unkonw; // Error
n = unkonw; // Error
voidVar = unkonw; // Error
nullVar = unkonw; // Error
undefinedVar = unkonw; // Error
```

### never type

never是bottom type，可以接受任何类型，不能赋值给任何类型。

语义上表示**从未观察到**的值的类型。

比如函数中，永远不会正常返回（抛出错误或无限循环）。

也用于表示不可能存在的类型场景，比如两个互斥类型的交集。

> The never type represents values which are never observed. 

```typescript
num = n; // ok
str = n; // ok
bool = n; // ok
obj = n; // ok
unkonw = n; // ok
any = n; // ok
voidVar = n; // ok
nullVar = n; // ok
undefinedVar = n; // ok

n = num; // Error
n = str; // Error
n = bool; // Error
n = obj; // Error
n = unkonw; // Error
n = any; // Error
n = voidVar; // Error
```

### void Type

```void```表示不返回值的函数的返回值，在js中是```undefined```，但在ts中它单独表示。

```typescript
unkonw = voidVar; // ok
any = voidVar; // ok
num = voidVar; // Error
str = voidVar; // Error
bool = voidVar; // Error
obj = voidVar; // Error
n = voidVar; // Error
nullVar = voidVar; // Error
undefinedVar = voidVar; // Error

voidVar = any; // ok
voidVar = n; // ok
voidVar = num; // Error
voidVar = str; // Error
voidVar = bool; // Error
voidVar = obj; // Error
voidVar = unkonw; // Error
```


### strictNullChecks

strictNullChecks配置开启时，会对null和undefined进行严格检查。

当开启时，null和undefined只能赋值给any、自身，undefined可以赋值给void；

关闭时，null和undefined可以赋值给任何类型。

### 非空断言运算符

断言该值不是```null```或```undefined```

```typescript
function fn(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```