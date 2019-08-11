* Doctype作用？  
```
```<!DOCTYPE>```标签声明在第一行，处于```<html>```标签之前。告诉浏览器的解析器用什么文档标准解析该文档。DOCTYPE不存在或者格式不正确会导致文档以兼容模式呈现。```<!DOCTYPE>```不属于html标签。
* 标准模式与兼容模式各有什么区别?  
标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。
```
* 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？  
1. 行内元素：a, b, span, img, input, select, strong, i
2. 块级元素：div, p, ul, ol, dl, dt, dd, h1, h2...
3. 空元素：br, hr, img, input, link, meta, area, base, col, command, embed, keygen, param, source, track, wbr...即自闭合元素
不同浏览器（版本）、HTML4（5）、CSS2等实际略有差异

* 页面导入样式时，使用link和@import有什么区别？
1. link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;
2. 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
3. import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;
4. link支持使用js控制DOM去改变样式，而@import不支持;
