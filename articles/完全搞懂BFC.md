# 完全弄懂BFC

BFC全称是Block Formatting Context，即块级格式化上下文。

BFC最初被定义在css2.1规范的[Visual formatting model](https://www.w3.org/TR/CSS2/visuren.html)中。要想明白BFC到底是什么，首先来看看什么是Visual formatting model。

## 视觉格式化模型（Visual Formatting Model）

视觉格式化模型是用来处理文档并将它显示在视觉媒体上的机制，它让视觉媒体知道如何处理文档。（视觉媒体——user agent通常指的浏览器。）

在视觉格式化模型中，文档树的每个元素根据盒模型生成零个或多个盒子。这些盒子的布局受以下因素控制：
* 盒子的尺寸和类型。
* 定位方案（**普通文档流**，浮动流和绝对定位流）。
* 文档树中元素间的关系。
* 外部因素（如视口大小，图像本身的尺寸等）。

## 普通文档流

普通文档流是一种定位方案。

在css2.1中，普通文档流包括：
* 块级盒子的块级格式化上下文
* 内联级盒子的内联格式化上下文
* 块级和内联级盒子的相对定位

在普通文档流内的盒子属于格式化上下文（Formatting Context）。可以属于块级或者内联级，但不能同时属于。块级盒子属于块级格式化上下文。内联盒子属于内联格式化上下文。

## 格式化上下文（Formatting Context）

Formatting Context，即格式化上下文。用于决定如何渲染文档的一个区域。

不同的盒子使用不同的格式化上下文来布局。

每个格式化上下文都拥有一套不同的渲染规则，他决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

不明白没关系，你可以简单理解为格式化上下文就是**为盒子准备的一套渲染规则**。

常见的格式化上下文有这样几种：

【Block formatting context】(BFC) 

【Inline formatting context】(IFC) 

【Grid formatting context】(GFC) 

【Flex formatting context】(FFC)

## 什么是BFC
BFC即Block Formatting Context（块级格式化上下文）。

我们先来看看w3c对于BFC的定义：
>Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

也就是说，有这样几种情况会创建BFC：

* 根元素（html）或其他包含它的元素

* 浮动元素

* 绝对定位元素

* 非块级盒子的块级容器（inline-blocks, table-cells, table-captions等）

* overflow不为visiable的块级盒子

## BFC的范围
>A block formatting context contains everything inside of the element creating it that is not also inside a descendant element that creates a new block formatting context.

一个BFC包含创建该上下文元素的所有子元素，但不包括创建了新BFC的子元素的内部元素。

换句话说，一个元素不能同时存在两个BFC中。

## BFC的特性
* 盒子从顶部开始垂直排列

* 两个相邻的盒子之间的垂直距离由外边距（即margin）决定

* 块级格式化上下文中相邻的盒子之间的垂直边距折叠

* 每个盒子的左外边与容器的左边接触（从右到左的格式化则相反），即使存在浮动也是如此，除非盒子建立了新的块格式化上下文

* 形成了BFC的区域不会与float box重叠

* 计算BFC的高度时，浮动子元素也参与计算

## 从实际代码来分析BFC

### 实例一
```html
<style>
* {
  margin: 0;
  padding: 0;
}

.green {
  background: #73DE80;
  opacity: 0.5;
  border: 3px solid #F31264;
  width: 200px;
  height: 200px;
  float: left;
}

.red {
  background: #EF5BE2;
  opacity: 0.5;
  border: 3px solid #F31264;
  width: 400px;
  min-height: 100px;
}

.gray {
  background: #888;
  height: 100%;
  margin-left: 50px;
}
</style>
<div class='gray'>
  <div class='green'></div>
  <div class='red'></div>
</div>
```
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6ldrx47vvj317w0cuq32.jpg)

在这个例子中，构建出BFC的只有class名为green的盒子（浮动元素）

green盒子因为浮动原因，脱离普通文档流，形成浮动流。他好像跟其他两个盒子不在同一个世界一样。这也是我们在初涉前段时经常会碰到的头疼问题。（浮动流特性不在此文章讨论范围内，你可以简单理解为这个green盒子被扔进了异次元~）

现在普通文档流中只有gray和red盒子，所以gray的高度只被red撑起来。红色盒子也无视绿色盒子的存在，跑到了最左边。

### 实例二
如果想要让灰色框包裹住绿色，最简单的办法就是给gray盒子构建BFC。

```css
.gray{
  background:#888;
  height: 100%;

  overflow: hidden;
}
```
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6ldw4oy5pj317s0mk74p.jpg)

还记得BFC的特性吗？当我们计算BFC的高度时，浮动子元素也参与计算。这样一来我们就能让灰色盒子的高度被绿色盒子撑开了。

### 实例三
我们再来看看如何让红色盒子“接受”绿色盒子的存在？

```css
.red {
  background: #EF5BE2;
  opacity: 0.5;
  border: 3px solid #F31264;
  width: 400px;
  min-height: 100px;

  overflow: hidden;
}
```

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6le1d7rx2j317q0igwes.jpg)

我们将红色盒子也构建出BFC，根据特性，形成了BFC的区域不会与float box重叠。于是这里红色盒子成功“接受”了绿色盒子。

## 参考
[BFC原理解析](https://github.com/louzhedong/blog/issues/145)  

[介绍下BFC及其应用](https://muyiy.cn/question/css/39.html)  

[10分钟理解BFC原理](https://zhuanlan.zhihu.com/p/25321647)

[w3c css规范](https://www.w3.org/TR/?tag=css)

---

如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。