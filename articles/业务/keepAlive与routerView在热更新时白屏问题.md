在维护一个vue2的项目时，发现了keepAlive与routerView在热更新时白屏的问题。

```html
<keep-alive>
  <router-view :key="$route.fullPath"></router-view>
</keep-alive>
```

如果项目中使用keepAlive，并且是这样使用时，热更新会直接丢失整个`router-view`的dom导致白屏。

核心原因是`keep-alive`判断是否命中缓存的策略有点问题。

`keep-alive`的缓存命中策略是优先匹配子组件的`key`的。

```javascript
const key: ?string = vnode.key == null
  // same constructor may get registered as different local components
  // so cid alone is not enough (#3269)
  ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
  : vnode.key
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance
  // make current key freshest
  remove(keys, key)
  keys.push(key)
} else {
  cache[key] = vnode
  keys.push(key)
  // prune oldest entry
  if (this.max && keys.length > parseInt(this.max)) {
    pruneCacheEntry(cache, keys[0], keys, this._vnode)
  }
}
```

在热更新时，由于我们的`router-view`给了`key`，所以命中了缓存。`keep-alive`会将之前缓存的Vue实例拿来渲染。

但问题的关键就在热更新时，底层会修改`cid`，也就是说，`keep-alive`组件缓存的那个Vue实例在渲染时会被vue底层代码发现当前要渲染的组件与缓存中的组件不一致，被认为是无效组件实例，从而渲染失败。

解决方法也很简单，直接魔改了原本的`keep-alive`组件，将`cid`作为`key`的一部分。

```javascript
const key = vnode.key + componentOptions.Ctor.cid;
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance;
  // make current key freshest
  remove(keys, key);
  keys.push(key);
} else {
  cache[key] = vnode;
  keys.push(key);
  // prune old component for hmr
  // 解决无法缓存两个相同页面问题
  // if (name && cachedNameKeyMap[name] && cachedNameKeyMap[name] !== key) {
  //   pruneCacheEntry(cache, cachedNameKeyMap[name], keys);
  // }
  cachedNameKeyMap[name] = key;
  // prune oldest entry
  if (this.max && keys.length > parseInt(this.max)) {
    pruneCacheEntry(cache, keys[0], keys, this._vnode);
  }
}
```

这样一来，热更新时会因为cid不同而直接重新渲染组件。

其次是注释掉未匹配中时的缓存修剪，因为这里使用了`name`作为被修剪的`key`，这会导致无法缓存两个相同页面。