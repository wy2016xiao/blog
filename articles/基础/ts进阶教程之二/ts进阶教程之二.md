# TypeScript类型兼容

## 类型系统

类型系统有结构化类型和名义类型两种。

### 结构类型

结构类型是指只要两个类型的结构相同，就认为它们是兼容的。典型的鸭子类型。（不讨论结构子类型）

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

### 名义类型

名义类型是指只有名字相同的类型才是兼容的。（不讨论名义子类型）

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

### TS的选择

如果你看过或者写过Flow，你就会对这两个类型有更深的理解。因为Flow是名义类型+结构类型，而TS是结构类型。


## 类型兼容

类型兼容是指在某些情况下，一个类型可以被分配给另一个类型。

在类型系统中并没有**兼容**这种说法，而是**可分配**和**子类型**。在ts中，类型的兼容性取决于是否可分配。

### 可分配

如果TypeA类型的变量a，可以分配给TypeB类型的变量b，那么就是TypeB是兼容TypeA的。

### 子类型

子类型有两种，一种就是名义类型系统中的名义子类型，这种子类型就是两个类型之间通过显示的声明（比如extends）形成父子类型关系，这与里氏替换原则所表述得子类的实例可以赋值给父类的实例是一样的；

另一种就是结构类型系统中的结构子类型（Structural Subtyping），两个类型之间无需通过显示得声明，而是仅从结构上就可以形成父子类型关系。

TS的类型兼容性是基于结构子类型的。在它的原则上扩展了许多规则。

为什么是扩展而不是替代？

```typescript
const a: any = 1;
```

但```number```明显不能说是```any```的子类型。

只能说是可分配给```any```。

### 结构化子类型
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

函数兼容是相反的，x可以赋值给y，但y不能赋值给x。因为函数参数通常可以省略。这一点就不符合结构化子类型的原则。

如果一定要说TS类型兼容基于什么原则，那就是——可分配。

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // OK
x = y; // Error
```

### Freshness

即严格对象字面量检查。在上面的结构化子类型的例子中已经提到，如果是使用字面量对象赋值，那么属性应该严格对应；如果采用另一个变量，是允许多余属性的，只要满足结构化子类型的原则就行。

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
obj1 = { a: 'red', b: 100 }; // Error

// 场景二：作为参数传递
let obj2 = fn({ a: 'red' }); // OK
let obj3 = fn({ a: 'red', b: 100 }); // Error

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

### unknow type

这才是真正的any，是其他类型的父类型，即其他类型的变量都可以分配给unknow类型的变量。

### never type

如果说unknow是top type，那么never就是bottom type，never是任何类型的子类型，但是没有类型是never的子类型，它可以分配给任何类型。

### void Type

strictNullChecks配置未开启时，null类型的、undefined类型的变量可以分配给void类型的变量；void亦可以分配给除never类型之外的其他类型的变量；

strictNullChecks配置开启时，undefined类型的变量可以分配给void类型的变量，null不行。

### strictNullChecks

strictNullChecks配置开启时，会对null和undefined进行严格检查。

当开启时，null和undefined只能赋值给any、自身，undefined可以赋值给void；

关闭时，null和undefined可以赋值给任何类型。


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。