# javascript运算符优先级

本来打算整理一个js运算符优先级的，没想到MDN直接就有现成的优先级表格，就直接拿来用啦~

这里的关联性，决定了拥有相同优先级的运算符的执行顺序。

例如=运算符关联性为从右到左，那么
```javascript
a = b = 5
```
实际上的执行顺序是先运算b = 5，b = 5返回5，再运算a = 5。
即：
```javascript
a = ( b = 5 )
```


<table>
 <tbody>
  <tr>
   <th>优先级</th>
   <th>运算类型</th>
   <th>关联性</th>
   <th>运算符</th>
  </tr>
  <tr>
   <td>20</td>
   <td>圆括号</td>
   <td>n/a</td>
   <td><code>( … )</code></td>
  </tr>
  <tr>
   <td rowspan="4">19</td>
   <td>成员访问</td>
   <td>从左到右</td>
   <td>… . …</code></td>
  </tr>
  <tr>
   <td>需计算的成员访问</td>
   <td>从左到右</td>
   <td><code>… [ … ]</code></td>
  </tr>
  <tr>
   <td>new (带参数列表)</td>
   <td>n/a</td>
   <td><code>new … ( … )</code></td>
  </tr>
  <tr>
   <td>函数调用</td>
   <td>从左到右</td>
   <td><code>… (&nbsp;<var>…&nbsp;</var>)</code></td>
  </tr>
  <tr>
   <td rowspan="1">18</td>
   <td>new&nbsp;(无参数列表)</td>
   <td>从右到左</td>
   <td><code>new …</code></td>
  </tr>
  <tr>
   <td rowspan="2">17</td>
   <td>后置递增(运算符在后)</td>
   <td colspan="1" rowspan="2">n/a<br>
    &nbsp;</td>
   <td><code>… ++</code></td>
  </tr>
  <tr>
   <td>后置递减(运算符在后)</td>
   <td><code>… --</code></td>
  </tr>
  <tr>
   <td colspan="1" rowspan="10">16</td>
   <td>逻辑非</td>
   <td colspan="1" rowspan="10">从右到左</td>
   <td><code>! …</code></td>
  </tr>
  <tr>
   <td>按位非</td>
   <td><code>~ …</code></td>
  </tr>
  <tr>
   <td>一元加法</td>
   <td><code>+ …</code></td>
  </tr>
  <tr>
   <td>一元减法</td>
   <td><code>- …</code></td>
  </tr>
  <tr>
   <td>前置递增</td>
   <td><code>++ …</code></td>
  </tr>
  <tr>
   <td>前置递减</td>
   <td><code>-- …</code></td>
  </tr>
  <tr>
   <td>typeof</td>
   <td><code>typeof …</code></td>
  </tr>
  <tr>
   <td>void</td>
   <td><code>void …</code></td>
  </tr>
  <tr>
   <td>delete</td>
   <td><code>delete …</code></td>
  </tr>
  <tr>
   <td>await</td>
   <td><code>await …</code></td>
  </tr>
  <tr>
   <td>15</td>
   <td>幂</td>
   <td>从右到左</td>
   <td><code>…&nbsp;**&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">14</td>
   <td>乘法</td>
   <td colspan="1" rowspan="3">从左到右<br>
    &nbsp;</td>
   <td><code>… *&nbsp;…</code></td>
  </tr>
  <tr>
   <td>除法</td>
   <td><code>… /&nbsp;…</code></td>
  </tr>
  <tr>
   <td>取模</td>
   <td><code>… %&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="2">13</td>
   <td>加法</td>
   <td colspan="1" rowspan="2">从左到右<br>
    &nbsp;</td>
   <td><code>… +&nbsp;…</code></td>
  </tr>
  <tr>
   <td>减法</td>
   <td><code>… -&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">12</td>
   <td>按位左移</td>
   <td colspan="1" rowspan="3">从左到右</td>
   <td><code>… &lt;&lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>按位右移</td>
   <td><code>… &gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>无符号右移</td>
   <td><code>… &gt;&gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="6">11</td>
   <td>小于</td>
   <td colspan="1" rowspan="6">从左到右</td>
   <td><code>… &lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>小于等于</td>
   <td><code>… &lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td>大于</td>
   <td><code>… &gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>大于等于</td>
   <td><code>… &gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td>in</td>
   <td><code>… in&nbsp;…</code></td>
  </tr>
  <tr>
   <td>instanceof</td>
   <td><code>… instanceof&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="4">10</td>
   <td>等号</td>
   <td colspan="1" rowspan="4">从左到右<br>
    &nbsp;</td>
   <td><code>… ==&nbsp;…</code></td>
  </tr>
  <tr>
   <td>非等号</td>
   <td><code>… !=&nbsp;…</code></td>
  </tr>
  <tr>
   <td>全等号</td>
   <td><code>… ===&nbsp;…</code></td>
  </tr>
  <tr>
   <td>非全等号</td>
   <td><code>… !==&nbsp;…</code></td>
  </tr>
  <tr>
   <td>9</td>
   <td>按位与</td>
   <td>从左到右</td>
   <td><code>… &amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>8</td>
   <td>按位异或</td>
   <td>从左到右</td>
   <td><code>… ^&nbsp;…</code></td>
  </tr>
  <tr>
   <td>7</td>
   <td>按位或</td>
   <td>从左到右</td>
   <td><code>… |&nbsp;…</code></td>
  </tr>
  <tr>
   <td>6</td>
   <td>逻辑与</td>
   <td>从左到右</td>
   <td><code>… &amp;&amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>5</td>
   <td>逻辑或</td>
   <td>从左到右</td>
   <td><code>… ||&nbsp;…</code></td>
  </tr>
  <tr>
   <td>4</td>
   <td>条件运算符</td>
   <td>从右到左</td>
   <td><code>… ? … : …</code></td>
  </tr>
  <tr>
   <td rowspan="12">3</td>
   <td rowspan="12">赋值</td>
   <td rowspan="12">从右到左</td>
   <td><code>… =&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… +=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… -=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… *=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… /=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… %=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &lt;&lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &amp;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… ^=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… |=&nbsp;…</code></td>
  </tr>
  <tr>
   <td colspan="1" rowspan="2">2</td>
   <td>yield</td>
   <td colspan="1" rowspan="2">从右到左</td>
   <td><code>yield&nbsp;…</code></td>
  </tr>
  <tr>
   <td>yield*</td>
   <td><code>yield*&nbsp;…</code></td>
  </tr>
  <tr>
   <td>1</td>
   <td>展开运算符</td>
   <td>n/a</td>
   <td><code>...</code>&nbsp;…</td>
  </tr>
  <tr>
   <td>0</td>
   <td>逗号</td>
   <td>从左到右</td>
   <td><code>… ,&nbsp;…</code></td>
  </tr>
 </tbody>
</table>

附：
[运算符优先级——MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)


---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。